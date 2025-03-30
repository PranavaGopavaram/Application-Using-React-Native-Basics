import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // ✅ correct import from firebase.js

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  const handleAuth = async () => {
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setLoggedIn(true);
      setError('');
    } catch (err) {
      console.log('🔥 Auth Error:', err);
      //setError(err.code?.replace('auth/', '').replace(/-/g, ' ') || 'Something went wrong');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail('');
    setPassword('');
    setError('');
    setMode('login');
  };

  if (loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Welcome, {email.split('@')[0]}! 😼</Text>
        <Image
          source={{ uri: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif' }}
          style={styles.gif}
          resizeMode="contain"
        />
        <Button title="Logout" onPress={handleLogout} />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mode === 'login' ? 'Login Page' : 'Sign Up Page'}</Text>
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={mode === 'login' ? 'Login' : 'Sign Up'} onPress={handleAuth} />
      <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        <Text style={styles.switchText}>
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEEA94',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  input: {
    borderColor: '#fff',
    borderWidth: 2,
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 22,
    marginBottom: 20,
  },
  gif: {
    width: 300,
    height: 300,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  switchText: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
