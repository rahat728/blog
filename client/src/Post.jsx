import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({ _id, title, summary, cover, createdAt, author }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:w-1/3">
        <Link to={`/post/${_id}`}>
          <img
            className="w-full h-48 md:h-full object-cover"
            src={`http://localhost:4000/${cover}`}
            alt="Post cover"
          />
        </Link>
      </div>

      <div className="md:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <Link to={`/post/${_id}`}>
            <h2 className="text-2xl font-bold text-gray-800 hover:underline mb-2">{title}</h2>
          </Link>
          <p className="text-sm text-gray-600 mb-2 flex gap-2 items-center">
            <span className="font-semibold text-blue-600">@{author.username}</span>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className="text-gray-700">{summary}</p>
        </div>
      </div>
    </div>
  );
}
