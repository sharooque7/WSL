import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../router/route";
import { store } from "../store/configureStore";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const { data } = error.response;
    const { status, message } = data.error;
    switch (status) {
      case 401: {
        toast.error(message);
        break;
      }
      case 404: {
        toast.error(message);
        break;
      }
      case 422: {
        toast.error(message);
        break;
      }
      case 409: {
        toast.error(message);
        break;
      }
      case 503: {
        toast.error(message);
        break;
      }
      case 400: {
        toast.error(message);
        break;
      }
      case 500: {
        router.navigate("/server-error", { state: { error } });
        toast.error(message);
        break;
      }
      default:
        break;
    }
  }
);

const request = {
  get: (url) => axios.get(url).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  delete: (url, body) => axios.delete(url, { data: body }).then(responseBody),
};
const Account = {
  login: (values) => request.post("v1/user/login", values),
  register: (values) => request.post("v1/user/register", values),
};

const Skill = {
  pull: (values) => request.get("v1/skill/pull"),
  read: (values) => request.post("v1/skill/read", values),
  update: (values) => request.put("v1/skill/update", values),
  create: (values) => request.post("v1/skill/create", values),
  remove: (values) => request.delete("v1/skill/remove", values),
};
const agent = { Account, Skill };
export default agent;
