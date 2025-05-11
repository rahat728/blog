import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  useEffect(() => {
    fetch(`${apiUrl}/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Post not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Post:", data);
        setPostInfo(data);
      })
      .catch((err) => {
        console.error("Error loading post:", err);
      });
  }, [id]);

  if (!postInfo) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">{postInfo.title}</h1>
      <div className="flex gap-4 text-sm text-gray-600 mb-4">
        <p className="font-semibold">@{postInfo.author?.username}</p>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      </div>

      {postInfo.cover && (
        <img
          src={postInfo.cover}
          alt="Post Cover"
          className="w-full max-h-[400px] object-cover rounded mb-6"
        />
      )}

      <div
        className="post-content prose max-w-none"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
