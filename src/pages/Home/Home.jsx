import React from "react";
import * as S from "./HomeStyle.js";
// ▼▼▼ useNavigate를 import 해주세요 ▼▼▼
import { useNavigate } from "react-router-dom";
import CardList from "../../components/CardList/CardList";
import Badge from "../../components/Badge/Badge";
import Header from "../../components/Header/Header.jsx";

export default function Home() {
  // ▼▼▼ 페이지 이동을 위한 함수를 추가합니다 ▼▼▼
  const navigate = useNavigate();

  const goToSearch = () => {
    navigate("/search");
  };
  // ▲▲▲ 여기까지 추가 ▲▲▲

  return (
    // HomeWrapper로 한번 감싸줍니다.
    <S.HomeWrapper>
      <Header
        hasBack={false}
        title='Villit'
        hasScrap={false}
        isTransparent={true}
      />
      <S.ContentContainer>
        <S.TitleContainer>
          <S.TitleWrapper>
            <S.TitleBox>
              <S.Title>
                사용자님!
                <div>
                  오늘도 <strong>맞춤 소식</strong> 전해드릴게요
                </div>
              </S.Title>
              <S.InterestSection>
                <S.Subtitle>관심 분야</S.Subtitle>
                <S.BadgeWrapper>
                  <Badge color='blue' isFilled={false}>
                    도봉구
                  </Badge>
                  <Badge color='blue' isFilled={false}>
                    강북구
                  </Badge>
                  <Badge color='pink' isFilled={false}>
                    +1
                  </Badge>
                </S.BadgeWrapper>
                <S.BadgeWrapper>
                  <Badge color='teal' isFilled={false}>
                    교통
                  </Badge>
                  <Badge color='teal' isFilled={false}>
                    문화
                  </Badge>
                </S.BadgeWrapper>
              </S.InterestSection>
            </S.TitleBox>
            <S.Character />
          </S.TitleWrapper>
          
          {/* ▼▼▼ 검색창 섹션을 이 코드로 교체해주세요 ▼▼▼ */}
          <S.FakeSearchInputWrapper onClick={goToSearch}>
            <span>필요한 정보가 있으신가요?</span>
            <div />
          </S.FakeSearchInputWrapper>
          {/* ▲▲▲ 여기까지 교체 ▲▲▲ */}

        </S.TitleContainer>
        <S.SectionWrapper>
          {/* (이하 코드는 모두 동일합니다) */}
          <div>
            <S.SectionHeader>
              <S.SectionTitle>관심 분야의 최근 알림</S.SectionTitle>
              <S.MoreLink href='#'>더보기 &gt;</S.MoreLink>
            </S.SectionHeader>
            <S.CardListWrapper>
              <CardList
                badges={[
                  { text: "도봉구", color: "blue" },
                  { text: "시설", color: "teal" },
                ]}
                title='공문 제목 공문 제목 공문 제목'
                date='2025.07.30'
              />
            </S.CardListWrapper>
          </div>

          <div>
            <S.SectionHeader>
              <S.SectionTitle>다가오는 관심 일정</S.SectionTitle>
              <S.MoreLink href='#'>더보기 &gt;</S.MoreLink>
            </S.SectionHeader>
            <S.HorizontalScrollWrapper>
              <CardList
                variant='card'
                badges={[
                  { text: "진행중", color: "pink" },
                  { text: "시설", color: "blue" },
                ]}
                title='다가오는 일정에 대한 제목입니다.'
                date='2025.07.30 ~ 2025.07.31'
              />
              <CardList
                variant='card'
                badges={[
                  { text: "D-1", color: "pink" },
                  { text: "시설", color: "blue" },
                ]}
                title='두 번째 다가오는 일정입니다.'
                date='2025.08.01 ~ 2025.08.10'
              />
            </S.HorizontalScrollWrapper>
          </div>

          <div>
            <S.SectionHeader>
              <S.SectionTitle>관심 지역 최근 소식</S.SectionTitle>
              <S.MoreLink href='#'>더보기 &gt;</S.MoreLink>
            </S.SectionHeader>
            <S.CardListWrapper>
              <CardList
                badges={[
                  { text: "도봉구", color: "blue" },
                  { text: "시설", color: "teal" },
                ]}
                title='관심 지역의 최근 소식입니다.'
                date='2025.07.30'
              />
            </S.CardListWrapper>
          </div>
        </S.SectionWrapper>
      </S.ContentContainer>
    </S.HomeWrapper>
  );
}