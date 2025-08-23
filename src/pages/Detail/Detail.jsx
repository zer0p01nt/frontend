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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { REGION_MAP } from "../../constants/maps";
import {
  createPostScrap,
  deletePostScrap,
  findScrapId,
} from "../../services/scrapService";
import ShareToast from "../../components/ShareToast/ShareToast";
import { formatText } from "../../utils/format";

const API_URL = process.env.REACT_APP_API_URL;

export default function Detail() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const postId = Number(id);

  // 공유하기 토스트 상태 관리
  const [toastShow, setToastShow] = useState(false);

  // 챗봇 열림 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  // 공문 본문 fetch
  const { data: post, isLoading: isPostLoading } = useFetch(
    `${API_URL}/documents/${id}/`,
    {}
  );

  // 초기에 챗봇 세션 포함 쿼리파라미터 조립
  useEffect(() => {
    if (isPostLoading || !post) return;

    const sid = Number(post.chatbot_session_id);
    const cur = searchParams.get("session");
    const next = new URLSearchParams(searchParams);

    if (Number.isFinite(sid)) {
      // 다른 값이 들어있으면 그걸로 집어넣고, 없으면 새로 만듦
      if (cur !== String(sid)) {
        next.set("session", String(sid));
        setSearchParams(next, { replace: true });
      }
    } else if (cur) {
      // 세션이 없는데 쿼리가 남아있으면 없앰
      next.delete("session");
      setSearchParams(next, { replace: true });
    }
  }, [isPostLoading, post, searchParams, setSearchParams]);

  // 스크랩 관련 로직
  const [scrapId, setScrapId] = useState(null);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapReady, setScrapReady] = useState(false); // 초기에 스크랩 여부 조회했는지
  const isScraped = scrapId !== null;

  // 초기화 : 서버 목록에서 현재 문서 스크랩 여부 조회
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setScrapReady(false);
      try {
        const id = await findScrapId(postId);
        if (!cancelled) setScrapId(id);
      } catch (e) {
        console.error("스크랩 목록 조회 실패", e);
      } finally {
        if (!cancelled) setScrapReady(true);
      }
    })();
  }, [postId]);

  const toggleScrap = async () => {
    if (isScraping || isPostLoading || isScraping) return;

    setIsScraping(true);

    try {
      if (!isScraped) {
        // scrapId가 없었으므로 새로 스크랩
        const created = await createPostScrap(postId);
        const newId = created?.data?.id;
        if (!newId) throw new Error("응답에 스크랩 ID가 없습니다.");
        setScrapId(newId);
      } else {
        // scrapId가 있었으므로 토글 === 취소
        await deletePostScrap(scrapId);
        setScrapId(null);
      }
    } catch (e) {
      console.error(e);
      alert("스크랩 처리에 실패했습니다.");
    } finally {
      setIsScraping(false);
    }
  };

  // 공유하기 버튼 로직
  const onShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToastShow(true);
      // 1초 후 사라짐
      setTimeout(() => setToastShow(false), 1000);
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <>
      {/* fixed 되는 컴포넌트들 */}
      <Header
        hasBack={true}
        title={!isPostLoading && post?.doc_title}
        hasScrap={true}
        isScrap={isScraped}
        onToggleScrap={toggleScrap}
        scrapDisabled={isScraping || !scrapReady}
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
      <ShareToast isVisible={toastShow} />

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
                  {/* <li>문의</li> */}
                </S.MetaInfoLabel>
                <S.MetaInfoData>
                  <li>{post.pub_date.slice(0, 10)}</li>
                  {/* 관련부서 추가 or 아예 삭제 필요 */}
                  <li>{post.related_departments}</li>
                  {/* 문의 전화번호 추가 or 아예 삭제 필요 */}
                  {/* <li>전화번호</li> */}
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
              <S.Content>{post.summary}</S.Content>
            </S.AIBox>

            {/* 본문 */}
            <S.ContentBox>
              <S.Content>{formatText(post.doc_content)}</S.Content>
              {/* 추가 예정 */}
              <img src={post.image_url ?? null} />
            </S.ContentBox>

            {/* 본문 하단 버튼 */}
            <S.ButtonBox>
              {/* 추가 필요 */}
              <S.LinkBtn href={post.link_url}>원문 바로가기</S.LinkBtn>
              <S.SecondBtnBox>
                <S.SecondBtn
                  onClick={toggleScrap}
                  disabled={!scrapReady || isScraping}
                >
                  <img src={isScraped ? scrapTrue : scrapFalse} />
                  스크랩
                </S.SecondBtn>
                <S.SecondBtn onClick={onShareClick}>
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
          {post.similar_documents && (
            <>
              {/* 뱃지 추가 필요 */}
              {post.similar_documents?.map((doc) => (
                <CardList
                  title={doc.doc_title}
                  date={doc.pub_date.slice(0, 10)}
                  key={doc.id}
                  onClick={() => navigate(`/post/${doc.id}`)}
                  type={post.doc_type}
                />
              ))}
            </>
          )}
        </S.RecommendBox>
      </S.DetailContainer>
    </>
  );
}
