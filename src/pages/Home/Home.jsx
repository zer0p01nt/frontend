import React from "react";
import * as S from "./HomeStyle.js";
// ▼▼▼ useNavigate를 import 해주세요 ▼▼▼
import { useNavigate } from "react-router-dom";
import CardList from "../../components/CardList/CardList";
import Badge from "../../components/Badge/Badge";
import Header from "../../components/Header/Header.jsx";
import useProfile from "../../hooks/useProfile.js";
import useFetch from "../../hooks/useFetch.js";
import { makeBadges } from "../../utils/makeBadges.js";
import MoreBtn from "../../components/MoreBtn/MoreBtn.jsx";
import { NAME_REGION_MAP } from "../../constants/maps.js";

const API_URL = process.env.REACT_APP_API_URL;

// 컴포넌트 함수
export default function Home() {
  // 페이지 이동
  const navigate = useNavigate();
  // 검색창 이동
  const goToSearch = () => {
    navigate("/search");
  };

  // 유저 프로필 fetch
  const { profile, isProfileLoading } = useProfile();

  // [관심 분야의 최근 알림] 유저의 카테고리 아이디만 추출
  const categoryIds = (profile.data?.user_categories ?? [])
    .map((uc) => uc.category?.id)
    .filter(Boolean);
  // 카테고리 아이디 요청 가능 여부 확인 (HTTP 400 오류 방지)
  const canFetch = !isProfileLoading && categoryIds.length > 0;
  // 요청 가능할 때만 url 반환
  const alertsUrl = canFetch
    ? `${API_URL}/documents/categories/recent-alerts/?category_ids=${encodeURIComponent(
        categoryIds.join(",")
      )}`
    : null;

  // 관심 분야의 최근 알림
  const { data: recentAlerts = {}, isRecentAlertsLoading } = useFetch(
    alertsUrl,
    []
  );

  // 다가오는 관심 일정

  // [관심 지역 최근 소식] 맨 첫번째 지역만 받아오도록 매핑
  const markedRegion = profile?.data?.user_regions?.[0]?.region?.district;
  const markedRegionId = markedRegion ? NAME_REGION_MAP[markedRegion] : null;
  const regionUrl =
    !isProfileLoading && markedRegionId
      ? `${API_URL}/documents/region/${markedRegionId}/recent/`
      : null;

  // 관심 지역 최근 소식
  const { data: recent = {}, isRecentLoading } = useFetch(regionUrl, {});

  return (
    // HomeWrapper로 한번 감싸줍니다.
    <S.HomeWrapper>
      <Header
        hasBack={false}
        hasScrap={false}
        isTransparent={true}
        atHome={true}
      />
      <S.ContentContainer>
        <S.TitleContainer>
          <S.TitleWrapper>
            <S.TitleBox>
              <S.Title>
                사용자님!
                <div>
                  오늘도 <strong>맞춤 소식</strong> 전해드릴게요
                </div>
              </S.Title>
              <S.InterestSection>
                <S.BadgeWrapper>
                  {!isProfileLoading && profile && (
                    <>
                      {(profile.data.user_regions ?? []).map((r) => (
                        <Badge color='blue' isFilled={false} key={r.id}>
                          {r.region?.district}
                        </Badge>
                      ))}
                      {profile.data.user_regions.length >= 3 && (
                        <Badge color='pink' isFilled={false}>
                          +{profile.data.user_regions.length - 2}
                        </Badge>
                      )}
                    </>
                  )}
                </S.BadgeWrapper>
                <S.BadgeWrapper>
                  {!isProfileLoading && profile && (
                    <>
                      {(profile.data.user_categories ?? []).map((c) => (
                        <Badge
                          color='teal'
                          isFilled={false}
                          key={c.category?.id}
                        >
                          {c.category?.category_name}
                        </Badge>
                      ))}
                      {profile.data.user_categories.length >= 3 && (
                        <Badge color='teal' isFilled={false}>
                          +{profile.data.user_categories.length - 2}
                        </Badge>
                      )}
                    </>
                  )}
                </S.BadgeWrapper>
              </S.InterestSection>
            </S.TitleBox>
            <S.Character />
          </S.TitleWrapper>
        </S.TitleContainer>
        {/* ▼▼▼ 검색창 섹션을 이 코드로 교체해주세요 ▼▼▼ */}
        <S.FakeSearchInputWrapper onClick={goToSearch}>
          <span>필요한 정보가 있으신가요?</span>
          <div />
        </S.FakeSearchInputWrapper>
        {/* ▲▲▲ 여기까지 교체 ▲▲▲ */}
        <S.SectionWrapper>
          {/* (이하 코드는 모두 동일합니다) */}
          <div>
            <S.SectionHeader>
              <S.SectionTitle>관심 분야의 최근 알림</S.SectionTitle>
              <MoreBtn
                value='더보기'
                onClick={() => navigate("/notification")}
              />
            </S.SectionHeader>
            <S.CardListWrapper>
              {!isRecentAlertsLoading && recentAlerts && (
                <>
                  {(recentAlerts.recent_alerts ?? []).map((r) => (
                    <CardList
                      badges={makeBadges(r)}
                      title={r.doc_title}
                      date={r.pub_date.slice(0, 10)}
                      key={r.id}
                      onClick={() => navigate(`/post/${r.id}`)}
                    />
                  ))}
                </>
              )}
            </S.CardListWrapper>
          </div>

          <div>
            <S.SectionHeader>
              <S.SectionTitle>다가오는 관심 일정</S.SectionTitle>
              <MoreBtn
                value='더보기'
                onClick={() => navigate("/scrap/posts")}
              />
            </S.SectionHeader>
            <S.HorizontalScrollWrapper>
              <CardList
                variant='card'
                badges={[
                  { text: "진행중", color: "pink" },
                  { text: "시설", color: "blue" },
                ]}
                title='다가오는 일정에 대한 제목입니다.'
                date='2025.07.30 ~ 2025.07.31'
              />
              <CardList
                variant='card'
                badges={[
                  { text: "D-1", color: "pink" },
                  { text: "시설", color: "blue" },
                ]}
                title='두 번째 다가오는 일정입니다.'
                date='2025.08.01 ~ 2025.08.10'
              />
            </S.HorizontalScrollWrapper>
          </div>

          <div>
            <S.SectionHeader>
              <S.SectionTitle>관심 지역 최근 소식</S.SectionTitle>
              <MoreBtn value='더보기' onClick={() => navigate("/news")} />
            </S.SectionHeader>
            <S.CardListWrapper>
              {!isRecentLoading && recent && (
                <>
                  {(recent.recent_news ?? []).map((r) => (
                    <CardList
                      badges={makeBadges(r)}
                      title={r.doc_title}
                      date={r.pub_date.slice(0, 10)}
                      key={r.id}
                      onClick={() => navigate(`/post/${r.id}`)}
                    />
                  ))}
                </>
              )}
            </S.CardListWrapper>
          </div>
        </S.SectionWrapper>
      </S.ContentContainer>
    </S.HomeWrapper>
  );
}
