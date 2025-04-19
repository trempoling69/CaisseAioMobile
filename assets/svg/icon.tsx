import { useThemeColor } from '@/hooks/useThemeColor';
import Svg, {
  ClipPath,
  Ellipse,
  G,
  Path,
  Polygon,
  Rect,
} from 'react-native-svg';

export const LogoSvg = ({ height }: { height: number }) => {
  const color = useThemeColor({ light: '', dark: '' }, 'freshBrown');
  const colorOther = useThemeColor({ light: '', dark: '' }, 'nearWhite');

  return (
    <Svg
      width={height * (4 / 3)}
      height={height}
      viewBox={`0 0 200 150`}
      fill="none"
    >
      <Ellipse
        cx="133.59"
        cy="77.9919"
        rx="35"
        ry="65"
        fill={colorOther}
        transform="rotate(45 133.59 77.9919)"
      />
      <Ellipse
        cx="70.7107"
        cy="77.0843"
        rx="35"
        ry="65"
        transform="rotate(-45 70.7107 77.0843)"
        fill={colorOther}
      />
      <Ellipse cx="104.397" cy="65" rx="35" ry="65" fill={color} />
    </Svg>
  );
};

export const FranceFlag = ({ height }: { height: number }) => {
  return (
    <Svg viewBox="0 0 3 2" width={height * (3 / 2)} height={height}>
      <Rect fill="#CE1126" width="3" height="2" />
      <Rect fill="#fff" width="2" height="2" />
      <Rect fill="#002654" width="1" height="2" />
    </Svg>
  );
};
export const UkFlag = ({ height }: { height: number }) => {
  return (
    <Svg
      id="Layer_1"
      x="0px"
      y="0px"
      height={height}
      width={height * (3 / 2)}
      viewBox="0 0 55.2 38.4"
    >
      <G>
        <Path
          fill="#FEFEFE"
          d="M2.87,38.4h49.46c1.59-0.09,2.87-1.42,2.87-3.03V3.03c0-1.66-1.35-3.02-3.01-3.03H3.01 C1.35,0.01,0,1.37,0,3.03v32.33C0,36.98,1.28,38.31,2.87,38.4L2.87,38.4z"
        />
        <Polygon
          fill="#C8102E"
          points="23.74,23.03 23.74,38.4 31.42,38.4 31.42,23.03 55.2,23.03 55.2,15.35 31.42,15.35 31.42,0 23.74,0 23.74,15.35 0,15.35 0,23.03 23.74,23.03"
        />
        <Path
          fill="#012169"
          d="M33.98,12.43V0h18.23c1.26,0.02,2.34,0.81,2.78,1.92L33.98,12.43L33.98,12.43z"
        />
        <Path
          fill="#012169"
          d="M33.98,25.97V38.4h18.35c1.21-0.07,2.23-0.85,2.66-1.92L33.98,25.97L33.98,25.97z"
        />
        <Path
          fill="#012169"
          d="M21.18,25.97V38.4H2.87c-1.21-0.07-2.24-0.85-2.66-1.94L21.18,25.97L21.18,25.97z"
        />
        <Path
          fill="#012169"
          d="M21.18,12.43V0H2.99C1.73,0.02,0.64,0.82,0.21,1.94L21.18,12.43L21.18,12.43z"
        />
        <Polygon fill="#012169" points="0,12.8 7.65,12.8 0,8.97 0,12.8" />
        <Polygon
          fill="#012169"
          points="55.2,12.8 47.51,12.8 55.2,8.95 55.2,12.8"
        />
        <Polygon
          fill="#012169"
          points="55.2,25.6 47.51,25.6 55.2,29.45 55.2,25.6"
        />
        <Polygon fill="#012169" points="0,25.6 7.65,25.6 0,29.43 0,25.6" />
        <Polygon
          fill="#C8102E"
          points="55.2,3.25 36.15,12.8 40.41,12.8 55.2,5.4 55.2,3.25"
        />
        <Polygon
          fill="#C8102E"
          points="19.01,25.6 14.75,25.6 0,32.98 0,35.13 19.05,25.6 19.01,25.6"
        />
        <Polygon
          fill="#C8102E"
          points="10.52,12.81 14.78,12.81 0,5.41 0,7.55 10.52,12.81"
        />
        <Polygon
          fill="#C8102E"
          points="44.63,25.59 40.37,25.59 55.2,33.02 55.2,30.88 44.63,25.59"
        />
      </G>
    </Svg>
  );
};
