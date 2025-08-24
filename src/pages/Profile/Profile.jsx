import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useProfile from "../../hooks/useProfile";
import { fetchRegions, putProfile } from "../../services/profileService.js";

import {
  CATEGORY_OPTIONS,
  NAME_CATEGORY_MAP,
  NAME_REGION_MAP,
} from "../../constants/maps.js";

import * as S from "./ProfileStyle";
import * as B from "../../components/Button/ButtonStyle";

import Header from "../../components/Header/Header";
import SearchInputField from "../../components/SearchInputField/SearchInputField";

import close from "../../assets/Profile/close_small.svg";
import add from "../../assets/Profile/add.svg";
import DisableToast from "../../components/DisableToast/DisableToast.jsx";

const ALL_CATEGORY_LABEL = "모든 주제";
const PAGE_SIZE = 10;

export default function Profile() {
  const [regionOpen, setRegionOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  // 서버 기준 이전의 region_id 저장 (region_id 바뀌는 오류 방지)
  const initRegionIdRef = useRef("");

  // 선택 불가 지역 토스트 상태 관리
  const [toastShow, setToastShow] = useState(false);

  // 지역 검색 입력값
  const [value, setValue] = useState("");

  // 프로필 정보 fetch
  const { profile, isProfileLoading } = useProfile();
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);

  // 최초 로딩 시 초기화
  useEffect(() => {
    if (!isProfileLoading && profile) {
      setRegions(profile.data.user_regions ?? []);
      setCategories(profile.data.user_categories ?? []);
      // 초기 region_id 저장
      const initKey = (profile.data.user_regions ?? [])
        .map((r) => r.region.id)
        .sort((a, b) => a - b)
        .join(",");
      initRegionIdRef.current = initKey;
    }
  }, [isProfileLoading, profile]);

  // ------------------------ 지역 ------------------------
  // 기존 지역 저장
  const selectedRegionIds = useMemo(
    () => new Set(regions.map((r) => r.region.id)),
    [regions]
  );
  const canAddMoreRegions = regions.length < 3;

  // 지역 검색용 상태 관리
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isFetchingNext, setIsFetchingNext] = useState(false);

  // 무한 스크롤 센티널
  const loadMoreRef = useRef(null);

  // 지역 수정창 뜰 때마다 초기화
  useEffect(() => {
    if (!regionOpen) {
      setSearchResults([]);
      setValue("");
      setPage(1);
      setHasMore(false);
      setIsFetchingNext(false);
    }
  }, [regionOpen]);

  const onRegionSearchSubmit = async (q) => {
    const query = (q ?? value).trim();
    if (!query) return;

    try {
      setSearchLoading(true);

      // 1페이지 로드
      const data = await fetchRegions(query);
      const results = Array.isArray(data?.results) ? data.results : [];
      setSearchQuery(query);
      setPage(1);
      setSearchResults(results);
      setHasMore(results.length === PAGE_SIZE);
    } catch {
      alert("검색에 실패했습니다.");
    } finally {
      setSearchLoading(false);
    }
  };

  // 다음 페이지 로드
  const fetchNextPage = useCallback(async () => {
    if (!hasMore || isFetchingNext || searchLoading) return;

    try {
      setIsFetchingNext(true);
      const nextPage = page + 1;

      const data = await fetchRegions(searchQuery, nextPage);
      const results = Array.isArray(data?.results) ? data.results : [];
      setSearchResults((prev) => [...prev, ...results]);

      setPage(nextPage);
      setHasMore(results.length === PAGE_SIZE);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingNext(false);
    }
  }, [hasMore, isFetchingNext, searchLoading, page, searchQuery]);

  // 인터섹션 옵저버 사용 : 센티널 보이면 다음 페이지 요청하도록
  useEffect(() => {
    if (!regionOpen) return;
    const ref = loadMoreRef.current;
    if (!ref) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [regionOpen, fetchNextPage]);

  // 지역명으로 아이디 매핑
  const mapNameId = (name) => NAME_REGION_MAP[name];

  // 검색 결과에서 지역 추가
  const addRegion = (raw) => {
    // 3개 초과할 때
    if (!canAddMoreRegions) {
      alert("관심 지역은 최대 3개까지 설정할 수 있습니다.");
      return;
    }
    // 매핑에 없을 때
    const id = mapNameId(raw.district);
    if (!id) {
      setToastShow(true);
      // 1초 후 사라짐
      setTimeout(() => setToastShow(false), 1000);
      return;
    }
    // 이미 선택되어 있을 때
    if (
      regions.some((r) => mapNameId(r.region.district) === id) ||
      selectedRegionIds.has(id)
    ) {
      alert("이미 선택한 지역입니다.");
      return;
    }

    // 프로필에 추가
    setRegions((prev) => [...prev, { region: { id, district: raw.district } }]);
  };

  // ------------------------ 카테고리 ------------------------
  // 선택한 카테고리
  const selectedNames = useMemo(() => {
    return new Set(
      categories.map((c) => c.category?.category_name).filter(Boolean)
    );
  }, [categories]);

  // 선택하지 않은 카테고리
  const remainingCategories = useMemo(() => {
    return CATEGORY_OPTIONS.filter((name) => !selectedNames.has(name));
  }, [selectedNames]);

  // 카테고리명으로 아이디 매핑
  const mapCategoryId = (name) => NAME_CATEGORY_MAP[name];

  // 카테고리 추가
  const addCategoryByName = (name) => {
    if (!name) return;
    if (selectedNames.has(name)) return;

    // 모든 주제 클릭 : 모든 주제 제외 나머지 제거
    if (name === ALL_CATEGORY_LABEL) {
      const id = mapCategoryId(name);
      setCategories([{ category: { id, category_name: name } }]);
      return;
    }

    // 모든 주제 선택된 상태에서 다른 주제 선택하면 모든 주제 제거
    if (selectedNames.has(ALL_CATEGORY_LABEL)) {
      setCategories((prev) =>
        prev.filter(
          (item) => item.category?.category_name !== ALL_CATEGORY_LABEL
        )
      );
    }

    const id = mapCategoryId(name);
    setCategories((prev) => [
      ...prev,
      { category: { id, category_name: name } },
    ]);
  };

  // 카테고리 제거 로직
  const removeCategory = (c) => {
    setCategories((prev) =>
      prev.filter((it) => {
        const a = it.category?.id ?? it.category?.category_name;
        const b = c.category?.id ?? c.category?.category_name;
        return a !== b;
      })
    );
  };

  // 모두 삭제 시 모든 주제 선택
  useEffect(() => {
    if (categoryOpen && categories.length === 0) {
      setCategories((prev) => [
        ...prev,
        { category: { id: 0, category_name: ALL_CATEGORY_LABEL } },
      ]);
    }
  }, [categoryOpen, categories.length]);

  // ------------------------ 저장 (PUT) ------------------------
  const [saving, setSaving] = useState(false);

  const saveProfile = async (closeBtn) => {
    try {
      setSaving(true);

      // 모든 주제가 선택되어 있으면 category_ids를 빈 배열로 보냄
      const hasAll = categories.some(
        (c) => c?.category?.category_name === ALL_CATEGORY_LABEL
      );
      const category_ids = hasAll ? [] : categories.map((c) => c?.category?.id);

      // 현재 region_id key
      const currentRegionKey = regions
        .map((r) => r.region.id)
        .sort((a, b) => a - b)
        .join(",");
      const regionsChanged = currentRegionKey !== initRegionIdRef.current;

      // region은 변경된 경우에만 포함
      const body = {
        name: profile?.data?.name,
        birth: profile?.data?.birth,
        gender: profile?.data?.gender,
        category_ids,
        ...(regionsChanged
          ? {
              regions: regions.map((r) => ({
                region_id: r.region.id,
                type: "관심지역",
              })),
            }
          : {}),
      };

      await putProfile(body);

      // 이제부터 이게 초기 region_id
      if (regionsChanged) {
        initRegionIdRef.current = currentRegionKey;
      }

      if (closeBtn === "region") setRegionOpen(false);
      if (closeBtn === "category") setCategoryOpen(false);
    } catch (e) {
      alert("프로필 저장 중 오류가 발생했습니다.");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* fixed 되는 컴포넌트들 */}
      <Header hasBack={true} title='정보 수정' hasScrap={false} />
      <DisableToast isVisible={toastShow} />

      <S.ProfileContainer>
        {!isProfileLoading && profile && (
          <S.InfoContainer>
            <S.SectionTitle>회원 정보</S.SectionTitle>
            <S.SectionContainer>
              <S.SectionBox>
                <S.MiniTitle>이름</S.MiniTitle>
                <S.MiniContent>{profile?.data?.name}</S.MiniContent>
              </S.SectionBox>
              <S.DetailBox>
                <S.SectionBox>
                  <S.MiniTitle>생년월일</S.MiniTitle>
                  <S.MiniContent>{profile?.data?.birth}</S.MiniContent>
                </S.SectionBox>
                <S.SectionBox>
                  <S.MiniTitle>성별</S.MiniTitle>
                  <S.MiniContent>{profile?.data?.gender_display}</S.MiniContent>
                </S.SectionBox>
              </S.DetailBox>
            </S.SectionContainer>
          </S.InfoContainer>
        )}

        <S.InfoContainer>
          <S.SectionTitle>관심 분야 정보</S.SectionTitle>
          <S.InterestContainer>
            <S.ContentBox>
              <S.DetailTitle>
                <div>
                  관심 지역
                  {regionOpen && <div>최대 3개까지 설정 가능해요</div>}
                </div>
                <button
                  type='button'
                  onClick={() =>
                    regionOpen ? saveProfile("region") : setRegionOpen(true)
                  }
                  disabled={saving}
                >
                  {regionOpen ? "수정완료" : "수정하기"}
                </button>
              </S.DetailTitle>
              <S.BtnList>
                {regionOpen ? (
                  <>
                    {!isProfileLoading && profile && (
                      <>
                        {regions.map((r) => (
                          <B.HiddenLabel key={r.id}>
                            <S.HiddenInput
                              type='button'
                              id={r.id}
                              onClick={() =>
                                setRegions((prev) =>
                                  prev.filter((item) => item.id !== r.id)
                                )
                              }
                            />
                            <B.SelectedBtnContainer
                              $checked={true}
                              style={{
                                boxShadow: "none",
                                display: "flex",
                                gap: "8px",
                              }}
                            >
                              {r.region?.district}
                              <img src={close} />
                            </B.SelectedBtnContainer>
                          </B.HiddenLabel>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {!isProfileLoading && profile && (
                      <>
                        {(regions ?? []).map((r) => (
                          <B.SelectedBtnContainer
                            key={r.id}
                            style={{ boxShadow: "none" }}
                          >
                            {r.region?.district}
                          </B.SelectedBtnContainer>
                        ))}
                      </>
                    )}
                  </>
                )}
              </S.BtnList>
              {regionOpen && (
                <S.SearchBox>
                  <S.MiniTitle>지역 검색</S.MiniTitle>
                  <SearchInputField
                    border='gray'
                    placeholder='예) 서울특별시, 도봉구'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onSubmit={onRegionSearchSubmit}
                  />
                  {!searchLoading && searchResults.length > 0 && (
                    <S.SearchResultBox>
                      {searchResults.map((raw) => {
                        const id = mapNameId(raw.district);
                        const already =
                          id &&
                          (regions.some(
                            (r) => mapNameId(r.region.district) === id
                          ) ||
                            selectedRegionIds.has(id));

                        return (
                          <S.SearchResult key={id ?? raw.region_code}>
                            <S.ResultTitle>{raw.full_name}</S.ResultTitle>
                            <B.HiddenLabel>
                              <S.HiddenInput
                                type='button'
                                onClick={() => addRegion(raw)}
                              />
                              <B.SelectedBtnContainer
                                $checked={already}
                                style={{
                                  boxShadow: "none",
                                }}
                              >
                                {already ? "선택됨" : "선택"}
                              </B.SelectedBtnContainer>
                            </B.HiddenLabel>
                          </S.SearchResult>
                        );
                      })}
                      {/* 무한 스크롤 센티널 */}
                      {(hasMore || isFetchingNext) && (
                        <div ref={loadMoreRef} style={{ height: 1 }}></div>
                      )}
                    </S.SearchResultBox>
                  )}
                </S.SearchBox>
              )}
            </S.ContentBox>
            <S.ContentBox>
              <S.DetailTitle>
                <div>
                  관심 주제
                  {categoryOpen && <div>현재 알림 받고 있는 주제예요</div>}
                </div>
                <button
                  type='button'
                  onClick={() =>
                    categoryOpen
                      ? saveProfile("category")
                      : setCategoryOpen(true)
                  }
                  disabled={saving}
                >
                  {categoryOpen ? "수정완료" : "수정하기"}
                </button>
              </S.DetailTitle>
              <S.BtnList>
                {categoryOpen ? (
                  <>
                    {!isProfileLoading && profile && (
                      <S.OpenBtnList>
                        <S.SelectedList>
                          {categories.map((c) => (
                            <B.HiddenLabel key={c.category?.id}>
                              <S.HiddenInput
                                type='button'
                                id={c.category?.id}
                                onClick={() => removeCategory(c)}
                              />
                              <B.SelectedBtnContainer
                                $checked={true}
                                style={{
                                  boxShadow: "none",
                                  display: "flex",
                                  gap: "8px",
                                }}
                              >
                                {c.category?.category_name}
                                <img src={close} />
                              </B.SelectedBtnContainer>
                            </B.HiddenLabel>
                          ))}
                        </S.SelectedList>
                        <S.UnSelectedList>
                          {remainingCategories.map((name) => {
                            const remainId = mapCategoryId(name);

                            return (
                              <B.HiddenLabel>
                                <S.HiddenInput
                                  type='button'
                                  id={remainId}
                                  onClick={() => addCategoryByName(name)}
                                />
                                <B.SelectedBtnContainer
                                  style={{
                                    boxShadow: "none",
                                    display: "flex",
                                    gap: "8px",
                                  }}
                                >
                                  {name}
                                  <img src={add} />
                                </B.SelectedBtnContainer>
                              </B.HiddenLabel>
                            );
                          })}
                        </S.UnSelectedList>
                      </S.OpenBtnList>
                    )}
                  </>
                ) : (
                  <>
                    {!isProfileLoading && profile && (
                      <>
                        {(categories ?? []).map((c) => (
                          <B.SelectedBtnContainer
                            key={c.id}
                            style={{ boxShadow: "none" }}
                          >
                            {c.category?.category_name}
                          </B.SelectedBtnContainer>
                        ))}
                      </>
                    )}
                  </>
                )}
              </S.BtnList>
            </S.ContentBox>
          </S.InterestContainer>
        </S.InfoContainer>
      </S.ProfileContainer>
    </>
  );
}
