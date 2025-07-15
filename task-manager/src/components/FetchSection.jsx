import { useState, useEffect } from "react";
import { fetchPosts } from "../api/fetchPosts";
import Card from "./Card";
import Button from "./Button";

export default function FetchSection() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPosts(page)
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">API Posts (Page {page})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((p) => (
          <Card key={p.id}>
            <h3 className="font-semibold">{p.title}</h3>
            <p>{p.body}</p>
          </Card>
        ))}
      </div>
      <div className="flex justify-between">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
