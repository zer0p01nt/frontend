import { useEffect, useMemo, useState } from "react";
import useProfile from "../../hooks/useProfile";

import { CATEGORY_OPTIONS } from "../../constants/maps.js";

import * as S from "./ProfileStyle";
import * as B from "../../components/Button/ButtonStyle";

import Header from "../../components/Header/Header";
import SearchInputField from "../../components/SearchInputField/SearchInputField";

import close from "../../assets/Profile/close_small.svg";
import add from "../../assets/Profile/add.svg";

export default function Profile() {
  const [regionOpen, setRegionOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [value, setValue] = useState("");
  // 지역 검색 결과 체크 로직 -> 변경 필요
  const [check, setCheck] = useState(false);

  // 프로필 정보 fetch
  const { profile, isProfileLoading } = useProfile();
  const [regions, setRegions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!isProfileLoading && profile) {
      setRegions(profile.data.user_regions ?? []);
      setCategories(profile.data.user_categories ?? []);
    }
  }, [isProfileLoading, profile]);

  // 선택하지 않은 카테고리 관리
  const selectedNames = useMemo(() => {
    return new Set(
      categories.map((c) => c.category?.category_name).filter(Boolean)
    );
  }, [profile]);

  const remainingCategories = useMemo(() => {
    return CATEGORY_OPTIONS.filter((name) => !selectedNames.has(name));
  }, [selectedNames]);

  return (
    <>
      {/* fixed 되는 컴포넌트들 */}
      <Header hasBack={true} title='정보 수정' hasScrap={false} />
      <S.ProfileContainer>
        <S.InfoContainer>
          <S.SectionTitle>회원 정보</S.SectionTitle>
          <S.SectionContainer>
            <S.SectionBox>
              <S.MiniTitle>이름</S.MiniTitle>
              <S.MiniContent>김덕사</S.MiniContent>
            </S.SectionBox>
            <S.DetailBox>
              <S.SectionBox>
                <S.MiniTitle>생년월일</S.MiniTitle>
                <S.MiniContent>20000101</S.MiniContent>
              </S.SectionBox>
              <S.SectionBox>
                <S.MiniTitle>성별</S.MiniTitle>
                <S.MiniContent>여</S.MiniContent>
              </S.SectionBox>
            </S.DetailBox>
          </S.SectionContainer>
        </S.InfoContainer>
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
                  onClick={() => setRegionOpen((prev) => !prev)}
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
                          <B.HiddenLabel>
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
                        {(profile.data.user_regions ?? []).map((r) => (
                          <B.SelectedBtnContainer style={{ boxShadow: "none" }}>
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
                    placeholder='예) 서울시, 도봉구'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  {/* 조건 수정 필요 */}
                  {value && (
                    <S.SearchResultBox>
                      <S.SearchResult>
                        <S.ResultTitle>서울시 전체</S.ResultTitle>
                        <B.HiddenLabel>
                          <S.HiddenInput
                            type='button'
                            onClick={() => setCheck((prev) => !prev)}
                          />
                          <B.SelectedBtnContainer
                            $checked={check}
                            style={{
                              boxShadow: "none",
                            }}
                          >
                            선택
                          </B.SelectedBtnContainer>
                        </B.HiddenLabel>
                      </S.SearchResult>
                      <S.SearchResult>
                        <S.ResultTitle>서울시 전체</S.ResultTitle>
                        <B.HiddenLabel>
                          <S.HiddenInput
                            type='button'
                            onClick={() => setCheck((prev) => !prev)}
                          />
                          <B.SelectedBtnContainer
                            $checked={check}
                            style={{
                              boxShadow: "none",
                            }}
                          >
                            선택
                          </B.SelectedBtnContainer>
                        </B.HiddenLabel>
                      </S.SearchResult>
                      <S.SearchResult>
                        <S.ResultTitle>서울시 전체</S.ResultTitle>
                        <B.HiddenLabel>
                          <S.HiddenInput
                            type='button'
                            onClick={() => setCheck((prev) => !prev)}
                          />
                          <B.SelectedBtnContainer
                            $checked={check}
                            style={{
                              boxShadow: "none",
                            }}
                          >
                            선택
                          </B.SelectedBtnContainer>
                        </B.HiddenLabel>
                      </S.SearchResult>
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
                  onClick={() => setCategoryOpen((prev) => !prev)}
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
                            <B.HiddenLabel>
                              <S.HiddenInput
                                type='button'
                                id={c.category?.id}
                                onClick={() =>
                                  setCategories((prev) =>
                                    prev.filter(
                                      (item) =>
                                        item.category?.id !== c.category?.id
                                    )
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
                                {c.category?.category_name}
                                <img src={close} />
                              </B.SelectedBtnContainer>
                            </B.HiddenLabel>
                          ))}
                        </S.SelectedList>
                        <S.UnSelectedList>
                          {remainingCategories.map((name) => (
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
                          ))}
                        </S.UnSelectedList>
                      </S.OpenBtnList>
                    )}
                  </>
                ) : (
                  <>
                    {!isProfileLoading && profile && (
                      <>
                        {(profile.data.user_categories ?? []).map((c) => (
                          <B.SelectedBtnContainer style={{ boxShadow: "none" }}>
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
