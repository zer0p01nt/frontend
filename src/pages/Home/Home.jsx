import React from "react";
import * as S from "./HomeStyle.js";
import SearchInputField from "../../components/SearchInputField/SearchInputField";
import CardList from "../../components/CardList/CardList";
import Badge from "../../components/Badge/Badge";

export default function Home() {
  return (
    <S.HomeWrapper>
      <S.GradientBg />
      <S.ContentContainer>
        {/* 상단 제목 섹션 */}
        <div>
          <S.Title>
            사용자님! <br />
            <span>오늘도 <strong>맞춤 소식</strong> 전해드릴게요</span>
          </S.Title>
          <S.InterestSection>
            <S.Subtitle>관심 분야</S.Subtitle>
            <S.BadgeWrapper>
              <Badge color="blue" isFilled={false}>
                도봉구
              </Badge>
              <Badge color="teal" isFilled={false}>
                강북구
              </Badge>
              <Badge color="pink" isFilled={false}>
                +1
              </Badge>
            </S.BadgeWrapper>
          </S.InterestSection>
        </div>

        {/* 검색창 섹션 */}
        <SearchInputField />

        {/* 관심 분야의 최근 알림 섹션 (세로 목록) */}
        <div>
          <S.SectionHeader>
            <S.SectionTitle>관심 분야의 최근 알림</S.SectionTitle>
            <S.MoreLink href="#">더보기 &gt;</S.MoreLink>
          </S.SectionHeader>
          <S.CardListWrapper>
            <CardList
              badges={[
                { text: "도봉구", color: "blue" },
                { text: "시설", color: "teal" },
              ]}
              title="공문 제목 공문 제목 공문 제목"
              date="2025.07.30"
            />
          </S.CardListWrapper>
        </div>

        {/* 다가오는 관심 일정 섹션 (가로 스크롤) */}
        <div>
          <S.SectionHeader>
            <S.SectionTitle>다가오는 관심 일정</S.SectionTitle>
            <S.MoreLink href="#">더보기 &gt;</S.MoreLink>
          </S.SectionHeader>
          <S.HorizontalScrollWrapper>
            <CardList
              variant="card"
              badges={[
                { text: "진행중", color: "pink" },
                { text: "시설", color: "blue" },
              ]}
              title="다가오는 일정에 대한 제목입니다."
              date="2025.07.30 ~ 2025.07.31"
            />
            <CardList
              variant="card"
              badges={[
                { text: "D-1", color: "pink" },
                { text: "시설", color: "blue" },
              ]}
              title="두 번째 다가오는 일정입니다."
              date="2025.08.01 ~ 2025.08.10"
            />
          </S.HorizontalScrollWrapper>
        </div>

        {/* 관심 지역 최근 소식 섹션 (세로 목록) */}
        <div>
          <S.SectionHeader>
            <S.SectionTitle>관심 지역 최근 소식</S.SectionTitle>
            <S.MoreLink href="#">더보기 &gt;</S.MoreLink>
          </S.SectionHeader>
          <S.CardListWrapper>
            <CardList
              badges={[
                { text: "도봉구", color: "blue" },
                { text: "시설", color: "teal" },
              ]}
              title="관심 지역의 최근 소식입니다."
              date="2025.07.30"
            />
          </S.CardListWrapper>
        </div>
      </S.ContentContainer>
    </S.HomeWrapper>
  );
}