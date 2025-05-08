import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${apiUrl}/post/${id}`)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files[0]);
    }

    const response = await fetch(`${apiUrl}/post`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form
      onSubmit={updatePost}
      className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-md shadow-md space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-800">Edit Post</h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />

      <input
        type="text"
        placeholder="Summary"
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />

      <input
        type="file"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        onChange={(ev) => setFiles(ev.target.files)}
      />

      <div>
        <Editor onChange={setContent} value={content} />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Update Post
      </button>
    </form>
  );
}
