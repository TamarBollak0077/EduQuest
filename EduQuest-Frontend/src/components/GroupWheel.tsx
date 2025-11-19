import React from "react";
import { Wheel } from "react-custom-roulette";
import { TeamColor } from "../App";

interface GroupWheelProps {
  mustStartSpinning: boolean;
  prizeNumber: number;
  teams: TeamColor[];
  toastColors: Record<TeamColor, string>;
  onStopSpinning: () => void;
}

const GroupWheel: React.FC<GroupWheelProps> = ({ mustStartSpinning, prizeNumber, teams, toastColors, onStopSpinning }) => (
  <Wheel
    mustStartSpinning={mustStartSpinning}
    prizeNumber={prizeNumber}
    data={teams.map(() => ({ option: "" }))}
    backgroundColors={teams.map(team => toastColors[team])}
    textColors={["#000"]}
    fontSize={32}
    pointerProps={{}}
    spinDuration={0.3}
    onStopSpinning={onStopSpinning}
  />
);

export default GroupWheel;
