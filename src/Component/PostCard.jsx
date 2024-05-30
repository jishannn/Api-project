import { useState, useEffect } from "react";
import "./PostCard.css";

function PostCard({ post }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  }, [post.userId]);

  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body">{post.body}</p>
      {user && (
        <div className="user-info">
          <h3>User: {user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Website: {user.website}</p>
        </div>
      )}
    </div>
  );
}

export default PostCard;
