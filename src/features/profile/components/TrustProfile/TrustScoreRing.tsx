import React from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";
import Svg, { Circle } from "react-native-svg";

interface Props {
  score: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  trackColor: string;
}

export const TrustScoreRing: React.FC<Props> = ({
  score,
  size = 140,
  strokeWidth = 10,
  color,
  trackColor,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100) / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 15 }}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Text style={{ fontSize: 32, fontWeight: "800", color }}>{score}</Text>
        <Text style={{ fontSize: 12, color: trackColor, marginTop: 2 }}>Trust Score</Text>
      </View>
    </MotiView>
  );
};
