import AnimatedCircularProgress from '@/components/fidelity/AnimatedCircularProgress';
import FidelityCard from '@/components/fidelity/FidelityCard';
import { ThemedText } from '@/components/themedElements/ThemedText';
import { ThemedView } from '@/components/themedElements/ThemedView';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { useAuthContext } from '@/context/AuthContext';


export default function Fidelity() {
  const { t } = useTranslation();

  const { currentUser } = useAuthContext();

  const user = {
    name: currentUser?.lastname + ' ' + currentUser?.firstname,
    cardNumber: currentUser?.code ?? '-',
    points: 120,
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {t('pages.fidelity.title')}
      </ThemedText>
      {currentUser?.clients.map((client) => (

        <FidelityCard key={client.code} name={user.name} shop={client.name} cardNumber={client.code} />
      ))}
      <ThemedText type="subtitle" style={styles.title}>
        {t('pages.fidelity.points')}
      </ThemedText>
      <AnimatedCircularProgress
        percentage={100}
        color="#07DD05"
        points={user.points}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    gap: 20,
    alignItems: 'center',
  },
  title: {
    width: '100%',
  },
});
