import AnimatedCircularProgress from '@/components/fidelity/AnimatedCircularProgress';
import FidelityCard from '@/components/fidelity/FidelityCard';
import { ThemedText } from '@/components/themedElements/ThemedText';
import { ThemedView } from '@/components/themedElements/ThemedView';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

export default function Fidelity() {
  const { t } = useTranslation();
  const user = {
    name: 'John Doe',
    cardNumber: '1234 5678 9012 3456',
    points: 120,
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {t('pages.fidelity.title')}
      </ThemedText>
      <FidelityCard name={user.name} cardNumber={user.cardNumber} />
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
