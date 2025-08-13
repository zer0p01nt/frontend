import { useState } from "react";
import useFetch from "../../hooks/useFetch";

import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import CardList from "../../components/CardList/CardList";
import Badge from "../../components/Badge/Badge";
import Chatbot from "../../components/Chatbot/Chatbot";

import scrapTrue from "../../assets/Detail/bookmark_true.svg";
import scrapFalse from "../../assets/Detail/bookmark_false.svg";
import share from "../../assets/Detail/share.svg";

import * as B from "../../styles/ButtonCircle";
import * as S from "./DetailStyle";

export default function Detail() {
  // param 등 route 작업도 추가 필요

  // 챗봇 열림 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const { data: post, isLoading: isPostLoading } = useFetch(
    "/data/EachDetail.json",
    {}
  );
  // fetch url 추후 변경 예정

  let isScrap = true;
  // scrap 로직 추가 예정

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
        title={post.title}
        hasScrap={true}
        isScrap={false}
      />
      <B.ButtonWrapper>
        <GoToTop />
        <B.ButtonCircle
          $icon='/logo192.png'
          $isVisible={true}
          onClick={() => setIsOpen(true)}
        />
        {/* 캐릭터 이미지로 교체 예정 */}
      </B.ButtonWrapper>
      <Chatbot isOpen={isOpen} handleClose={handleClose} />

      {/* 페이지 UI */}
      <S.DetailContainer>
        {/* 공문 정보 박스 */}
        <S.InfoBox>
          <S.BadgeWrapper>
            <Badge>{post.region}</Badge>
            <Badge color='teal'>{post.keyword}</Badge>
          </S.BadgeWrapper>
          <S.Title>{post.title}</S.Title>
          <S.MetaInfo>
            <S.MetaInfoLabel>
              <li>작성일</li>
              <li>관련부서</li>
              <li>문의</li>
            </S.MetaInfoLabel>
            <S.MetaInfoData>
              <li>{post.date}</li>
              <li>{post.department}</li>
              <li>{post.tel}</li>
            </S.MetaInfoData>
          </S.MetaInfo>
        </S.InfoBox>

        {/* AI 요약 */}
        <S.AIBox>
          <S.AIHeader>
            <S.AITitle>AI 요약</S.AITitle>
            <img src='/logo192.png' style={{ width: "100px" }} />
            {/* 캐릭터 이미지로 교체 예정 */}
          </S.AIHeader>
          <S.Content>{post.aiSummary}</S.Content>
        </S.AIBox>

        {/* 본문 */}
        <S.ContentBox>
          <S.Content>{post.content}</S.Content>
          <img src={post.imgLink} />
        </S.ContentBox>

        {/* 본문 하단 버튼 */}
        <S.ButtonBox>
          <S.LinkBtn href={post.url}>원문 바로가기</S.LinkBtn>
          <S.SecondBtnBox>
            <S.SecondBtn>
              <img src={isScrap ? scrapTrue : scrapFalse} />
              스크랩
            </S.SecondBtn>
            <S.SecondBtn>
              <img src={share} />
              공유하기
            </S.SecondBtn>
          </S.SecondBtnBox>
        </S.ButtonBox>

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
