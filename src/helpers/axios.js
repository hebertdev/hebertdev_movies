import Axios from "axios";
//auth helpers
import { getToken, deleteToken } from "helpers/auth";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_KEY;
const baseUrlAssets = process.env.NEXT_PUBLIC_ASSETS;

const axiosInstance = Axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: apiKey,
    session_id: getToken() ? getToken() : null,
  },
});

export default axiosInstance;

export function urlImageW300(value) {
  return `${baseUrlAssets}t/p/w440_and_h660_face/${value}`;
}

export function urlImageW1900(value) {
  return `${baseUrlAssets}t/p/w1920_and_h800_multi_faces/${value}`;
}

export function urlImageProfile(value) {
  return `${baseUrlAssets}/t/p/w300_and_h300_face/${value}`;
}
