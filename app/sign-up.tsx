import { LogoSvg } from '@/assets/svg/icon';
import AvoidKeyboard from '@/components/AvoidKeyboard';
import ThemedTextInput from '@/components/form/ThemedTextInput';
import ThemedPressable from '@/components/themedElements/ThemedPressable';
import { ThemedText } from '@/components/themedElements/ThemedText';
import { ThemedView } from '@/components/themedElements/ThemedView';
import { useAuthContext } from '@/context/AuthContext';
import { useRegisterSchema } from '@/schema/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

const SignUp = () => {
  const { isError, register, errorMessage, clearError, isLoggedIn } =
    useAuthContext();
  const { t } = useTranslation();
  const registerSchema = useRegisterSchema();
  type RegisterForm = z.infer<typeof registerSchema>;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      await register(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // if (isLoggedIn) {
    //   router.replace('/(app)/(tabs)');
    // }
  }, [isLoggedIn]);
  return (
    <ThemedView style={styles.container}>
      <AvoidKeyboard
        style={styles.pageContainer}
        scrollViewStyle={styles.pageScrollView}
      >
        <LogoSvg height={125} />
        <ThemedText type="title">{t('pages.register.title')}</ThemedText>
        <View style={styles.registerContainer}>
          <View style={styles.formErrorContainer}>
            <View style={styles.formContainer}>
              <FormProvider {...methods}>
                <ThemedTextInput
                  name="firstname"
                  placeholder={t('pages.register.firstName')}
                  autoComplete="name"
                  textContentType="name"
                />
                <ThemedTextInput
                  name="lastname"
                  placeholder={t('pages.register.lastName')}
                  autoComplete="name-family"
                  textContentType="familyName"
                />
                <ThemedTextInput
                  name="email"
                  placeholder={t('pages.register.email')}
                  autoComplete="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
                <ThemedTextInput
                  name="phone"
                  placeholder={t('pages.register.phone')}
                  keyboardType="phone-pad"
                />
                <ThemedTextInput
                  name="password"
                  placeholder={t('pages.register.password')}
                  secureTextEntry
                  autoComplete="password"
                  autoCorrect={false}
                />
                <ThemedTextInput
                  name="confirmPassword"
                  placeholder={t('pages.register.confirm')}
                  secureTextEntry
                  autoComplete="password"
                  autoCorrect={false}
                />
              </FormProvider>
            </View>
            {isError && (
              <View style={styles.errorContainer}>
                <ThemedText textColor="red" type="defaultSemiBold">
                  {t('errors.title')}
                </ThemedText>
                <ThemedText
                  type="defaultSemiBold"
                  textColor="red"
                  style={{ textAlign: 'center' }}
                >
                  {errorMessage}
                </ThemedText>
              </View>
            )}
          </View>
          <View style={styles.btnContainer}>
            <ThemedPressable
              onPress={methods.handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              <ThemedText type="btnText" textColor="white">
                {isLoading
                  ? `${t('pages.state.loading')}`
                  : `${t('pages.register.title')}`}
              </ThemedText>
            </ThemedPressable>
            <ThemedPressable
              type="small"
              onPress={() => {
                clearError();
                router.push('/sign-in');
              }}
            >
              <ThemedText type="smallBtnText" textColor="white">
                {t('pages.login.title')}
              </ThemedText>
            </ThemedPressable>
          </View>
        </View>
      </AvoidKeyboard>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  pageScrollView: {
    width: '100%',
  },
  pageContainer: {
    paddingVertical: 70,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 15,
  },
  registerContainer: {
    width: '70%',
    gap: 30,
  },
  formContainer: {
    width: '100%',
    gap: 15,
  },
  formErrorContainer: { gap: 10 },
  errorContainer: {
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    width: '100%',
    fontSize: 15,
    // color: 'red',
    fontWeight: 'bold',
  },
  btnContainer: {
    width: '100%',
    gap: 10,
    alignItems: 'center',
  },
});

export default SignUp;
