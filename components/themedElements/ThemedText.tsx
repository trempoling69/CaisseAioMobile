import { Text, type TextProps, StyleSheet } from 'react-native';

import { ColorName, useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextType =
  | 'default'
  | 'title'
  | 'defaultSemiBold'
  | 'subtitle'
  | 'thin'
  | 'btnText'
  | 'smallBtnText'
  | 'medium';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  textColor?: ColorName;
  type?: ThemedTextType;
};

export function ThemedText({
  style,
  lightColor,
  textColor = 'dark',
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    textColor,
  );

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'thin' ? styles.thin : undefined,
        type === 'btnText' ? styles.btnText : undefined,
        type === 'smallBtnText' ? styles.smallBtnText : undefined,
        type === 'medium' ? styles.medium : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  medium: {
    fontWeight: '600',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  thin: {
    lineHeight: 30,
    fontSize: 16,
    color: 'gray',
  },
  btnText: {
    fontSize: 25,
    fontWeight: '600',
  },
  smallBtnText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
