import { useEffect, useState } from "react";

// 기본값을 매개변수로 받는 hook입니다
// 단일 fetch(게시물 상세내용 등) => {}
// 다중 fetch(게시물 목록 등) => []
export default function useFetch(url, initialValue = null) {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [url]);

  return data;
}
