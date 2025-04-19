import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { ThemedView } from '@/components/themedElements/ThemedView';
import ThemedTextInput from '@/components/form/ThemedTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemedText } from '@/components/themedElements/ThemedText';
import ThemedPressable from '@/components/themedElements/ThemedPressable';
import { useTranslation } from 'react-i18next';
import AvoidKeyboard from '@/components/AvoidKeyboard';
import { LogoSvg } from '@/assets/svg/icon';
import { useLoginSchema } from '@/schema/login';
import { z } from 'zod';

export default function SignIn() {
  const { login, isError, errorMessage, isLoggedIn, clearError } =
    useAuthContext();

  const loginSchema = useLoginSchema();
  type LoginForm = z.infer<typeof loginSchema>;

  const { t } = useTranslation();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await login(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/(app)/(tabs)');
    }
  }, [isLoggedIn]);
  return (
    <ThemedView style={styles.container}>
      <AvoidKeyboard
        style={styles.pageContainer}
        scrollViewStyle={styles.pageScrollView}
      >
        <LogoSvg height={175} />
        <ThemedText type="title">{t('pages.login.title')}</ThemedText>
        <View style={styles.loginContainer}>
          <View style={styles.formErrorContainer}>
            <View style={styles.formContainer}>
              <FormProvider {...methods}>
                <ThemedTextInput
                  name="email"
                  placeholder={t('pages.login.email')}
                  autoComplete="email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
                <ThemedTextInput
                  name="password"
                  placeholder={t('pages.login.password')}
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
                  : `${t('pages.login.title')}`}
              </ThemedText>
            </ThemedPressable>
            <ThemedPressable
              type="small"
              onPress={() => {
                clearError();
                router.push('/sign-up');
              }}
            >
              <ThemedText type="smallBtnText" textColor="white">
                {t('pages.register.title')}
              </ThemedText>
            </ThemedPressable>
          </View>
        </View>
      </AvoidKeyboard>
    </ThemedView>
  );
}
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
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  loginContainer: {
    width: '70%',
    gap: 30,
  },
  formErrorContainer: {
    gap: 10,
  },
  formContainer: {
    gap: 25,
    width: '100%',
  },
  errorContainer: {
    alignItems: 'center',
    width: '100%',
  },
  btnContainer: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },
});
