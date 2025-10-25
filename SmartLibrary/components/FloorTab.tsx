import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';

export default function FloorTab({ floorNumber, floorStatus }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ThemedView style={[styles.container, expanded && styles.containerExpanded]}>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <ThemedView style={styles.header}>
          {/* Status Section */}
          <ThemedView style={styles.floorStatus}>
            <ThemedView style={styles.floorStatusIndicator} />
          </ThemedView>

          {/* Text Section */}
          <ThemedView style={styles.floorText}>
            <ThemedText style={styles.floorName}>
              Floor {floorNumber}, Status: {floorStatus}
            </ThemedText>
            <MaterialIcons
              name={expanded ? 'expand-less' : 'expand-more'}
              size={24}
              style={styles.icon}
            />
          </ThemedView>
        </ThemedView>
      </Pressable>

      {/* Collapsible Content */}
      {expanded && (
        <ThemedView style={styles.expandedContent}>
          <ThemedView style={styles.floorStatsContainer}>
            <ThemedText style={styles.floorStatsLeft}>
              <MaterialIcons name="light-mode" size={15} />: Very Bright{'\n'}
              <MaterialIcons name="graphic-eq" size={15} />: Very Noisy{'\n'}
              <MaterialIcons name="ac-unit" size={15} />: Very Hot{'\n'}
            </ThemedText>
            <ThemedText style={styles.floorStatsRight}>
              <MaterialIcons name="light-mode" size={15} />: Very Bright{'\n'}
              <MaterialIcons name="graphic-eq" size={15} />: Very Noisy{'\n'}
              <MaterialIcons name="ac-unit" size={15} />: Very Hot{'\n'}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    overflow: 'hidden', // this keeps corners consistent when expanded
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  floorStatus: {
    width: '20%',
    justifyContent: 'center',
  },
  floorText: {
    width: '80%',
  },
  floorStatusIndicator: {
    backgroundColor: 'lightgreen',
    height: 40,
    width: 40,
    borderRadius: 100,
    alignSelf: 'center',
  },
  floorName: {
    color: 'black',
    fontWeight: '700',
    fontSize: 22,
    marginLeft: 8,
  },
  icon: {
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  expandedContent: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  floorStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  floorStatsLeft: {
    width: '48%',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  floorStatsRight: {
    width: '48%',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
