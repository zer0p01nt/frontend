import React, { useState, useMemo, useCallback, useEffect } from "react";
import Header from "../../components/Header/Header";
import GoToTop from "../../components/GoToTop/GoToTop";
import CategoryBar from "../../components/CategoryBar/CategoryBar.jsx";
import CardList from "../../components/CardList/CardList";
import SmallFilter from "../../components/SmallFilter/SmallFilter";
import * as B from "../../styles/ButtonCircle";
import * as S from "./NotificationStyle";
import * as F from "../../components/SmallFilter/SmallFilterStyle";
import useFetch from "../../hooks/useFetch";
import NotificationEmpty from "./NotificationEmpty";
import { makeNotiBadges } from "../../utils/makeBadges";
import { useNavigate } from "react-router-dom";
import {
  CATEGORY_TYPE_MAP,
  NAME_CATEGORY_MAP,
  NAME_REGION_MAP,
} from "../../constants/maps";
import PushBtn from "../../components/PushBtn/PushBtn";
import ShareToast from "../../components/ShareToast/ShareToast.jsx";

const API_URL = process.env.REACT_APP_API_URL;
const READ_NOTIFICATIONS_KEY = "readNotifications";

export default function Notification() {
  const navigate = useNavigate();

  // --- '읽은 알림' 상태 관리 (localStorage 연동) ---
  const [readIds, setReadIds] = useState(() => {
    try {
      const stored = localStorage.getItem(READ_NOTIFICATIONS_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // readIds 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify([...readIds]));
  }, [readIds]);
  // ----------------------------------------------------

  // 필터 상태
  const [docType, setDocType] = useState(undefined);
  const [regionKey, setRegionKey] = useState("");
  const [categoryKey, setCategoryKey] = useState("");

  const handleCategoryChange = (category) => {
    if (category === "모든 알림") setDocType(undefined);
    else setDocType(CATEGORY_TYPE_MAP[category] ?? undefined);
  };

  const handleRegionsChange = useCallback((labels) => {
    const key = [
      ...new Set(labels.map((l) => NAME_REGION_MAP[l]).filter(Number.isFinite)),
    ]
      .sort((a, b) => a - b)
      .join(",");
    setRegionKey((prev) => (prev === key ? prev : key));
  }, []);

  const handleCategoriesChange = useCallback((labels) => {
    const key = [
      ...new Set(
        labels.map((l) => NAME_CATEGORY_MAP[l]).filter(Number.isFinite),
      ),
    ]
      .sort((a, b) => a - b)
      .join(",");
    setCategoryKey((prev) => (prev === key ? prev : key));
  }, []);

  const listUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("user_id", "GUEST1");
    params.set("page", "1");
    if (docType) params.set("doc_type", docType);
    if (regionKey) params.set("region_ids", regionKey);
    if (categoryKey) params.set("category_ids", categoryKey);
    return `${API_URL}/notification/notification/?${params.toString()}`;
  }, [docType, regionKey, categoryKey]);

  const { data: notificationData, isLoading } = useFetch(listUrl, {});
  const notifications = notificationData?.data?.results ?? [];

  // --- 알림 클릭 핸들러 ---
  const handleNotificationClick = (item) => {
    // '읽음' 상태가 아니면 readIds에 추가
    if (!item.is_read) {
      setReadIds((prev) => new Set(prev).add(item.id));
    }
    // 상세 페이지로 이동
    navigate(`/post/${item.document_info.id}`);
  };
  // -------------------------
  // 푸시 버튼 토스트
  const [toastShow, setToastShow] = useState(false);

  return (
    <>
      <Header hasBack={false} title='알림' hasScrap={false} />
      <ShareToast
        isVisible={toastShow}
        title='테스트 알림이 전송됐어요!'
        content='지금 확인해 보세요.'
      />
      <S.NotificationContainer>
        <CategoryBar onCategoryChange={handleCategoryChange} />
        <F.SmallFilterWrapper>
          <SmallFilter
            sourceKey='user_regions'
            onChange={handleRegionsChange}
          />
          <SmallFilter
            sourceKey='user_categories'
            onChange={handleCategoriesChange}
          />
        </F.SmallFilterWrapper>

        <PushBtn setToastShow={setToastShow} />
        {!isLoading &&
          (notifications.length > 0 ? (
            notifications.map((item) => {
              // 서버에서 is_read가 false이고, 로컬에서도 읽지 않았을 때만 isUnread를 true로 설정
              const isUnread = !item.is_read && !readIds.has(item.id);

              return (
                <CardList
                  key={item.id}
                  variant='notification'
                  badges={makeNotiBadges(item)}
                  title={item.title || item.doc_title}
                  date={item.notification_time.slice(0, 10)}
                  isUnread={isUnread}
                  onClick={() => handleNotificationClick(item)} // 수정된 핸들러 연결
                  image={item.document_info.image_url}
                  type={item.document_info.doc_type}
                />
              );
            })
          ) : (
            <NotificationEmpty />
          ))}
      </S.NotificationContainer>

      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}
