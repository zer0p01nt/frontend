import useFetch from "./useFetch";

const API_URL = process.env.REACT_APP_API_URL;

// 프로필 정보 fetch하는 함수
export default function useProfile() {
  const { data: profile = {}, isLoading: isProfileLoading } = useFetch(
    `${API_URL}/user/profile/`,
    {},
  );
  return { profile, isProfileLoading };
}
