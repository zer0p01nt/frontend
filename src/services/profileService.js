const API_URL = process.env.REACT_APP_API_URL;

// 지역 검색
export async function fetchRegions(q, page = 1) {
  const res = await fetch(
    `${API_URL}/region/regions/?search=${encodeURIComponent(q)}&page=${page}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// 프로필 수정
export async function putProfile(body) {
  const url = `${API_URL}/user/profile/`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
