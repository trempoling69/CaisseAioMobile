import HistoryCard from '@/components/history/HistoryCard';
import { ThemedText } from '@/components/themedElements/ThemedText';
import { ThemedView } from '@/components/themedElements/ThemedView';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { get } from '@/api/config';
import { Sale } from '@/type/sale';

export default function History() {
  const { t } = useTranslation();
  const [sales, setSales] = useState<Sale[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    get<Sale[]>('/api/sales').then(resp => {
      setSales(resp.data.map((sale) => ({
        ...sale,
        created_at: new Date(sale.created_at),
      })));

      setRefreshing(false)
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);


  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{t('pages.history.title')}</ThemedText>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={sales}
        style={styles.history}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ gap: 20 }}
        renderItem={({ item }) => (
          <HistoryCard
            id={item.id}
            shop={item.shop.name}
            date={item.created_at.toLocaleDateString()}
            value={item.grand_total.toString()}
            articleQuantity={item.nb_articles}
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
