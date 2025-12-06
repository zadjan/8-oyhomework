"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/ui/select"; 

export default function Posts({ initialStyle }) {
  const router = useRouter();
  const [style, setStyle] = useState(initialStyle || "comedy");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch(`https://jsonbek.uz/api/posts?style=${style}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [style]);

  const handleStyleChange = (value) => {
    setStyle(value);
    router.push(`/posts?style=${value}`, { scroll: false });
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <Select
        options={["comedy", "romance", "adventure", "drama"]}
        defaultValue={style}
        onChange={handleStyleChange}
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
