import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialIcons } from '@expo/vector-icons';

export default function FloorTab({ floorNumber, floorStatus }) {
  const [expanded, setExpanded] = useState(false);

  // Theme-aware colors
  const bg = useThemeColor({}, 'background');
  const card = useThemeColor({}, 'card');            // expo-template built-in
  const border = useThemeColor({}, 'border');
  const text = useThemeColor({}, 'text');
  const subtle = useThemeColor({}, 'secondaryBackground');

  return (
    <ThemedView
      style={[
        styles.container,
        expanded && styles.containerExpanded,
        { backgroundColor: card, borderColor: border },
      ]}
    >
      <Pressable onPress={() => setExpanded(!expanded)}>
        <ThemedView style={[styles.header, { backgroundColor: card }]}>
          <ThemedView style={styles.floorStatus}>
            <ThemedView
              style={[
                styles.floorStatusIndicator,
                { backgroundColor: floorStatus === 'OK' ? 'lightgreen' : 'orange' },
              ]}
            />
          </ThemedView>

          <ThemedView style={styles.floorText}>
            <ThemedText style={[styles.floorName, { color: text }]}>
              Floor {floorNumber}, Status: {floorStatus}
            </ThemedText>
            <MaterialIcons
              name={expanded ? 'expand-less' : 'expand-more'}
              size={24}
            />
          </ThemedView>
        </ThemedView>
      </Pressable>

      {expanded && (
        <ThemedView style={[styles.expandedContent, { backgroundColor: subtle }]}>
          <ThemedView style={styles.floorStatsContainer}>
            <ThemedText style={[styles.floorStatsLeft, { color: text }]}>
              <MaterialIcons name="light-mode" size={15} />: Very Bright{'\n'}
              <MaterialIcons name="graphic-eq" size={15} />: Very Noisy{'\n'}
              <MaterialIcons name="ac-unit" size={15} />: Very Hot{'\n'}
            </ThemedText>
            <ThemedText style={[styles.floorStatsRight, { color: text }]}>
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
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  floorStatus: {
    width: '20%',
    justifyContent: 'center',
  },
  floorText: {
    width: '80%',
  },
  floorStatusIndicator: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignSelf: 'center',
  },
  floorName: {
    fontWeight: '700',
    fontSize: 22,
    marginLeft: 8,
  },
  icon: {
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  expandedContent: {
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
