import { Image } from 'expo-image';
import { Platform, StyleSheet, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FloorTab from '@/components/FloorTab';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fafafa', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/umbclogo.png')}
          style={styles.headerLogo}
        />
      }>
      
      {/* Header Text */}
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.title}>
          UMBC Smart Library
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Real-time occupancy and environmental data
        </ThemedText>
      </ThemedView>

      {/* Warning Banner */}
      <ThemedView style={styles.warningBanner}>
        <ThemedText style={styles.warningText}>
          *Note: This is a{' '}
          <ThemedText type="defaultSemiBold">prototype</ThemedText> for the Smart
          Library Project. All content is subject to change.
        </ThemedText>
      </ThemedView>

      {/* Floor Tabs */}
      <View style={styles.floorSection}>
        <FloorTab floorNumber={1} floorStatus={2} />
        <FloorTab floorNumber={2} floorStatus={3} />
        <FloorTab floorNumber={3} floorStatus={1} />
        <FloorTab floorNumber={4} floorStatus={1} />
        <FloorTab floorNumber={5} floorStatus={4} />
      </View>

      {/* Developer Info Section */}
      <ThemedView style={styles.devInfo}>
        <ThemedText type="subtitle">For Developers</ThemedText>
        <ThemedText style={styles.devNote}>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Use{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'Cmd + D',
              android: 'Cmd + M',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerLogo: {
    height: 160,
    width: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  headerContainer: {
    //backgroundColor: 'red',
    alignItems: 'center',
    
    marginTop: -10,
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  warningBanner: {
    backgroundColor: '#FFF5E5',
    borderLeftWidth: 4,
    borderLeftColor: '#FFA726',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  warningText: {
    fontSize: 13,
    color: '#5A4A00',
  },
  floorSection: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 25,
  },
  devInfo: {
    backgroundColor: '#F4F6F8',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  devNote: {
    fontSize: 13,
    marginTop: 6,
  },
});
