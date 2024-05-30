import { useState, useEffect } from "react";
import "./App.css";
import PostCard from "./Component/PostCard.jsx";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(6);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 6);
  };

  const loadLessPosts = () => {
    setVisiblePosts((prevVisiblePosts) =>
      prevVisiblePosts - 6 > 6 ? prevVisiblePosts - 6 : 6
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <h1 className="app-title">Posts</h1>
      <div className="posts-grid">
        {data.slice(0, visiblePosts).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="buttons-container">
        {visiblePosts < data.length && (
          <button className="load-more" onClick={loadMorePosts}>
            Load More
          </button>
        )}
        {visiblePosts > 6 && (
          <button className="load-less" onClick={loadLessPosts}>
            Load Less
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
