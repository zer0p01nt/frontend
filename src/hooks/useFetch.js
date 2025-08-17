import { useEffect, useState } from "react";

// 기본값을 매개변수로 받는 GET 요청 hook입니다
// 단일 fetch(게시물 상세내용 등) => {}
// 다중 fetch(게시물 목록 등) => []
export default function useFetch(url, initialValue = null) {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(!!url); // url이 있으면 로딩

  useEffect(() => {
    if (!url) return;

    const ac = new AbortController();
    setIsLoading(true);

    (async () => {
      try {
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => ac.abort();
  }, [url]);

  return { data, isLoading };
}
