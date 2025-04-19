import LanguageSelect from '@/components/account/LanguageSelect';
import UpdateField from '@/components/account/UpdateField';
import { ThemedScrollView } from '@/components/themedElements/ThemedScrollView';
import { ThemedText } from '@/components/themedElements/ThemedText';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export default function Account() {
  const { t } = useTranslation();
  const methods = useForm();
  const user = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'email@exemple.com',
    phone: '0606060606',
  };
  return (
    <ThemedScrollView contentContainerStyle={styles.container}>
      <FormProvider {...methods}>
        <ThemedText type="subtitle">{t('pages.account.title')}</ThemedText>
        <UpdateField
          name="firstname"
          title={t('pages.account.firstName')}
          value={user.firstname}
        />
        <UpdateField
          name="lastname"
          title={t('pages.account.lastName')}
          value={user.lastname}
        />
        <UpdateField
          name="email"
          title={t('pages.account.email')}
          value={user.email}
        />
        <UpdateField
          name="phone"
          title={t('pages.account.phone')}
          value={user.phone}
        />
      </FormProvider>
      <ThemedText type="subtitle">{t('pages.account.language')}</ThemedText>
      <LanguageSelect />
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    gap: 20,
  },
});
