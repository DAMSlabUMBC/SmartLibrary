import { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import * as mqtt from 'mqtt';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [mqttData, setMqttData] = useState<any>(null);

  useEffect(() => {
    const topic = 'SMART-LIB-esp32-001/loopback';
    const client = mqtt.connect('wss://test.mosquitto.org:8081'); // WebSocket endpoint

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe(topic);
    });

    client.on('message', (t, msg) => {
      try {
        const parsed = JSON.parse(msg.toString());
        console.log('Received data:', parsed);
        setMqttData(parsed);
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    });

    return () => {
      client.end(true);
    }
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      {/* Live MQTT Data */}
      <Collapsible title="Live MQTT Data">
        {mqttData ? (
          <ThemedText>
            <ThemedText type="defaultSemiBold">Topic:</ThemedText> SMART-LIB-esp32-001/loopback{'\n'}
            <ThemedText type="defaultSemiBold">Payload:</ThemedText>{' '}
            {JSON.stringify(mqttData, null, 2)}
          </ThemedText>
        ) : (
          <ThemedText>Waiting for MQTT messages...</ThemedText>
        )}
      </Collapsible>

      {/* Rest of your sections */}
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
      </Collapsible>

      {/* ...you can keep the rest unchanged */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
