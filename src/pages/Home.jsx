import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", color: "#FFD700", padding: "24px", textAlign: "center" }}>
      <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "24px" }}>Best Persians Award</h1>
      <p style={{ fontSize: "20px", marginBottom: "40px" }}>Vote for your favorite personalities in different categories!</p>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/Vote" style={categoryStyle}>Streamers</Link>
        <Link to="/youtubers" style={categoryStyle}>YouTubers</Link>
        <Link to="/community" style={categoryStyle}>Community</Link>
      </div>
    </div>
  );
};

const categoryStyle = {
  backgroundColor: "#1a1a1a",
  padding: "16px 32px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0px 4px 6px rgba(255, 215, 0, 0.5)",
  fontSize: "24px",
  fontWeight: "600",
  color: "#FFD700",
  textDecoration: "none",
  transition: "0.3s",
};

export default Home;
