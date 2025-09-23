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

// 더미데이터 추가
const MOCKDATA = [
  {
    id: 26,
    document: 34,
    doc_title: "''도봉구 여름 물놀이장으로 장애인 가족 초대''",
    doc_type: "PARTICIPATION",
    doc_type_display: "참여",
    has_deadline: true,
    pub_date: "2025-07-21T13:40:00+09:00",
    dead_date: "2025-09-27T00:00:00+09:00",
    region: {
      id: 6,
      city: "서울특별시",
      district: "도봉구",
      full_name: "서울특별시 도봉구",
    },
    categories: [
      {
        id: 2,
        category_name: "문화",
      },
    ],
    image_url:
      "https://viewer.dobong.go.kr/WEB_FILE/bbs/bcode22/docView/223bb760aae6c637c3ee12b14ae5897f.files/image.jpg",
    created_at: "2025-09-23T15:30:05.162047+09:00",
  },
  {
    id: 9,
    document: 99,
    doc_title: "탄소공감마일리지 환경의 날 이벤트",
    doc_type: "PARTICIPATION",
    doc_type_display: "참여",
    has_deadline: true,
    pub_date: "2025-06-10T10:51:00+09:00",
    dead_date: "2025-10-05T00:00:00+09:00",
    region: {
      id: 6,
      city: "서울특별시",
      district: "도봉구",
      full_name: "서울특별시 도봉구",
    },
    categories: [
      {
        id: 5,
        category_name: "환경",
      },
    ],
    image_url:
      "https://viewer.dobong.go.kr/WEB_FILE/bbs/bcode22/docView/88e30ee2c96085ded5784ec2fc7232ff.files/image.jpg",
    created_at: "2025-08-25T19:54:05.272966+09:00",
  },
];

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
          categoryIds.join(",")
        )}`
      : null;
  const { data: recentAlertsData, isLoading: isAlertsLoading } = useFetch(
    alertsUrl,
    {}
  );
  const recentAlerts = recentAlertsData?.recent_alerts ?? [];

  // 3. 마감일이 가까운 스크랩 공문 조회
  const { data: scrapedPostsData, isLoading: isScrapedPostsLoading } = useFetch(
    `${API_URL}/documents/upcoming-deadlines/`,
    {}
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
    {}
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
                {isProfileLoading ? "사용자" : profile?.data?.name || "사용자"}
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
              {/* 더미데이터 주입을 위한 주석처리 */}
              {/* {!isScrapedPostsLoading &&
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
                ))} */}
              {MOCKDATA.map((item) => (
                <CardList
                  key={item.id}
                  variant='card'
                  badges={makeScrapBadges(item)}
                  title={item.doc_title}
                  onClick={() => navigate(`/post/${item.id}`)}
                  image={item.image_url}
                  type={item.doc_type}
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
