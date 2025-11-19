import React from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { TeamColor } from "../App";

interface ScoreModalProps {
  showScore: boolean;
  setShowScore: (show: boolean) => void;
  getTeamScore: (team: TeamColor) => number;
}

const ScoreModal: React.FC<ScoreModalProps> = ({ showScore, setShowScore, getTeamScore }) => (
  showScore ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setShowScore(false)}>
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-3 left-3 text-xl font-bold text-gray-500 hover:text-black" onClick={() => setShowScore(false)}>
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">🏆 נקודות</h2>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={[
                { name: "ורוד", score: getTeamScore("pink"), color: "#ff00aaff" },
                { name: "צהוב", score: getTeamScore("yellow"), color: "#facc15" },
                { name: "טורקיז", score: getTeamScore("turquoise"), color: "#5ce1e6" },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" tick={{ fill: "#444", fontSize: 14 }} />
              <YAxis tick={{ fill: "#444" }} />
              <Tooltip />
              <Bar
                dataKey="score"
                radius={[10, 10, 0, 0]}
                isAnimationActive={true}
                animationDuration={800}
              >
                {[
                  { name: "ורוד", color: "#ff00aaff" },
                  { name: "צהוב", color: "#facc15" },
                  { name: "טורקיז", color: "#5ce1e6" }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  ) : null
);

export default ScoreModal;
