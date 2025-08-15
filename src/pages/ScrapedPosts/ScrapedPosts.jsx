import GoToTop from "../../components/GoToTop/GoToTop";
import Header from "../../components/Header/Header";
import { ButtonWrapper } from "../../styles/ButtonCircle";
import * as S from "./ScrapedPostsStyle";
import Filter from "../../components/Filter/Filter";
import SmallFilter from "../../components/SmallFilter/SmallFilter";
import { SmallFilterWrapper } from "../../components/SmallFilter/SmallFilterStyle";

export default function ScrapedPosts() {
  return (
    <>
      {/* fixed 되는 컴포넌트들 */}
      <Header hasBack={true} title='공문 스크랩' hasScrap={false} />
      <ButtonWrapper>
        <GoToTop />
      </ButtonWrapper>
      <S.ScrapedContainer>
        <Filter />
        <SmallFilterWrapper>
          <SmallFilter sourceKey='user_regions' />
          <SmallFilter sourceKey='user_categories' />
        </SmallFilterWrapper>
      </S.ScrapedContainer>
    </>
  );
}
