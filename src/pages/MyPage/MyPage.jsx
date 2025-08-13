import * as S from "./MyPageStyle";
import * as H from "../Home/HomeStyle";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import MoreBtn from "../../components/MoreBtn/MoreBtn";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import CardList from "../../components/CardList/CardList";

const API_URL = process.env.REACT_APP_API_URL;

export default function MyPage() {
  const navigate = useNavigate();

  // 프로필 정보 fetch
  const { data: profile = {}, isLoading: isProfileLoading } = useFetch(
    `${API_URL}/user/profile/`,
    {}
  );
  // 스크랩한 공문 들어갈 자리
  const { data: scrapedPosts = [], isLoading: isPostsLoading } = useFetch(
    "/data/CardList.json",
    []
  );

  console.log(profile);
  return (
    <>
      <Header
        hasBack={false}
        title='마이페이지'
        hasScrap={false}
        isTransparent={true}
      />
      <H.ContentContainer>
        <S.TitleContainer>
          <S.TitleWrapper>
            <S.TitleBox>
              <S.Character></S.Character>
              <S.TextBox>
                <S.Username>사용자님,</S.Username>
                <S.Text>
                  <strong>이런 분야의 알림</strong>을 받고 있어요
                </S.Text>
              </S.TextBox>
            </S.TitleBox>
            <MoreBtn value='수정하기' onClick={() => navigate("/profile")} />
          </S.TitleWrapper>
          <S.BadgeWrapper>
            {!isProfileLoading && profile && (
              <>
                {(profile.data.user_regions ?? []).map((r) => (
                  <S.MyPageBadge $variant='region' key={r.id}>
                    {r.region?.district}
                  </S.MyPageBadge>
                ))}

                {(profile.data.user_categories ?? []).map((c) => (
                  <S.MyPageBadge $variant='category' key={c.id}>
                    {c.category?.category_name}
                  </S.MyPageBadge>
                ))}
              </>
            )}
          </S.BadgeWrapper>
        </S.TitleContainer>
        <S.SectionContainer>
          <div>
            <H.SectionHeader>
              <H.SectionTitle>스크랩한 공문</H.SectionTitle>
              <MoreBtn
                value='더보기'
                onClick={() => navigate("/scrap/posts")}
              />
            </H.SectionHeader>
            <H.CardListWrapper>
              {!isPostsLoading && scrapedPosts && (
                <>
                  {scrapedPosts?.slice(0, 3).map((p) => (
                    <CardList
                      badges={[
                        { text: p.region, color: "blue" },
                        { text: p.keyword, color: "teal" },
                      ]}
                      title={p.title}
                      date={p.date}
                      key={p.id}
                    />
                  ))}
                </>
              )}
            </H.CardListWrapper>
          </div>
          <div>
            <H.SectionHeader>
              <H.SectionTitle>스크랩한 챗봇</H.SectionTitle>
              <MoreBtn
                value='더보기'
                onClick={() => navigate("/scrap/chatbots")}
              />
            </H.SectionHeader>
            <H.CardListWrapper>
              {/* 챗봇 컴포넌트 따로 만들어야 함 */}
            </H.CardListWrapper>
          </div>
        </S.SectionContainer>
      </H.ContentContainer>
    </>
  );
}
