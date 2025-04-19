import OfferCard from '@/components/offers/OfferCard';
import { ThemedText } from '@/components/themedElements/ThemedText';
import { ThemedView } from '@/components/themedElements/ThemedView';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';

export default function Index() {
  const { t } = useTranslation();
  const offers = [
    {
      id: 1,
      shop: 'Beau magasin',
      title: 'Offre pour les nouveaux clients',
      value: '10% de réduction sur vos prochaines courses',
      code: 'CODE123',
    },
  ];
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{t('pages.offers.title')}</ThemedText>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={offers}
        style={styles.offers}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <OfferCard
            shop={item.shop}
            title={item.title}
            value={item.value}
            code={item.code}
          />
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginBottom: 40,
  },
  offers: { marginTop: 20 },
});
