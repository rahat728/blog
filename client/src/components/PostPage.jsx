import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';
import PostContentRenderer from "./PostContentRenderer"; // update path if needed

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${apiUrl}/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, [id]);

  if (!postInfo) return '';

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{postInfo.title}</h1>
      <time className="block text-sm text-gray-500 mb-1">
        {formatISO9075(new Date(postInfo.createdAt))}
      </time>
      <div className="text-gray-600 text-sm mb-4">by @{postInfo.author.username}</div>

      {userInfo.id === postInfo.author._id && (
        <div className="mb-4">
          <Link
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition"
            to={`/edit/${postInfo._id}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}

      <div className="mb-6">
        <img
          className="w-full rounded-md object-cover max-h-[400px]"
          src={postInfo.cover}
          alt="Post Cover"
        />
      </div>


      <PostContentRenderer content={postInfo.content} />
    </div>
  );
}
