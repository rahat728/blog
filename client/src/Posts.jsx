import React from 'react'

const Posts = () => {
  return (
    <div className="post">
      <div className="image">
        <img src="https://techcrunch.com/wp-content/uploads/2024/10/GettyImages-1443890653.jpg?resize=2048,1276"></img>
      </div>
      <div className="texts">
        <h2>Windsurf slashes prices as competition with Cursor heats up</h2>
        <p className="info">
          <a className="author">Dawid</a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="summary">
          AI coding assistant startup Windsurf cut its prices “across the board”
          it announced on Monday, touting “massive savings” for its users as
          competition with its rival Cursor intensifies.
        </p>
      </div>
    </div>
  )
}

export default Posts
