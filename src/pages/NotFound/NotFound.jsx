import * as S from "./NotFoundStyle";
import Empty from "../../components/Empty/Empty";

export default function NotFound() {
  return (
    <S.Container>
      <Empty text='잘못된 접근입니다.' subText='' isInNotFound={true} />
    </S.Container>
  );
}
