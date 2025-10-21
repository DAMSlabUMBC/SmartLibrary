import { Platform, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';

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
          <ThemedView style = {styles.floorStatsContainer}>
            <ThemedText style = {styles.floorStatsLeft}>
              <MaterialIcons name="light-mode" size={15}/>: Very Bright{"\n"}
              <MaterialIcons name="graphic-eq" size={15}/>: Very Noisy{"\n"}
              <MaterialIcons name="ac-unit" size = {15}/>: Very Hot{"\n"}
            </ThemedText>
            <ThemedText style = {styles.floorStatsRight}>
              <MaterialIcons name="light-mode" size={15}/>: Very Bright{"\n"}
              <MaterialIcons name="graphic-eq" size={15}/>: Very Noisy{"\n"}
              <MaterialIcons name="ac-unit" size = {15}/>: Very Hot{"\n"}
            </ThemedText>
          </ThemedView>

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
  floorContainer: {
    //backgroundColor: 'green',
    height: 150,
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
  },
  floorStatus: {
    backgroundColor: 'red',
    width: '20%',
    justifyContent: 'center',
    height: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  floorText: {
    //backgroundColor: 'blue',
    width: '75%',
    height: '90%',
    marginTop: 0,
    marginBottom: 'auto',
  },
  floorStatusIndicator: {
    backgroundColor: 'lightgreen',
    height: 40,
    borderRadius: 100,
    width: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 0,
    marginBottom: 'auto',
  },
  floorName: {
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 700,
    fontSize: 30,
    //backgroundColor: 'grey',
    lineHeight: 30,
    
  },
  floorStatsContainer: {
    //backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between'
    
  },
  floorStatsLeft: {
    //backgroundColor: 'red',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: '100%',
    width: '48%',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 30
  },
  floorStatsRight: {
    //backgroundColor: 'green',
    marginBottom: 'auto',
    marginTop: 'auto',
    width: '48%',
    height: '100%',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 30

  }
});
