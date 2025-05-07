import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
        MyBlog
      </Link>
      <nav className="flex gap-4 items-center text-gray-700">
        {username ? (
          <>
            <Link to="/create" className="hover:text-blue-600 font-medium">
              Create new post
            </Link>
            <button
              onClick={logout}
              className="hover:text-red-500 font-medium"
            >
              Logout ({username})
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600 font-medium">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-600 font-medium">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
