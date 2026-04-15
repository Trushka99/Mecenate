import axios from "axios";

export const api = axios.create({
  baseURL: "https://k8s.mectest.ru/test-app",
  headers: {
    Authorization: "Bearer 550e8400-e29b-41d4-a716-446655440000",
  },
});
export const getPosts = async (cursor?: string | null) => {
  const res = await api.get("/posts", {
    params: {
      cursor,
      limit: 10,
    },
  });

  return res.data;
};
