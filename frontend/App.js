import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [category, setCategory] = useState("All");
  const [text, setText] = useState("");

  useEffect(() => {
    getPickuplines();
  }, [category]);

  function handleChange(value) {
    setCategory(value);
  }

  function getPickuplines() {
    fetch(`http://10.0.2.2:5000/api/pickup-lines?category=${category}`)
      .then(response => response.json())
      .then(data => setText(data.text))
      .catch(err => console.error('Error: ', err));
  }

  return (
    <LinearGradient
      colors={['#f8a9c4', '#d8a8f2', '#a9c7ff']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>

        <Text style={styles.title}>Nepali Pickup Lines</Text>

        <Text style={styles.subtitle}>
          Select a category and get random pickup line💘
        </Text>

        <View style={styles.dropdownWrapper}>
          <Picker
            style={styles.picker}
            selectedValue={category}
            dropdownIconColor="#7c6297"
            onValueChange={handleChange}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="Romantic" value="Romantic" />
            <Picker.Item label="Cute" value="Cute" />
            <Picker.Item label="Funny" value="Funny" />
            <Picker.Item label="Flirty" value="Flirty" />
            <Picker.Item label="Cheesy" value="Cheesy" />
          </Picker>
        </View>

        {/* CARD (FIXED) */}
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text style={styles.lineText}>
              {text}
            </Text>
          </ScrollView>
        </View>

        <LinearGradient
          colors={['#ff9fc8', '#b968ff', '#7468ff']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.mainButton}
        >
          <TouchableOpacity
            style={styles.buttonInner}
            activeOpacity={0.85}
            onPress={getPickuplines}
          >
            <Text style={styles.mainButtonText}>
              New Pick-Up Line
            </Text>
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

        <View style={styles.bottomNav}>
          <Pressable style={styles.activeTab}>
            <Ionicons name="home" size={22} color="#7a4b8f" />
            <Text style={styles.tabText}>Home</Text>
          </Pressable>

          <Pressable style={styles.normalTab}>
            <Ionicons name="heart-outline" size={22} color="#7a4b8f" />
            <Text style={styles.tabText}>Favorites</Text>
          </Pressable>
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

  title: {
    fontSize: 31,
    fontWeight: '800',
    color: '#72478f',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#7b6290',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 24,
  },

  dropdownWrapper: {
    width: 280,
    height: 58,
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.75)',
    justifyContent: 'center',
    marginBottom: 24,
  },

  picker: {
    width: '100%',
    color: '#5f467f',
  },

  // ✅ FIXED CARD
  card: {
    width: 350,
    height: 350, // IMPORTANT FIX
    backgroundColor: 'rgba(255,255,255,0.20)',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
    shadowColor: '#9a72c2',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  lineText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6d4389',
    textAlign: 'center',
    lineHeight: 40,
    padding: 20
  },

  mainButton: {
    width: 250,
    height: 62,
    borderRadius: 32,
    marginTop: 12,
  },

  buttonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
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
  },

  smallButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallButtonText: {
    color: '#6a5a7a',
    fontSize: 16,
    fontWeight: '700',
  },

  bottomNav: {
    position: "absolute",
    bottom: 24,
    left: 32,
    right: 32,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(255,255,255,0.35)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 7,
  },

  activeTab: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },

  normalTab: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },

  tabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6d4b7d",
  }
});