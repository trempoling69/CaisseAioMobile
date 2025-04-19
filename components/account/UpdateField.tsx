import { useState } from 'react';
import { ThemedText } from '../themedElements/ThemedText';
import { ThemedView } from '../themedElements/ThemedView';
import { Pressable, StyleSheet } from 'react-native';
import ThemedTextInput from '../form/ThemedTextInput';
import ThemedPressable from '../themedElements/ThemedPressable';
import { useTranslation } from 'react-i18next';

type Props = {
  name: string;
  value: string;
  title: string;
};

const UpdateField = ({ name, value, title }: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.topPart}>
        <ThemedText type="medium">{title}</ThemedText>
        <Pressable>
          <ThemedText
            type="defaultSemiBold"
            style={styles.underline}
            onPress={() => setIsOpen(true)}
          >
            {t('pages.account.update')}
          </ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedText type="thin">{value}</ThemedText>
      {isOpen && (
        <ThemedView style={styles.updateContainer}>
          <ThemedTextInput name={name} placeholder={title} width={'65%'} />
          <ThemedPressable
            type="small"
            style={styles.btn}
            onPress={() => setIsOpen(false)}
          >
            <ThemedText textColor="white">
              {t('pages.account.update')}
            </ThemedText>
          </ThemedPressable>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    padding: 5,
  },
  topPart: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  underline: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  btn: {
    justifyContent: 'center',
    width: '30%',
  },
  updateContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default UpdateField;
