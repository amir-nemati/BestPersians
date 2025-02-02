import { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Corrected import path
import { collection, addDoc } from "firebase/firestore";

const Vote = () => {
  const [selectedStreamer, setSelectedStreamer] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check local storage to see if the user has already voted
    const voted = localStorage.getItem("hasVoted");
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  const handleVote = async () => {
    if (!selectedStreamer) {
      alert("Please select a streamer!");
      return;
    }

    if (hasVoted) {
      alert("You can only vote once!");
      return;
    }

    try {
      await addDoc(collection(db, "votes"), { streamer: selectedStreamer });
      alert("Vote submitted!");
      setHasVoted(true);
      // Store the vote status in local storage
      localStorage.setItem("hasVoted", "true");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div>
      <h1>Vote for Your Favorite Streamer</h1>
      <select onChange={(e) => setSelectedStreamer(e.target.value)}>
        <option value="">Select a streamer</option>
        <option value="Streamer A">Streamer A</option>
        <option value="Streamer B">Streamer B</option>
        <option value="Streamer C">Streamer C</option>
      </select>
      <button onClick={handleVote} disabled={hasVoted}>Vote</button>
    </div>
  );
};

export default Vote;
