/**
 * 페이지의 제목을 설정하는 컴포넌트
 * @param {object} props
 * @param {string} props.title - 페이지 제목
 */
export default function PageTitle({ title }) {
  return <title>{`${title} - Villit`}</title>;
}
