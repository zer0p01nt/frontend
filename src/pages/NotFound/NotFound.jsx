import * as S from "./NotFoundStyle";
import Empty from "../../components/Empty/Empty";

export default function NotFound() {
  return (
    <S.Container>
      <Empty
        text='페이지를 찾을 수 없어요'
        subText='주소가 잘못되었거나 사라진 페이지입니다.'
      />
    </S.Container>
  );
}
