import {
  StyleSheet,
  Pressable,
  type PressableProps,
  useColorScheme,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { ColorName, useThemeColor } from '@/hooks/useThemeColor';
import { ReactNode } from 'react';

export type ThemedPressableProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'small' | 'full';
  bgColor?: ColorName;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const ThemedPressable = ({
  lightColor,
  darkColor,
  style,
  type = 'default',
  bgColor = 'darkGray',
  ...rest
}: ThemedPressableProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    bgColor,
  );
  const shadowColor = useThemeColor({}, 'dark');

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        {
          backgroundColor,
          shadowColor,
        },
        styles.shadow,
        rest.disabled ? styles.disabledBtn : undefined,
        type === 'default' ? styles.default : undefined,
        type === 'small' ? styles.small : undefined,
        type === 'full' ? styles.full : undefined,
        style,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  default: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
  },
  small: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  full: {
    width: '100%',
    borderRadius: 20,
    padding: 15,
  },
  disabledBtn: {
    opacity: 0.6,
  },
});

export default ThemedPressable;
