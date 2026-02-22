export const getSearchHistory = () => {
  const history = localStorage.getItem("searchHistory");
  return history ? JSON.parse(history) : [];
};

export const addSearchHistory = (term) => {
  if (!term) return;
  let history = getSearchHistory();

  history = history.filter((item) => item.term !== term);
  const newEntry = {
    term,
    date: new Date().toLocaleString("ko-KR").slice(0, 12),
  };
  const newHistory = [newEntry, ...history].slice(0, 10);
  localStorage.setItem("searchHistory", JSON.stringify(newHistory));
};

export const deleteSearchHistory = (e, term) => {
  e.stopPropagation();
  let history = getSearchHistory();
  history = history.filter((item) => item.term !== term);
  localStorage.setItem("searchHistory", JSON.stringify(history));
  return history;
};
