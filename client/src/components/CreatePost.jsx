import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  async function createNewPost(ev) {
    ev.preventDefault();

    if (!files || files.length === 0) {
      alert("Please select a file");
      return;
    }

    // Step 1: Upload file to backend → Cloudinary
    const fileData = new FormData();
    fileData.set('file', files[0]);

    const uploadRes = await fetch(`${apiUrl}/upload`, {
      method: 'POST',
      body: fileData,
      credentials: 'include',
    });

    if (!uploadRes.ok) {
      alert('Image upload failed');
      return;
    }

    const uploadJson = await uploadRes.json();
    const imageUrl = uploadJson.url;

    // Step 2: Submit post with Cloudinary image URL
    const postResponse = await fetch(`${apiUrl}/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title,
        summary,
        content,
        cover: imageUrl, // assuming backend expects "cover" field for image
      }),
    });

    if (postResponse.ok) {
      setRedirect(true);
    } else {
      alert('Post creation failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={createNewPost} className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Create New Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
      />
      <Editor value={content} onChange={setContent} />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Create Post
      </button>
    </form>
  );
}
