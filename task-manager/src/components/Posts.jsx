import { useEffect, useRef, useState, useCallback } from "react";
import { fetchPosts } from "../api/fetchPosts";
import Card from "./Card";

export default function Posts() {
  const POSTS_PER_PAGE = 6;

  const [allPosts, setAllPosts] = useState([]); // All loaded posts
  const [filteredPosts, setFilteredPosts] = useState([]); // Visible posts
  const [search, setSearch] = useState(""); // Search input
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  // Fetch more posts
  const loadMore = useCallback(() => {
    if (loading) return;

    setLoading(true);
    fetchPosts(page, POSTS_PER_PAGE)
      .then((data) => {
        setAllPosts((prev) => [...prev, ...data.posts]);
        setTotal(data.total);
        setPage((prev) => prev + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setLoading(false);
      });
  }, [page, loading]);

  useEffect(() => {
    loadMore(); // Load initial posts
  }, [loadMore]);

  // Filter posts on search change
  useEffect(() => {
    const lower = search.toLowerCase();
    const results = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.body.toLowerCase().includes(lower)
    );
    setFilteredPosts(results);
  }, [search, allPosts]);

  // Setup intersection observer
  const bottomRef = useRef();
  useEffect(() => {
    if (loading) return;

    const handleObserver = (entries) => {
      if (entries[0].isIntersecting && allPosts.length < total) {
        loadMore();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);
    if (bottomRef.current) {
      observer.current.observe(bottomRef.current);
    }

    return () => {
      if (observer.current && bottomRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.current.unobserve(bottomRef.current);
      }
    };
  }, [bottomRef, allPosts, total, loading, loadMore]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Developer Posts</h1>

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
      />

      {/* Posts Grid */}
      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} title={post.title} body={post.body} />
        ))}
      </div>

      {/* No results */}
      {search && filteredPosts.length === 0 && (
        <p className="text-center text-gray-500">
          No posts found for "{search}"
        </p>
      )}

      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading more posts...</p>}

      {/* Observer trigger */}
      <div ref={bottomRef} className="h-10" />
    </div>
  );
}
