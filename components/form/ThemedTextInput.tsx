import { useThemeColor } from '@/hooks/useThemeColor';
import { Controller, useFormContext } from 'react-hook-form';
import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { ErrorMessage } from '@hookform/error-message';
import { ThemedText } from '../themedElements/ThemedText';

export type ThemedTextInputProps = TextInputProps & {
  name: string;
  lightColor?: string;
  darkColor?: string;
  isBottomSheetModal?: boolean;
  width?: DimensionValue;
};

const ThemedTextInput = ({
  width = '100%',
  name,
  style,
  lightColor,
  darkColor,
  isBottomSheetModal = false,
  ...otherProps
}: ThemedTextInputProps) => {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'brown',
  );
  const placeholderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'dark',
  );

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <View style={[inputStyle.inputContainer, { width }]}>
      <Controller
        control={control}
        defaultValue=""
        rules={{
          required: true,
        }}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              { borderColor, color: placeholderColor },
              style,
              inputStyle.input,
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={placeholderColor}
            {...otherProps}
          />
        )}
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <ThemedText type="defaultSemiBold" textColor="red">
            {message}
          </ThemedText>
        )}
      />
    </View>
  );
};

const inputStyle = StyleSheet.create({
  inputContainer: {
    gap: 5,
    alignItems: 'center',
  },
  input: {
    borderWidth: 4,
    borderRadius: 20,
    height: 55,
    fontSize: 20,
    paddingHorizontal: 15,
    width: '100%',
  },
});

export default ThemedTextInput;
