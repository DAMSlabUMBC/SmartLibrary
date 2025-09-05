import { Platform, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function FloorTab({ floorNumber, floorStatus }) {
  return (
    <ThemedView>
      <ThemedView style = {styles.floorContainer}>
        <ThemedView style = {styles.floorStatus}>
          <ThemedView style = {styles.floorStatusIndicator}>

          </ThemedView>
        </ThemedView>
        <ThemedView style = {styles.floorText}>
          <ThemedText style = {styles.floorName}>
            Floor {floorNumber}, Status: {floorStatus}
          </ThemedText>

        </ThemedView>
      </ThemedView>
    </ThemedView>
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
    //backgroundColor: 'green',
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
