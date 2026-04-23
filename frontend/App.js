import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [category, setCategory]= useState("All");
  const [text, setText]= useState();

  useEffect(()=>{
    getPickuplines();
  }, [category])

  function handleChange(value) {
    setCategory(value);
  }
  function getPickuplines() {
    fetch(`http://10.0.2.2:5000/api/pickup-lines?category=${category}`)
      .then(response=> response.json())
      .then(data=> setText(data.text))
      .catch(err=> console.error('Error: ', err));
  }
  return (
    <LinearGradient
      colors={['#f8a9c4', '#d8a8f2', '#a9c7ff']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.glow1} />
        <View style={styles.glow2} />
        <View style={styles.glow3} />

        <Text style={styles.title}>
          Nepali Pickup Lines
        </Text>

        <Text style={styles.subtitle}>
          Select a category and get random pickup line💘
        </Text>

        <View style={styles.dropdownWrapper}>
          <Picker style={styles.picker} selectedValue={category} dropdownIconColor="#7c6297" onValueChange={handleChange}>
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Romantic" value="Romantic" />
            <Picker.Item label="Cute" value="Cute" />
            <Picker.Item label="Funny" value="Funny" />
            <Picker.Item label="Flirty" value="Flirty" />
            <Picker.Item label="Cheesy" value="Cheesy" />
          </Picker>
        </View>

        <View style={styles.card}>
          <Text style={styles.lineText}>
            {text}
          </Text>
        </View>

        <LinearGradient
          colors={['#ff9fc8', '#b968ff', '#7468ff']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.mainButton}
        >
          <TouchableOpacity style={styles.buttonInner} activeOpacity={0.85} onPress={getPickuplines}>
            <Text style={styles.mainButtonText}>New Pick-Up Line</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.actionRow}>
          <LinearGradient
            colors={['#ffe7a0', '#ffd777']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.smallButton}
          >
            <TouchableOpacity style={styles.smallButtonInner} activeOpacity={0.85}>
              <Text style={styles.smallButtonText}>Save</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['#dff7ff', '#bfe4ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.smallButton}
          >
            <TouchableOpacity style={styles.smallButtonInner} activeOpacity={0.85}>
              <Text style={styles.smallButtonText}>Share</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <StatusBar style="dark" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 90,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },

  glow1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.18)',
    top: 90,
    left: -40,
  },

  glow2: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.14)',
    bottom: 80,
    right: -70,
  },

  glow3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.12)',
    bottom: 140,
    left: 40,
  },

  title: {
    fontSize: 31,
    fontWeight: '800',
    color: '#72478f',
    textAlign: 'center',
    letterSpacing: 0.4,
  },

  subtitle: {
    fontSize: 15,
    color: '#7b6290',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 10,
  },

  dropdownWrapper: {
    width: 280,
    height: 58,
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.75)',
    overflow: 'hidden',
    justifyContent: 'center',
    shadowColor: '#8f62b5',
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    marginBottom: 24,
  },

  picker: {
    width: '100%',
    color: '#5f467f',
    ...Platform.select({
      android: {
        height: 58,
      },
      ios: {
        height: 140,
        marginTop: -40,
      },
    }),
  },

  card: {
    width: 320,
    height: 270,
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
    shadowColor: '#9a72c2',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 15
  },

  lineText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6d4389',
    textAlign: 'center',
    lineHeight: 40,
  },

  mainButton: {
    minWidth: 250,
    height: 62,
    borderRadius: 32,
    marginTop: 12,
    shadowColor: '#8c56d8',
    shadowOpacity: 0.28,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  buttonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    borderWidth: 1.2,
    borderColor: 'rgba(255,255,255,0.28)',
  },

  mainButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 14,
  },

  smallButton: {
    width: 110,
    height: 50,
    borderRadius: 15,
    shadowColor: '#8a78a8',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  smallButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
  },

  smallButtonText: {
    color: '#6a5a7a',
    fontSize: 16,
    fontWeight: '700',
  },
});