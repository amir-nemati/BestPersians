import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Admin = () => {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const fetchVotes = async () => {
      const querySnapshot = await getDocs(collection(db, "votes"));
      const voteData = querySnapshot.docs.map((doc) => doc.data());
      setVotes(voteData);
    };

    fetchVotes();
  }, []);

  return (
    <div>
      <h1>Admin Panel - Vote Results</h1>
      <ul>
        {votes.map((vote, index) => (
          <li key={index}>{vote.streamer}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
