import { PixelRatio, StyleSheet } from 'react-native';
import { Circle, Svg, Text } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect, useMemo } from 'react';

type ReadOnlyProps<T> = {
  readonly [P in keyof T]: T[P];
};

interface AnimatedCircularProgressProps {
  points: number;
  radius?: number;
  color: string;
  percentage?: number;
  borderWidth?: number;
  duration?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedCircularProgress: React.FC<
  ReadOnlyProps<AnimatedCircularProgressProps>
> = ({
  points,
  radius = 100,
  color,
  percentage = 0,
  borderWidth = 20,
  duration = 500,
}) => {
  const loaderRadius = PixelRatio.roundToNearestPixel(radius);
  const innerCircleRadii = loaderRadius - borderWidth / 2;

  const progress = useSharedValue(2 * Math.PI * innerCircleRadii);

  const getCircumferenceData = useMemo(() => {
    const circumference = 2 * Math.PI * innerCircleRadii;
    const perc = percentage <= 100 ? percentage : 100;
    const circumferencePercentage = circumference * perc * 0.01;

    return {
      circumference,
      circumferencePercentage,
      percentDiff: circumference - circumferencePercentage,
    };
  }, [percentage, innerCircleRadii]);

  const animatedStrokeDashOffset = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(progress.value, {
        duration,
      }),
    };
  }, []);

  useEffect(() => {
    progress.value = getCircumferenceData.percentDiff;
  }, [percentage, innerCircleRadii]);

  return (
    <Svg style={styles(radius).svg}>
      <AnimatedCircle
        cx={radius}
        cy={radius}
        fill="transparent"
        r={innerCircleRadii}
        stroke={color}
        strokeWidth={borderWidth}
        animatedProps={animatedStrokeDashOffset}
        strokeDasharray={getCircumferenceData.circumference}
        strokeDashoffset={getCircumferenceData.circumference}
        strokeLinecap="round"
      />
      <Text
        stroke="black"
        fontSize="30"
        x={radius}
        y={radius}
        textAnchor="middle"
      >
        {points}
      </Text>
      <Text
        stroke="black"
        fontSize="15"
        x={radius}
        y={radius + 25}
        textAnchor="middle"
      >
        Points
      </Text>
    </Svg>
  );
};

export const styles = (radius: number) =>
  StyleSheet.create({
    svg: {
      width: 2 * radius,
      height: 2 * radius,
    },
  });

export default AnimatedCircularProgress;
