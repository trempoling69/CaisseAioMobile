import { ViewProps, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';

type AvoidKeyboardProps = ViewProps & {
  scrollViewStyle: ViewStyle;
};
const AvoidKeyboard = ({
  style,
  scrollViewStyle,
  ...props
}: AvoidKeyboardProps) => {
  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    marginBottom: keyboard.height.value,
  }));

  return (
    <Animated.ScrollView
      contentContainerStyle={style}
      style={[animatedStyles, scrollViewStyle]}
      {...props}
    />
  );
};

export default AvoidKeyboard;
