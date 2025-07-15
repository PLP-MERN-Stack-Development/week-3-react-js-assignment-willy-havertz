const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPosts(page = 1, limit = 6) {
  const skip = (page - 1) * limit;
  const res = await fetch(`${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`);
  const data = await res.json();
  return {
    posts: data.posts,
    total: data.total,
  };
}
