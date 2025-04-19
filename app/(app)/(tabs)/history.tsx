import HistoryCard from '@/components/history/HistoryCard';
import { ThemedText } from '@/components/themedElements/ThemedText';
import { ThemedView } from '@/components/themedElements/ThemedView';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';

export default function History() {
  const { t } = useTranslation();
  const history = [
    {
      id: 1,
      date: new Date().toLocaleDateString(),
      shop: 'Mon magasin',
      value: '95€',
      articleQuantity: 5,
    },
  ];
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{t('pages.history.title')}</ThemedText>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={history}
        style={styles.history}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <HistoryCard
            shop={item.shop}
            date={item.date}
            value={item.value}
            articleQuantity={item.articleQuantity}
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
  history: { marginTop: 20 },
});
