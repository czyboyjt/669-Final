
import { signUp } from '../auth/AuthManager';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';


function SignUpBox({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
  
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeaderText}>Hello! Register to get started</Text>
        <View style={styles.loginRow}>
          <View style={styles.loginLabelContainer}>
            <Text style={styles.loginLabelText}></Text>
          </View>
          <View style={styles.loginInputContainer}>
            <TextInput 
              style={styles.loginInputBox}
              placeholder='Enter Username' 
              placeholderTextColor="rgba(255,255,255,0.5)"
              autoCapitalize='none'
              spellCheck={false}
              onChangeText={text=>setDisplayName(text)}
              value={displayName}
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
        try {
        await signUp(displayName, email, password);
        navigation.navigate("Goals");
        } catch (error) {
        Alert.alert("Sign Up Error", error.message, [{ text: "OK" }]);
          }
        }}
      >
  <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
    );
  }

export default SignUpBox;