import * as S from "./MyPageStyle";
import * as H from "../Home/HomeStyle";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import MoreBtn from "../../components/MoreBtn/MoreBtn";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import CardList from "../../components/CardList/CardList";
import useProfile from "../../hooks/useProfile";
import ChatbotBox from "../../components/ChatbotBox/ChatbotBox";
import Badge from "../../components/Badge/Badge";
import { makeScrapBadges } from "../../utils/makeBadges";

const API_URL = process.env.REACT_APP_API_URL;

export default function MyPage() {
  const navigate = useNavigate();

  // 프로필 정보 fetch
  const { profile, isProfileLoading } = useProfile();

  // 공문 스크랩
  const { data: postdata, isLoading: isPostsLoading } = useFetch(
    `${API_URL}/scrap/documents/?order=latest&page=1&page_size=3`,
    {}
  );
  const scrapedPosts = postdata?.data?.results ?? [];

  // 챗봇 스크랩
  const { data: chatbotdata, isLoading: isChatbotsLoading } = useFetch(
    `${API_URL}/scrap/chatbot/?order=latest&page=1&page_size=3`
  );
  const scrapedChatbots = chatbotdata?.data?.results ?? [];

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
                {!isProfileLoading && profile && (
                  <S.Username>{profile.data.name}님,</S.Username>
                )}

                <S.Text>
                  <strong>이런 분야의 알림</strong>을 받고 있어요
                </S.Text>
              </S.TextBox>
            </S.TitleBox>
            <MoreBtn value='수정하기' onClick={() => navigate("/profile")} />
          </S.TitleWrapper>
        </S.TitleContainer>
        <S.BadgeWrapper>
          {!isProfileLoading && profile && (
            <>
              {(profile.data.user_regions ?? []).map((r) => (
                <Badge color='blue' key={r.id}>
                  {r.region?.district}
                </Badge>
              ))}

              {(profile.data.user_categories ?? []).map((c) => (
                <Badge color='teal' key={c.id}>
                  {c.category?.category_name}
                </Badge>
              ))}
            </>
          )}
        </S.BadgeWrapper>
        <S.SectionContainer>
          <div>
            <H.SectionHeader>
              <H.SectionTitle>스크랩한 공문</H.SectionTitle>
              {scrapedPosts?.length !== 0 && (
                <MoreBtn
                  value='더보기'
                  onClick={() => navigate("/scrap/posts")}
                />
              )}
            </H.SectionHeader>
            {scrapedPosts?.length !== 0 ? (
              <H.CardListWrapper>
                {!isPostsLoading && scrapedPosts && (
                  <>
                    {scrapedPosts?.slice(0, 3).map((p) => (
                      <CardList
                        badges={makeScrapBadges(p)}
                        title={p.doc_title}
                        date={p.pub_date.slice(0, 10)}
                        key={p.id}
                        onClick={() => navigate(`/post/${p.id}`)}
                      />
                    ))}
                  </>
                )}
              </H.CardListWrapper>
            ) : (
              <>
                <S.NoScraped>
                  <div>스크랩한 공문이 없어요</div>
                  <div>관심 공문은 스크랩해서 모아보세요</div>
                </S.NoScraped>
              </>
            )}
          </div>
          <div>
            <H.SectionHeader>
              <H.SectionTitle>스크랩한 챗봇</H.SectionTitle>
              {scrapedChatbots.length !== 0 && (
                <MoreBtn
                  value='더보기'
                  onClick={() => navigate("/scrap/chatbots")}
                />
              )}
            </H.SectionHeader>
            {scrapedChatbots.length !== 0 ? (
              <H.CardListWrapper>
                {!isChatbotsLoading && scrapedChatbots && (
                  <>
                    {scrapedChatbots?.slice(0, 3).map((c) => (
                      <ChatbotBox
                        key={c.id}
                        id={c.id}
                        categories={c.categories}
                        title={c.summary}
                      />
                    ))}
                  </>
                )}
              </H.CardListWrapper>
            ) : (
              <>
                <S.NoScraped>
                  <div>스크랩한 대화가 없어요</div>
                  <div>유용한 대화는 스크랩해 두고 다시 볼 수 있어요</div>
                </S.NoScraped>
              </>
            )}
          </div>
        </S.SectionContainer>
      </H.ContentContainer>
    </>
  );
}
