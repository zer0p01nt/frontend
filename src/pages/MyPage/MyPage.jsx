import * as S from "./MyPageStyle";
import * as H from "../Home/HomeStyle";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import MoreBtn from "../../components/MoreBtn/MoreBtn";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState, useCallback } from "react";
import CardList from "../../components/CardList/CardList";
import useProfile from "../../hooks/useProfile";
import ChatbotBox from "../../components/ChatbotBox/ChatbotBox";
import Badge from "../../components/Badge/Badge";
import { makeScrapBadges } from "../../utils/makeBadges";
import character from "../../assets/Character.png";

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

  /**
   * ScrapedChatbots에서 가져온 챗봇박스 펼침 로직
   */
  // ChatbotBox 한 번에 하나만 열리도록
  const [openId, setOpenId] = useState(null);
  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id)); // 이미 열려있으면 닫기, 아니면 새로 열기
  };

  // 챗봇 펼친 상태 캐싱
  const [detailById, setDetailById] = useState({});
  const openUrl =
    openId && !detailById[openId]
      ? `${API_URL}/scrap/chatbot/${openId}/`
      : null;

  // 챗봇 스크랩 상세 조회
  const { data: detailData, isLoading: isDetailDataLoading } = useFetch(
    openUrl,
    null
  );
  const OpenedChatbot = detailData?.data;
  // 펼쳤을 때 데이터 일치시킴
  useEffect(() => {
    const id = OpenedChatbot?.id;
    if (!id) return;
    if (openId && OpenedChatbot) {
      setDetailById((prev) => ({ ...prev, [openId]: OpenedChatbot }));
    }
  }, [OpenedChatbot]);

  // 상세 데이터 === detail && 상세 로딩 === isDetailLoading
  const detail = openId ? detailById[openId] : null;
  const isDetailLoading = openId && !detail ? isDetailDataLoading : false;

  // 챗봇 스크랩 삭제 로직
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = useCallback(
    async (id) => {
      if (!id || isDeleting) return;

      const ok = window.confirm("해당 챗봇 스크랩을 삭제하시겠습니까?");
      if (!ok) return;

      try {
        setIsDeleting(true);
        await deleteChatbotScrap(id);

        // items에서도 삭제
        setItems((prev) => prev.filter((it) => it.id !== id));

        // 캐시에서 삭제
        setDetailById((prev) => {
          const { [id]: _removed, ...rest } = prev;
          return rest;
        });

        // 펼쳐져 있었으면 접기
        setOpenId((prev) => (prev === id ? null : prev));

        // detail에서 aiId, sessionId 추출 후 이벤트 보냄
        const d = detailById[id];
        const aiId = d?.ai_message; // 숫자
        const sessionId = String(d?.chatbot_session ?? ""); // 문자열로 강제
        if (Number.isFinite(aiId) && sessionId) {
        }
      } catch (e) {
        console.error(e);
        alert("삭제 중 오류가 발생했습니다.");
      } finally {
        setIsDeleting(false);
      }
    },
    [isDeleting, detailById]
  );

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
              <S.Character>
                <img src={character} />
              </S.Character>
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
                        onClick={() => navigate(`/post/${p.document}`)}
                        image={p.image_url}
                        type={p.doc_type}
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
                        categories={c.categories ?? []}
                        title={c.summary}
                        expanded={openId === c.id}
                        onToggle={() => handleToggle(c.id)}
                        onDelete={() => handleDelete(c.id)}
                        detail={openId === c.id ? detail : null}
                        loading={openId === c.id ? isDetailLoading : false}
                        isDeleting={isDeleting}
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
