import { StyleSheet } from 'react-native';
import { ThemedText } from '../themedElements/ThemedText';
import { ThemedView } from '../themedElements/ThemedView';
import ThemedPressable from '../themedElements/ThemedPressable';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

type OfferCardProps = {
  id: string;
  shop: string;
  date: string;
  articleQuantity: number;
  value: string;
};
const HistoryCard = ({
                       id,
                       shop,
                       date,
                       value,
                       articleQuantity,
                     }: OfferCardProps) => {
  const backgroundColor = useThemeColor({}, 'freshBrown');
  const router = useRouter();
  const { t } = useTranslation();

  const handlePress = () => {
    router.push(`/sales/${id}`);
  };
  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.lineContainer}>
        <ThemedText type="defaultSemiBold">{date}</ThemedText>
        <ThemedText type="defaultSemiBold">{shop}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.lineContainer}>
        <ThemedText type="medium">{articleQuantity} articles</ThemedText>
        <ThemedText type="medium">{value}</ThemedText>
      </ThemedView>
      <ThemedPressable
        type="small"
        style={styles.offerButton}
        onPress={handlePress}
      >
        <ThemedText textColor="white">{t('pages.history.seeTickets')}</ThemedText>
      </ThemedPressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    gap: 10,
    alignItems: 'flex-end',
    width: '100%',
  },
  lineContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  offerButton: {
    marginTop: 10,
  },
});

export default HistoryCard;
