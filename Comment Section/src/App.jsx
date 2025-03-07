import { useState } from "react";
import "./App.css";

function App() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment === "") return;

    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div className="container">
      <h2>Comments</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      <div className="comment-section">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((cmt, index) => (
            <div key={index} className="comment">
              <strong>{index + 1}:</strong> {cmt}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
