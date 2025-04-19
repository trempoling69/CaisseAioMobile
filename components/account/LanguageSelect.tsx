import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import i18next from 'i18next';
import ThemedPressable from '../themedElements/ThemedPressable';
import { ThemedText } from '../themedElements/ThemedText';
import { ThemedView } from '../themedElements/ThemedView';
import { FranceFlag, UkFlag } from '@/assets/svg/icon';

const LanguageSelect = () => {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <Pressable
        onPress={() => i18next.changeLanguage('fr-FR')}
        style={[i18next.language === 'fr-FR' ? styles.selected : undefined]}
      >
        <FranceFlag height={40} />
      </Pressable>
      <Pressable
        onPress={() => i18next.changeLanguage('en-US')}
        style={[i18next.language === 'en-US' ? styles.selected : undefined]}
      >
        <UkFlag height={40} />
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  selected: {
    borderColor: 'black',
    borderWidth: 2,
    margin: 2,
    padding: 2,
  },
});

export default LanguageSelect;
