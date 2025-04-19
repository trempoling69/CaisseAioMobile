import { StyleSheet } from 'react-native';
import { ThemedText } from '../themedElements/ThemedText';
import { ThemedView } from '../themedElements/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
  name: string;
  cardNumber: string;
};
const FidelityCard = ({ name, cardNumber }: Props) => {
  const backgroundColor = useThemeColor({}, 'freshBrown');
  return (
    <ThemedView style={[{ backgroundColor }, styles.container]}>
      <ThemedView style={styles.informations}>
        <ThemedText>{name}</ThemedText>
        <ThemedText>{cardNumber}</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>Fidelity Card</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    gap: 10,
    alignItems: 'center',
  },
  informations: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default FidelityCard;
