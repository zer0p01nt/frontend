import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";

import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import CardList from "../../components/CardList/CardList";
import Badge from "../../components/Badge/Badge";
import Chatbot from "../../components/Chatbot/Chatbot";

import scrapTrue from "../../assets/Detail/bookmark_true.svg";
import scrapFalse from "../../assets/Detail/bookmark_false.svg";
import share from "../../assets/Detail/share.svg";
import buttonCircle from "../../assets/ButtonCircle.png";

import * as B from "../../styles/ButtonCircle";
import * as S from "./DetailStyle";
import { useParams } from "react-router-dom";
import { REGION_MAP } from "../../constants/maps";
import { createPostScrap, deletePostScrap } from "../../services/scrapService";

const API_URL = process.env.REACT_APP_API_URL;

export default function Detail() {
  const { id } = useParams();
  const postId = Number(id);

  // 챗봇 열림 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  // 공문 본문 fetch
  const { data: post, isLoading: isPostLoading } = useFetch(
    `${API_URL}/documents/${id}/`,
    {}
  );

  // 스크랩 관련 로직
  const storageKey = useMemo(() => `scrap:${postId}`, [postId]);
  const [scrapId, setScrapId] = useState(null);
  const [isScraping, setIsScraping] = useState(false);
  const isScraped = scrapId !== null;

  // 초기화 : 같은 브라우저에서 이전에 생성한 scrapId가 있다면 가져옴
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setScrapId(saved ? Number(saved) : null);
  }, [storageKey]);

  const toggleScrap = async () => {
    if (isScraping || isPostLoading) return;
    setIsScraping(true);

    try {
      if (!isScraped) {
        // scrapId가 없었으므로 새로 스크랩
        const created = await createPostScrap(postId);
        const newId = created?.data?.id;
        if (!newId) throw new Error("응답에 스크랩 ID가 없습니다.");
        setScrapId(newId);
        localStorage.setItem(storageKey, String(newId));
      } else {
        // scrapId가 있었으므로 토글 === 취소
        await deletePostScrap(scrapId);
        setScrapId(null);
        localStorage.removeItem(storageKey);
      }
    } catch (e) {
      console.error(e);
      alert("스크랩 처리에 실패했습니다.");
    } finally {
      setIsScraping(false);
    }
  };

  // 관련 공문 추천
  const { data: recommendDocs = [], isLoading: isRecommedsLoading } = useFetch(
    "/data/CardList.json",
    []
  );
  return (
    <>
      {/* fixed 되는 컴포넌트들 */}
      <Header
        hasBack={true}
        title={!isPostLoading && post?.doc_title}
        hasScrap={true}
        isScrap={isScraped}
        onToggleScrap={toggleScrap}
        scrapDisabled={isScraping}
      />
      <B.ButtonWrapper>
        <GoToTop $isOpen={isOpen} />
        <B.ButtonCircle
          $icon={buttonCircle}
          $isVisible={!isOpen}
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: "transparent" }}
        />
      </B.ButtonWrapper>
      {!isPostLoading && post && (
        <Chatbot isOpen={isOpen} handleClose={handleClose} postId={post.id} />
      )}

      {/* 페이지 UI */}
      <S.DetailContainer>
        {!isPostLoading && post && (
          <>
            {/* 공문 정보 박스 */}
            <S.InfoBox>
              <S.BadgeWrapper>
                <Badge key={post.region_id}>{REGION_MAP[post.region_id]}</Badge>
                {(post.categories ?? []).map((c) => (
                  <Badge color='teal' key={c.id}>
                    {c.category_name}
                  </Badge>
                ))}
              </S.BadgeWrapper>
              <S.Title>{post.doc_title}</S.Title>
              <S.MetaInfo>
                <S.MetaInfoLabel>
                  <li>작성일</li>
                  <li>관련부서</li>
                  <li>문의</li>
                </S.MetaInfoLabel>
                <S.MetaInfoData>
                  <li>{post.pub_date.slice(0, 10)}</li>
                  {/* 관련부서 추가 or 아예 삭제 필요 */}
                  <li>관련부서</li>
                  {/* 문의 전화번호 추가 or 아예 삭제 필요 */}
                  <li>전화번호</li>
                </S.MetaInfoData>
              </S.MetaInfo>
            </S.InfoBox>

            {/* AI 요약 */}
            <S.AIBox>
              <S.AICharacter />
              <S.AIHeader>
                <S.AITitle>AI 요약</S.AITitle>
              </S.AIHeader>
              {/* 추가 예정 */}
              <S.Content>
                추가 예정 추가 예정 추가 예정 추가 예정 추가 예정 추가 예정 추가
                예정 추가 예정 추가 예정 추가 예정 추가 예정 추가 예정 추가 예정
                추가 예정 추가 예정 추가 예정
              </S.Content>
            </S.AIBox>

            {/* 본문 */}
            <S.ContentBox>
              <S.Content>{post.doc_content.replaceAll(".", ". ")}</S.Content>
              {/* 추가 예정 */}
              <img src={post.image_url} />
            </S.ContentBox>

            {/* 본문 하단 버튼 */}
            <S.ButtonBox>
              {/* 추가 필요 */}
              <S.LinkBtn href={post.url}>원문 바로가기</S.LinkBtn>
              <S.SecondBtnBox>
                <S.SecondBtn>
                  <img src={isScraped ? scrapTrue : scrapFalse} />
                  스크랩
                </S.SecondBtn>
                <S.SecondBtn>
                  <img src={share} />
                  공유하기
                </S.SecondBtn>
              </S.SecondBtnBox>
            </S.ButtonBox>
          </>
        )}

        {/* 관련 공문 추천 */}
        <S.RecommendBox>
          <S.Title>관련 공문 추천</S.Title>
          {/* 2개만 보여지게 함 */}
          {!isRecommedsLoading && recommendDocs && (
            <>
              {recommendDocs?.slice(0, 2).map((p) => (
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
        </S.RecommendBox>
      </S.DetailContainer>
    </>
  );
}
