import Cookies from "js-cookie";

export default function getAccessToken() {
  return Cookies.get("accessToken");
}
