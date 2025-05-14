import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { API_URL, requestHeader } from '@/api/config';
import { useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import axios from 'axios';

export default function SaleById(): React.JSX.Element {
  const { id } = useLocalSearchParams();
  const [fileUri, setFileUri] = useState<string | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const headers = await requestHeader();
        const response = await axios.get(`${API_URL}/api/receipts/${id}/preview`, {
          headers: { ...headers },
          responseType: 'arraybuffer',
        });

        const base64Data = Buffer.from(response.data).toString('base64');
        const uri = `${FileSystem.cacheDirectory}receipt-${id}.pdf`;

        await FileSystem.writeAsStringAsync(uri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setFileUri(uri);

      } catch (err) {
        console.log('Error:', err);
      }
    };

    if (id) void loadPdf();
  }, [id]);

  return (
    <View style={styles.container}>
      {fileUri && (
        <WebView
          originWhitelist={['*']}
          source={{ uri: fileUri }}
          style={styles.webview}
          useWebKit
          startInLoadingState
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
