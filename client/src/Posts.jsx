import React from 'react';

const Posts = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src="https://techcrunch.com/wp-content/uploads/2024/10/GettyImages-1443890653.jpg?resize=2048,1276"
            alt="Post Cover"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Windsurf slashes prices as competition with Cursor heats up
            </h2>
            <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
              <span className="font-medium text-blue-600 cursor-pointer hover:underline">Dawid</span>
              <time className="text-gray-400">2023-01-06 16:45</time>
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              AI coding assistant startup Windsurf cut its prices “across the board” it announced on Monday,
              touting “massive savings” for its users as competition with its rival Cursor intensifies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
