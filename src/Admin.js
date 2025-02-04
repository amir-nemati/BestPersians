import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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
        setVotes(voteData);
      };

      fetchVotes();
    }
  }, [isLoggedIn]);

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
        <div style={styles.adminPanel}>
          <h1 style={styles.title}>Admin Panel - Vote Results</h1>
          <ul style={styles.list}>
            {votes.map((vote, index) => (
              <li key={index} style={styles.listItem}>{vote.streamer}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

//  Styling for Golden-Black Theme
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#000",
    color: "#FFD700",
  },
  loginBox: {
    backgroundColor: "#222",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px #FFD700",
    textAlign: "center",
  },
  adminPanel: {
    textAlign: "center",
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
};

export default Admin;
