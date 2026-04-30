import axios from "axios";

export const api = axios.create({
  baseURL: "https://k8s.mectest.ru/test-app",
  headers: {
    Authorization: "Bearer 550e8400-e29b-41d4-a716-446655440000",
  },
});
export const getPosts = async (
  tier: "all" | "free" | "paid",
  cursor?: string | null,
) => {
  const res = await api.get("/posts", {
    params: {
      cursor,
      limit: 10,
      ...(tier !== "all" && { tier }),
    },
  });

  return res.data;
};
export const getPostsById = async (id: string) => {
  const res = await api.get(`/posts/${id}`);

  return res.data.data.post;
};
export const getPostsComments = async (id: string, cursor?: string | null) => {
  const res = await api.get(`/posts/${id}/comments`, {
    params: { cursor, limit: 20 },
  });

  return res.data.data;
};
export const togglePostLike = async (id: string) => {
  const res = await api.post(`/posts/${id}/like`);
  return res.data.data;
};
export const addComment = async (id: string, text: string) => {
  const res = await api.post(`/posts/${id}/comments`, { text: text });
  return res.data.data;
};
