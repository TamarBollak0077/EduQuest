import React from "react";
import { Wheel } from "react-custom-roulette";

interface ClassWheelProps {
  mustStartClassSpinning: boolean;
  classPrizeNumber: number;
  classNumbers: number[];
  onStopSpinning: () => void;
}

const ClassWheel: React.FC<ClassWheelProps> = ({ mustStartClassSpinning, classPrizeNumber, classNumbers, onStopSpinning }) => (
  <Wheel
    mustStartSpinning={mustStartClassSpinning}
    prizeNumber={classPrizeNumber}
    data={classNumbers.map(num => ({ option: num.toString() }))}
    backgroundColors={["#facc15", "#5ce1e6", "#ff00aa", "#ff74d1ff", "#facc15", "#5ce1e6", "#ff00aa"]}
    textColors={["#000"]}
    fontSize={60}
    spinDuration={0.5}
    onStopSpinning={onStopSpinning}
  />
);

export default ClassWheel;
