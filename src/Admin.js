import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [votes, setVotes] = useState([]);

  const correctUsername = "amir";
  const correctPassword = "1324";

  const handleLogin = () => {
    if (username === correctUsername && password === correctPassword) {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect username or password!");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const fetchVotes = async () => {
        const querySnapshot = await getDocs(collection(db, "votes"));
        const voteData = querySnapshot.docs.map((doc) => doc.data());

        // Aggregate votes per streamer
        const voteCountsMap = {};
        voteData.forEach(vote => {
          if (vote.streamer) {
            voteCountsMap[vote.streamer] = (voteCountsMap[vote.streamer] || 0) + 1;
          }
        });

        // Convert aggregated data into arrays
        const aggregatedVotes = Object.keys(voteCountsMap).map(streamer => ({
          streamer,
          count: voteCountsMap[streamer],
        }));

        setVotes(aggregatedVotes);
      };

      fetchVotes();
    }
  }, [isLoggedIn]);

  // Prepare chart data
  const voteLabels = votes.map(vote => vote.streamer);
  const voteCounts = votes.map(vote => vote.count);

  const chartData = {
    labels: voteLabels,
    datasets: [
      {
        label: "Votes",
        data: voteCounts,
        backgroundColor: "#FFD700",
        borderColor: "#FFF",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={styles.container}>
      {!isLoggedIn ? (
        <div style={styles.loginBox}>
          <h2 style={styles.title}>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleLogin} style={styles.button}>Login</button>
        </div>
      ) : (
        <div style={styles.dashboard}>
          <div style={styles.sidebar}>
            <h2 style={styles.sidebarTitle}>Admin Panel</h2>
            <ul style={styles.menu}>
              <li style={styles.menuItem}>Dashboard</li>
              <li style={styles.menuItem}>Votes</li>
              <li style={styles.menuItem} onClick={() => setIsLoggedIn(false)}>Logout</li>
            </ul>
          </div>
          <div style={styles.content}>
            <h1 style={styles.title}>Vote Results</h1>
            <div style={styles.statsContainer}>
              <div style={styles.statBox}>Total Votes: {votes.reduce((sum, vote) => sum + vote.count, 0)}</div>
            </div>
            <Bar data={chartData} />
            <ul style={styles.list}>
              {votes.map((vote, index) => (
                <li key={index} style={styles.listItem}>
                  {vote.streamer}: {vote.count} votes
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Styling for Golden-Black Theme with Sidebar
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#000",
    color: "#FFD700",
  },
  loginBox: {
    margin: "auto",
    backgroundColor: "#222",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px #FFD700",
    textAlign: "center",
  },
  dashboard: {
    display: "flex",
    width: "100%",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#111",
    padding: "20px",
    height: "100vh",
  },
  sidebarTitle: {
    fontSize: "20px",
    marginBottom: "20px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  menuItem: {
    padding: "10px",
    backgroundColor: "#222",
    marginBottom: "10px",
    borderRadius: "5px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0px 0px 5px #FFD700",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  statsContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  statBox: {
    backgroundColor: "#222",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px #FFD700",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    fontSize: "18px",
    backgroundColor: "#222",
    padding: "10px",
    margin: "5px",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px #FFD700",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #FFD700",
    backgroundColor: "#333",
    color: "#FFD700",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#FFD700",
    color: "#000",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Admin;
