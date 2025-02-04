import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Dota2 from "../images/dota.jpg";

const communities = [
  { name: "Call of Duty", image: Dota2 },
  { name: "Dota 2", image: Dota2 },
  { name: "just chating,React", image: Dota2 },
  { name: "Cs 2", image: Dota2 },
  { name: "just Dance", image: Dota2},
];

const Community = () => {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem("hasVotedCommunity");
    if (voted) {
      setHasVoted(true);
    }
  }, []);

  const handleVote = async (community) => {
    if (hasVoted) {
      alert("You can only vote once!");
      return;
    }

    try {
      await addDoc(collection(db, "communityVotes"), { community });
      alert("Vote submitted!");
      setHasVoted(true);
      localStorage.setItem("hasVotedCommunity", "true");
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", color: "#FFD700", padding: "24px", textAlign: "center" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px" }}>Vote for the Best Gaming Community</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {communities.map((community) => (
          <button key={community.name} style={{ backgroundColor: "#1a1a1a", padding: "16px", borderRadius: "12px", textAlign: "center", boxShadow: "0px 4px 6px rgba(255, 215, 0, 0.5)", width: "200px" }}>
            <img
              src={community.image}
              alt={community.name}
              style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "8px", marginBottom: "12px" }}
            />
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#FFD700" }}>{community.name}</h2>
            <button 
              onClick={() => handleVote(community.name)} 
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

export default Community;
