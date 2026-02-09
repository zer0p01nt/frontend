import React from "react";
import * as S from "./HomeStyle.js";
import { useNavigate } from "react-router-dom";
import CardList from "../../components/CardList/CardList";
import Badge from "../../components/Badge/Badge";
import Header from "../../components/Header/Header.jsx";
import useProfile from "../../hooks/useProfile.js";
import useFetch from "../../hooks/useFetch.js";
import { makeBadges, makeScrapBadges } from "../../utils/makeBadges.js";
import MoreBtn from "../../components/MoreBtn/MoreBtn.jsx";
import { NAME_REGION_MAP } from "../../constants/maps.js";

const API_URL = process.env.REACT_APP_API_URL;

export default function Home() {
  const navigate = useNavigate();
  const goToSearch = () => {
    navigate("/search");
  };

  // 1. 유저 프로필 정보 fetch
  const { profile, isProfileLoading } = useProfile();

  // 2. [관심 분야의 최근 알림] API 연동
  const categoryIds = (profile?.data?.user_categories ?? [])
    .map((uc) => uc.category?.id)
    .filter(Boolean);
  const alertsUrl =
    !isProfileLoading && categoryIds.length > 0
      ? `${API_URL}/documents/categories/recent-alerts/?category_ids=${encodeURIComponent(
          categoryIds.join(","),
        )}`
      : null;
  const { data: recentAlertsData, isLoading: isAlertsLoading } = useFetch(
    alertsUrl,
    {},
  );
  const recentAlerts = recentAlertsData?.recent_alerts ?? [];

  // 3. 마감일이 가까운 스크랩 공문 조회
  const { data: scrapedPostsData, isLoading: isScrapedPostsLoading } = useFetch(
    `${API_URL}/documents/upcoming-deadlines/`,
    {},
  );
  const scrapedPosts = scrapedPostsData?.data?.results ?? [];

  // 4. [관심 지역 최근 소식] API 연동
  const markedRegion = profile?.data?.user_regions?.[0]?.region?.district;
  const markedRegionId = markedRegion ? NAME_REGION_MAP[markedRegion] : null;
  const newsUrl =
    !isProfileLoading && markedRegionId
      ? `${API_URL}/documents/region/${markedRegionId}/recent/`
      : null;
  const { data: recentNewsData, isLoading: isNewsLoading } = useFetch(
    newsUrl,
    {},
  );
  const recentNews = recentNewsData?.recent_news ?? [];

  return (
    <S.HomeWrapper>
      <Header
        hasBack={false}
        hasScrap={false}
        isTransparent={true}
        atHome={true}
      />
      <S.ContentContainer>
        {/* --- 상단 프로필 및 뱃지 부분 --- */}
        <S.TitleContainer>
          <S.TitleWrapper>
            <S.TitleBox>
              <S.Title>
                {profile?.data?.name || "사용자"}
                님!
                <div>
                  오늘도 <strong>맞춤 소식</strong> 전해드릴게요
                </div>
              </S.Title>
              <S.InterestSection>
                <S.BadgeWrapper>
                  {!isProfileLoading && profile && (
                    <>
                      {(profile?.data?.user_regions ?? [])
                        .slice(0, 2)
                        .map((r) => (
                          <Badge color='blue' isFilled={false} key={r.id}>
                            {r.region?.district}
                          </Badge>
                        ))}
                      {profile?.data?.user_regions.length >= 3 && (
                        <Badge color='pink' isFilled={false}>
                          +{profile?.data?.user_regions.length - 2}
                        </Badge>
                      )}
                    </>
                  )}
                </S.BadgeWrapper>
                <S.BadgeWrapper>
                  {!isProfileLoading && profile && (
                    <>
                      {(profile?.data?.user_categories ?? [])
                        .slice(0, 2)
                        .map((c) => (
                          <Badge
                            color='teal'
                            isFilled={false}
                            key={c.category?.id}
                          >
                            {c.category?.category_name}
                          </Badge>
                        ))}
                      {profile?.data?.user_categories.length >= 3 && (
                        <Badge color='teal' isFilled={false}>
                          +{profile?.data?.user_categories.length - 2}
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
        <S.FakeSearchInputWrapper onClick={goToSearch}>
          <span>필요한 정보가 있으신가요?</span>
          <div />
        </S.FakeSearchInputWrapper>

        {/* --- API 연동이 적용된 섹션들 --- */}
        <S.SectionWrapper>
          {/* --- 관심 분야의 최근 알림 --- */}
          <div>
            <S.SectionHeader>
              <S.SectionTitle>관심 분야의 최근 알림</S.SectionTitle>
              <MoreBtn
                value='더보기'
                onClick={() => navigate("/notification")}
              />
            </S.SectionHeader>
            <S.CardListWrapper>
              {!isAlertsLoading &&
                recentAlerts.map((item) => (
                  <CardList
                    key={item.id}
                    badges={makeBadges(item)}
                    title={item.doc_title}
                    date={item.pub_date.slice(0, 10)}
                    onClick={() => navigate(`/post/${item.id}`)}
                    image={item.image_url}
                    type={item.doc_type}
                  />
                ))}
            </S.CardListWrapper>
          </div>

          {/* --- 스크랩한 공문 --- */}
          <div>
            <S.SectionHeader>
              <S.SectionTitle>다가오는 관심 일정</S.SectionTitle>
              <MoreBtn
                value='더보기'
                onClick={() => navigate("/scrap/posts")}
              />
            </S.SectionHeader>
            <S.HorizontalScrollWrapper>
              {!isScrapedPostsLoading &&
                scrapedPosts.map((item) => (
                  <CardList
                    key={item.document.id}
                    variant='card'
                    badges={makeScrapBadges(item.document)}
                    title={item.document.doc_title}
                    onClick={() => navigate(`/post/${item.document.id}`)}
                    image={item.document.image_url}
                    type={item.document.doc_type}
                  />
                ))}
            </S.HorizontalScrollWrapper>
          </div>

          {/* --- 관심 지역 최근 소식 --- */}
          <div>
            <S.SectionHeader>
              <S.SectionTitle>관심 지역 최근 소식</S.SectionTitle>
              <MoreBtn value='더보기' onClick={() => navigate("/news")} />
            </S.SectionHeader>
            <S.CardListWrapper>
              {!isNewsLoading &&
                recentNews.map((item) => (
                  <CardList
                    key={item.id}
                    badges={makeBadges(item)}
                    title={item.doc_title}
                    date={item.pub_date.slice(0, 10)}
                    onClick={() => navigate(`/post/${item.id}`)}
                    image={item.image_url}
                    type={item.doc_type}
                  />
                ))}
            </S.CardListWrapper>
          </div>
        </S.SectionWrapper>
      </S.ContentContainer>
    </S.HomeWrapper>
  );
}
