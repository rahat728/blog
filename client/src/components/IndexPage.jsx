import Post from "../Post";
import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {posts.length > 0 && posts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}
