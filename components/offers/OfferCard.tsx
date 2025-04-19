import { StyleSheet } from 'react-native';
import { ThemedText } from '../themedElements/ThemedText';
import { ThemedView } from '../themedElements/ThemedView';
import ThemedPressable from '../themedElements/ThemedPressable';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
type OfferCardProps = {
  shop: string;
  title: string;
  value: string;
  code: string;
};
const OfferCard = ({ shop, title, value, code }: OfferCardProps) => {
  const backgroundColor = useThemeColor({}, 'freshBrown');
  const { t } = useTranslation();
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const handlePress = () => {
    setIsCodeVisible(!isCodeVisible);
  };
  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedText style={styles.shopTitle} type="defaultSemiBold">
        {shop}
      </ThemedText>
      <ThemedText style={styles.offerTitle} type="defaultSemiBold">
        {title}
      </ThemedText>
      <ThemedText style={styles.offerValue} type="medium">
        {value}
      </ThemedText>
      <ThemedPressable
        type="small"
        style={styles.offerButton}
        onPress={handlePress}
      >
        <ThemedText textColor="white">
          {isCodeVisible ? code : t('pages.offers.code')}
        </ThemedText>
      </ThemedPressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopTitle: {
    width: '100%',
  },
  offerTitle: {
    width: '100%',
  },
  offerValue: {
    width: '100%',
  },
  offerButton: {
    marginTop: 10,
  },
});

export default OfferCard;
