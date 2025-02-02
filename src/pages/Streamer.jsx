import React from "react";

const streamers = [
  { name: "Streamer 1", image: "https://via.placeholder.com/150" },
  { name: "Streamer 2", image: "https://via.placeholder.com/150" },
  { name: "Streamer 3", image: "https://via.placeholder.com/150" },
  { name: "Streamer 4", image: "https://via.placeholder.com/150" },
];

const BestPersians = () => {
  return (
    <div className="bg-black min-h-screen text-gold p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-gold">Best Persians</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {streamers.map((streamer, index) => (
          <div key={index} className="bg-gray-900 p-4 rounded-xl shadow-lg text-center">
            <img
              src={streamer.image}
              alt={streamer.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold text-gold">{streamer.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestPersians;