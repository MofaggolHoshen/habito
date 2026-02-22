/**
 * HabitoLogo Component
 * Hexagon logo with "H" and achievement dot
 * Using React Native Text for better compatibility
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Polygon, Circle } from 'react-native-svg';

interface HabitoLogoProps {
  size?: number;
  showDot?: boolean;
}

export const HabitoLogo: React.FC<HabitoLogoProps> = ({ size = 160, showDot = true }) => {
  const dotSize = size * 0.125;
  const fontSize = size * 0.5;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 160 160" style={styles.svg}>
        <Defs>
          <LinearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#667eea" stopOpacity="1" />
            <Stop offset="100%" stopColor="#764ba2" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <Polygon
          points="48,10 112,10 144,80 112,150 48,150 16,80"
          fill="url(#hexGrad)"
        />

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
      
      <Text style={[styles.letter, { fontSize: fontSize }]}>H</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  letter: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
