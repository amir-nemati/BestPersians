import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import samsaberi from "../images/download.png";

const streamers = [
  { name: "Sam Saberi", image: samsaberi },
  { name: "Amir Phantom", image: samsaberi },
  { name: "Amir Eyzed", image: samsaberi },
  { name: "Amir Eyzed", image: samsaberi },
  { name: "Amir Eyzed", image: samsaberi },
  { name: "Amir Eyzed", image: samsaberi  },
];

const Vote = () => {
  const [selectedStreamer, setSelectedStreamer] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem("hasVoted");
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  const handleVote = async (streamer) => {
    if (hasVoted) {
      alert("You can only vote once!");
      return;
    }

    try {
      await addDoc(collection(db, "votes"), { streamer });
      alert("Vote submitted!");
      setHasVoted(true);
      localStorage.setItem("hasVoted", "true");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", color: "#FFD700", padding: "24px", textAlign: "center" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px" }}>Vote for Your Favorite Streamer</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {streamers.map((streamer) => (
          <button key={streamer.name} style={{ backgroundColor: "#1a1a1a", padding: "16px", borderRadius: "12px", textAlign: "center", boxShadow: "0px 4px 6px rgba(255, 215, 0, 0.5)", width: "200px" }}>
            <img
              src={streamer.image}
              alt={streamer.name}
              style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px", marginBottom: "12px" }}
            />
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#FFD700" }}>{streamer.name}</h2>
            <button 
              onClick={() => handleVote(streamer.name)} 
              disabled={hasVoted} 
              style={{ padding: "10px 20px", backgroundColor: "#FFD700", color: "black", border: "none", borderRadius: "5px", cursor: hasVoted ? "not-allowed" : "pointer", marginTop: "10px" }}
            >
              {hasVoted ? "Voted" : "Vote"}
            </button>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Vote;