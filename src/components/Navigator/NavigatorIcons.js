import homeTrue from "../../assets/Navigator/home-true.svg";
import homeFalse from "../../assets/Navigator/home-false.svg";
import notiTrue from "../../assets/Navigator/noti-true.svg";
import notiFalse from "../../assets/Navigator/noti-false.svg";
import newsTrue from "../../assets/Navigator/news-true.svg";
import newsFalse from "../../assets/Navigator/news-false.svg";
import myTrue from "../../assets/Navigator/my-true.svg";
import myFalse from "../../assets/Navigator/my-false.svg";

export const navItems = [
  {
    key: "home",
    label: "홈",
    icons: { true: homeTrue, false: homeFalse },
    path: "/",
  },
  {
    key: "notification",
    label: "알림",
    icons: { true: notiTrue, false: notiFalse },
    path: "/notification",
  },
  {
    key: "news",
    label: "소식",
    icons: { true: newsTrue, false: newsFalse },
    path: "/",
  },
  {
    key: "mypage",
    label: "마이",
    icons: { true: myTrue, false: myFalse },
    path: "/mypage",
  },
];
