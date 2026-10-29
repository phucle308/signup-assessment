import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const signupSchema = z
  .object({
    firstName: z.string().trim().min(2, 'First name must be at least 2 characters.').max(30, 'First name must be 30 characters or fewer.'),
    lastName: z.string().trim().min(2, 'Last name must be at least 2 characters.').max(30, 'Last name must be 30 characters or fewer.'),
    email: z.string().trim().min(1, 'Email is required.').email('Please enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

type SignupForm = z.infer<typeof signupSchema>;
type FieldName = keyof SignupForm;

const fields: { name: FieldName; label: string; placeholder: string; secure?: boolean; email?: boolean }[] = [
  { name: 'firstName', label: 'First name', placeholder: 'Enter your first name' },
  { name: 'lastName', label: 'Last name', placeholder: 'Enter your last name' },
  { name: 'email', label: 'Email', placeholder: 'name@example.com', email: true },
  { name: 'password', label: 'Password', placeholder: 'At least 8 characters', secure: true },
  { name: 'confirmPassword', label: 'Confirm password', placeholder: 'Re-enter your password', secure: true },
];

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: SignupForm) => {
    // Never log or persist passwords. These values have passed the Zod schema.
    console.log({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    });
    router.replace({ pathname: '/confirmation', params: { firstName: values.firstName } });
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.eyebrow}>WELCOME</Text>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Fill out the form below to sign up.</Text>
          {fields.map(({ name, label, placeholder, secure, email }) => (
            <View key={name} style={styles.fieldGroup}>
              <Text style={styles.label}>{label}</Text>
              <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors[name] ? styles.inputError : null]}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    placeholderTextColor="#94A3B8"
                    autoCapitalize={email ? 'none' : secure ? 'none' : 'words'}
                    autoCorrect={false}
                    keyboardType={email ? 'email-address' : 'default'}
                    autoComplete={name === 'email' ? 'email' : name === 'password' ? 'new-password' : 'off'}
                    secureTextEntry={!!secure}
                    accessibilityLabel={label}
                  />
                )}
              />
              {errors[name]?.message ? (
                <Text style={styles.error} accessibilityRole="alert">{errors[name]?.message}</Text>
              ) : null}
            </View>
          ))}
          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            accessibilityRole="button"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 20, paddingVertical: 32 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 22, borderWidth: 1, borderColor: '#E2E8F0' },
  eyebrow: { color: '#2563EB', fontSize: 12, fontWeight: '700', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#64748B', marginBottom: 26 },
  fieldGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 7 },
  input: { height: 48, borderRadius: 10, borderWidth: 1, borderColor: '#CBD5E1', paddingHorizontal: 14, fontSize: 15, color: '#0F172A', backgroundColor: '#FFFFFF' },
  inputError: { borderColor: '#DC2626' },
  error: { fontSize: 12, color: '#B91C1C', marginTop: 5 },
  button: { backgroundColor: '#2563EB', borderRadius: 10, paddingVertical: 15, alignItems: 'center', marginTop: 10 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});
