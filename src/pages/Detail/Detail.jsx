import useFetch from "../../hooks/useFetch";
import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";

import * as B from "../../styles/ButtonCircle";
import * as S from "./DetailStyle";
import scrapTrue from "../../assets/Detail/bookmark_true.svg";
import scrapFalse from "../../assets/Detail/bookmark_false.svg";
import share from "../../assets/Detail/share.svg";

export default function Detail() {
  // param 등 route 작업도 추가 필요
  const data = useFetch("/data/EachDetail.json", {});
  // fetch url 추후 변경 예정
  let isScrap = true;
  // scrap 로직 추가 예정
  return (
    <>
      {/* fixed 되는 컴포넌트들 */}
      <Header
        hasBack={true}
        title={data.title}
        hasScrap={true}
        isScrap={false}
      />
      <B.ButtonWrapper>
        <GoToTop />
        <B.ButtonCircle icon='/logo192.png' $isVisible={true} />
        {/* 캐릭터 이미지로 교체 예정 */}
      </B.ButtonWrapper>

      {/* 페이지 UI */}
      <S.DetailContainer>
        <S.InfoBox>
          <S.BadgeWrapper>
            <S.RegionBadge>{data.region}</S.RegionBadge>
            <S.KeywordBadge>{data.keyword}</S.KeywordBadge>
          </S.BadgeWrapper>
          <S.Title>{data.title}</S.Title>
          <S.MetaInfo>
            <S.MetaInfoLabel>
              <li>작성일</li>
              <li>관련부서</li>
              <li>문의</li>
            </S.MetaInfoLabel>
            <S.MetaInfoData>
              <li>{data.date}</li>
              <li>{data.department}</li>
              <li>{data.tel}</li>
            </S.MetaInfoData>
          </S.MetaInfo>
        </S.InfoBox>
        <S.AIBox>
          <S.AIHeader>
            <S.AITitle>AI 요약</S.AITitle>
            <img src='/logo192.png' style={{ width: "100px" }} />
            {/* 캐릭터 이미지로 교체 예정 */}
          </S.AIHeader>
          <S.Content>{data.aiSummary}</S.Content>
        </S.AIBox>
        <S.ContentBox>
          <S.Content>{data.content}</S.Content>
          <img src={data.imgLink} />
        </S.ContentBox>
        <S.ButtonBox>
          <S.LinkBtn href={data.url}>원문 바로가기</S.LinkBtn>
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
        <S.RecommendBox>
          <S.Title>관련 공문 추천</S.Title>
          {/* CardList 컴포넌트 */}
        </S.RecommendBox>
      </S.DetailContainer>
    </>
  );
}
