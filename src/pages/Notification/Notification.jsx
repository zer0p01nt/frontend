import React, { useState, useMemo, useCallback } from "react";
import Header from "../../components/Header/Header";
import GoToTop from "../../components/GoToTop/GoToTop";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import CardList from "../../components/CardList/CardList";
import SmallFilter from "../../components/SmallFilter/SmallFilter";
import * as B from "../../styles/ButtonCircle";
import * as S from "./NotificationStyle";
import * as F from "../../components/SmallFilter/SmallFilterStyle";
import useFetch from "../../hooks/useFetch";
import NotificationEmpty from "./NotificationEmpty";
import { makeNotiBadges } from "../../utils/makeBadges"; // 뱃지 생성 유틸리티
import { useNavigate } from "react-router-dom"; // 페이지 이동 훅
import {
  CATEGORY_TYPE_MAP,
  NAME_CATEGORY_MAP,
  NAME_REGION_MAP,
} from "../../constants/maps";

const API_URL = process.env.REACT_APP_API_URL;

export default function Notification() {
  const navigate = useNavigate();

  // 필터 상태
  // 모든 스크랩이면 undefined
  const [docType, setDocType] = useState(undefined);
  // 유저 프로필에 있는 것만 id 형태로 보관
  const [regionKey, setRegionKey] = useState("");
  const [categoryKey, setCategoryKey] = useState("");

  // 필터, 카테고리바 변경
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
        labels.map((l) => NAME_CATEGORY_MAP[l]).filter(Number.isFinite)
      ),
    ]
      .sort((a, b) => a - b)
      .join(",");
    setCategoryKey((prev) => (prev === key ? prev : key));
  }, []);

  // URL 조립
  const listUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("user_id", "GUEST1"); // 고정
    params.set("page", "1"); // 일단 고정
    if (docType) params.set("doc_type", docType);
    if (regionKey) params.set("region_ids", regionKey);
    if (categoryKey) params.set("category_ids", categoryKey);
    return `${API_URL}/notification/notification/?${params.toString()}`;
  }, [docType, regionKey, categoryKey]);

  // useFetch로 알림 목록 데이터 받아오기
  const { data: notificationData, isLoading } = useFetch(
    listUrl,
    {} // 초기값은 빈 객체로 설정
  );

  // 실제 알림 목록은 API 응답의 'results' 안에 들어있습니다.
  const notifications = notificationData?.data?.results ?? [];

  return (
    <>
      <Header hasBack={false} title='알림' hasScrap={false} />
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

        {/* 로딩이 끝난 후, 데이터 유무에 따라 다른 화면 표시 */}
        {!isLoading &&
          (notifications.length > 0 ? (
            // 알림이 있을 경우: 실제 데이터로 목록 표시
            notifications.map((item) => (
              <CardList
                key={item.id}
                variant='notification'
                badges={makeNotiBadges(item)} // API 데이터에 맞게 뱃지 생성
                title={item.title} // 실제 제목 데이터
                date={item.notification_time.slice(0, 10)} // 실제 날짜 데이터
                isUnread={!item.is_read} // '읽음' 상태의 반대로 '안읽음' 표시
                onClick={() => navigate(`/post/${item.document_info.id}`)} // 클릭 시 상세 페이지로 이동
                image={item.document_info.image_url}
                type={item.document_info.doc_type}
              />
            ))
          ) : (
            // 알림이 없을 경우: 빈 화면 표시
            <NotificationEmpty />
          ))}
      </S.NotificationContainer>

      <B.ButtonWrapper>
        <GoToTop />
      </B.ButtonWrapper>
    </>
  );
}
