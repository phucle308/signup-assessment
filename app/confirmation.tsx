import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConfirmationScreen() {
  const { firstName } = useLocalSearchParams<{ firstName?: string }>();
  const name = typeof firstName === 'string' && firstName.trim() ? firstName : 'there';

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.icon}>✓</Text>
        <Text style={styles.title}>Form submitted successfully!</Text>
        <Text style={styles.message}>Account created for {name}!</Text>
        <Text style={styles.note}>This is a form confirmation only. No real account was created.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/')} accessibilityRole="button">
          <Text style={styles.buttonText}>Back to Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', padding: 28, borderRadius: 18, alignItems: 'center' },
  icon: { width: 70, height: 70, borderRadius: 35, overflow: 'hidden', backgroundColor: '#DCFCE7', color: '#15803D', textAlign: 'center', textAlignVertical: 'center', fontSize: 40, fontWeight: '700', marginBottom: 20 },
  title: { color: '#0F172A', fontSize: 23, fontWeight: '800', textAlign: 'center', marginBottom: 12 },
  message: { color: '#1D4ED8', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  note: { color: '#64748B', fontSize: 13, textAlign: 'center', marginTop: 14, lineHeight: 20 },
  button: { backgroundColor: '#2563EB', marginTop: 26, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 14 },
  buttonText: { color: 'white', fontSize: 15, fontWeight: '700' },
});
