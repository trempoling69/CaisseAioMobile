import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translationFr from './fr.json';
import translationEn from './en.json';

const resources = {
  'fr-FR': { translation: translationFr },
  'en-US': { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language');

  if (!savedLanguage) {
    // savedLanguage = 'en-US';
    savedLanguage = Localization.getLocales()[0].languageTag;
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'fr-FR',
  });
};

initI18n();

export default i18n;
