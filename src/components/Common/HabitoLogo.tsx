/**
 * HabitoLogo Component
 * Hexagon logo with "H" and achievement dot
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Polygon, Text as SvgText, Circle } from 'react-native-svg';

interface HabitoLogoProps {
  size?: number;
  showDot?: boolean;
}

export const HabitoLogo: React.FC<HabitoLogoProps> = ({ size = 160, showDot = true }) => {
  const dotSize = size * 0.125; // 20px for 160px logo
  const fontSize = size * 0.5; // 80px for 160px logo

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 160 160">
        {/* Gradient Definition */}
        <Defs>
          <LinearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#667eea" stopOpacity="1" />
            <Stop offset="100%" stopColor="#764ba2" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Hexagon Shape */}
        <Polygon
          points="48,10 112,10 144,80 112,150 48,150 16,80"
          fill="url(#hexGrad)"
        />

        {/* Letter H */}
        <SvgText
          x="80"
          y="115"
          fontSize={fontSize}
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          fontFamily="System"
        >
          H
        </SvgText>

        {/* Achievement Dot (Yellow Sun) */}
        {showDot && (
          <Circle
            cx="120"
            cy="30"
            r={dotSize}
            fill="#FFD700"
            opacity="0.95"
          />
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
