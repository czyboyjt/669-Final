import { signIn } from '../auth/AuthManager';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';

function SignInBox({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeaderText}>Welcome back! Glad to see you, again!</Text>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}></Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='Enter Email Address' 
            placeholderTextColor="rgba(255,255,255,0.5)"
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text=>setEmail(text)}
            value={email}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}></Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='Enter Password' 
            placeholderTextColor="rgba(255,255,255,0.5)"
            autoCapitalize='none'
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={text=>setPassword(text)}
            value={password}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={async () => {
          console.log("🟦 Sign in pressed");
          try {
            const cred = await signIn(email, password);
            console.log("✅ signIn returned uid:", cred?.user?.uid);
          } catch (error) {
            console.log("❌ signIn error:", error);
            Alert.alert("Sign In Error", error.message, [{ text: "OK" }]);
          }
        }}
      >
  <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
export default SignInBox;