import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import { ButtonWrapper } from "../../styles/ButtonCircle";
import * as S from "./ScrapedPostsStyle";
import Filter from "../../components/Filter/Filter";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import useFetch from "../../hooks/useFetch";
import * as H from "../Home/HomeStyle";
import CardList from "../../components/CardList/CardList";
import { useState } from "react";

export default function ScrapedPosts() {
  // 스크랩된 공문 불러오기 => 추후 fetch 링크 수정
  const { data: scrapedPosts = [], isLoading: isPostsLoading } = useFetch(
    "/data/CardList.json",
    []
  );

  // 최신순, 오래된순 정렬 => 기본값은 최신순(true) <-> 오래된순(false)
  const [order, setOrder] = useState(true);

  return (
    <>
      {/* fixed 되는 컴포넌트들 */}
      <Header hasBack={true} title='공문 스크랩' hasScrap={false} />
      <ButtonWrapper>
        <GoToTop />
      </ButtonWrapper>
      <S.ScrapedContainer>
        <CategoryBar />
        <Filter />
        <div>
          <div>{scrapedPosts?.length}건</div>
        </div>
        <H.CardListWrapper>
          {!isPostsLoading && scrapedPosts && (
            <>
              {scrapedPosts?.map((p) => (
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
      </S.ScrapedContainer>
    </>
  );
}
