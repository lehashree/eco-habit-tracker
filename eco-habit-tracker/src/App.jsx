import { useState, useEffect } from "react";

export default function App() {
  const habits = [
    "Used reusable bottle 💧",
    "Avoided plastic ♻️",
    "Used public transport 🚌",
    "Saved electricity ⚡",
    "Cared for plants 🌿",
  ];

  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0]);

  const toggleHabit = (index) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const calculateScore = () => {
    const total = selected.length * 20;
    setScore(total);

    const today = new Date().getDay();
    const newWeekly = [...weeklyData];
    newWeekly[today] = total;
    setWeeklyData(newWeekly);

    localStorage.setItem("weeklyData", JSON.stringify(newWeekly));

    let currentStreak = parseInt(localStorage.getItem("streak")) || 0;
    currentStreak++;
    setStreak(currentStreak);
    localStorage.setItem("streak", currentStreak);

    localStorage.setItem("ecoScore", total);
    localStorage.setItem("lastDate", new Date().toDateString());
  };

  useEffect(() => {
    const savedScore = localStorage.getItem("ecoScore");
    const savedStreak = localStorage.getItem("streak");
    const savedWeekly =
      JSON.parse(localStorage.getItem("weeklyData")) || [0,0,0,0,0,0,0];
    const lastDate = localStorage.getItem("lastDate");

    if (savedScore) setScore(savedScore);
    if (savedStreak) setStreak(savedStreak);
    setWeeklyData(savedWeekly);

    const today = new Date().toDateString();
    if (lastDate !== today) {
      setSelected([]);
    }
  }, []);

  const getMessage = () => {
    if (score === 0) return "Start small 🌱";
    if (score <= 40) return "Good start 👍";
    if (score <= 80) return "Great impact 🌍";
    return "Eco Hero 🚀";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-green-400 flex items-center justify-center p-4">

      <div className="w-96 bg-white p-6 rounded-2xl shadow-2xl text-center transition-all">

        {/* Header */}
        <h1 className="text-3xl font-bold text-green-600 mb-1">
          🌱 EcoTrack
        </h1>
        <p className="text-gray-500 mb-4">
          Save nature daily 🌍
        </p>

        {/* Habits */}
        <div className="text-left space-y-2">
          {habits.map((habit, index) => (
            <label
              key={index}
              className="block cursor-pointer hover:bg-green-100 p-2 rounded-lg transition"
            >
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => toggleHabit(index)}
              />
              {habit}
            </label>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={calculateScore}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
        >
          Calculate Impact
        </button>

        {/* Score */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-green-700">
            Score: {score}
          </h2>
          <p className="text-gray-600">{getMessage()}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          ></div>
        </div>

        {/* Streak */}
        <p className="mt-3 text-gray-700">
          🔥 Streak: {streak} days
        </p>

        {/* Weekly Chart */}
        <div className="mt-5">
          <h3 className="mb-2 font-semibold text-green-700">
            📊 Weekly Progress
          </h3>
          <div className="flex justify-between items-end h-24">
            {weeklyData.map((val, i) => (
              <div
                key={i}
                className="w-6 bg-green-400 rounded-md hover:bg-green-500 transition"
                style={{ height: `${val}%` }}
              ></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}