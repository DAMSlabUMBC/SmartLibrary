import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import  FloorTab from '@/components/FloorTab';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#222222ff', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/umbclogo.png')}
          style={styles.reactLogo}
        />
      }>
        <ThemedView style = {styles.warningLabel}>
          <ThemedText>*Note: This is a <ThemedText type = "defaultSemiBold">prototype</ThemedText> for the Smart Library Project
          , everything on this app is subject to change</ThemedText>
        </ThemedView>

      <FloorTab floorNumber={1} floorStatus={2}/>
      <FloorTab floorNumber={2} floorStatus={3}/>
      <FloorTab floorNumber={3} floorStatus={1}/>
      <FloorTab floorNumber={4} floorStatus={1}/>
      <FloorTab floorNumber={5} floorStatus={4}/>
      

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: -5,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  warningLabel: {
    marginTop: -30,
    //backgroundColor: 'orange',
    padding: 0,
    gap: 0,
    marginBottom: 0,
    
  },
  reactLogo: {
    top: 0,
    height: 250,
    width: 250,
    bottom: 0,
    left: 62,
    right: 0,
    position: 'absolute',
  },
  floorContainer: {
    backgroundColor: 'green',
    height: 80,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
  },
  floorStatus: {
    //backgroundColor: 'red',
    width: '20%',
    justifyContent: 'center',
    height: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  floorText: {
    //backgroundColor: 'blue',
    width: '80%',
    height: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  floorStatusIndicator: {
    backgroundColor: 'lightgreen',
    height: 40,
    borderRadius: 100,
    width: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  floorName: {
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 700,
    fontSize: 30,
    //backgroundColor: 'grey',
    lineHeight: 30,
    
  }
});
