import { View, Text } from 'react-native';
import { styles } from '../Styles';
import SignInBox from '../Components/SignIn';
import SignUpBox from '../Components/SignUp.js';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

function LoginScreen({navigation}) {
const [loginMode, setLoginMode] = useState(true);

    return (
      <LinearGradient
      colors={[
        '#2F2F2F',
        '#1A1A1A',
        '#000000',
      ]}
      locations={[0, 0.55, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}   // diagonal like screenshot
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          {loginMode?
            <SignInBox navigation={navigation}/>
          :
            <SignUpBox navigation={navigation}/>
          }
          </View>
        <View style={styles.modeSwitchContainer}>
          { loginMode ? 
            <Text style={{color:"#CACACA"}}>Don’t have an account?
              <Text 
                onPress={()=>{setLoginMode(!loginMode)}} 
                style={{color: 'white', fontWeight: 700}}> Register Now </Text> 
            </Text>
          :
            <Text style={{color:"#CACACA"}}>Already have an account?
              <Text 
                onPress={()=>{setLoginMode(!loginMode)}} 
                style={{color: 'white', fontWeight: 700}}> Log in </Text> 
            </Text>
          }
        </View>
      </View>
      </LinearGradient>
    );
  }
export default LoginScreen;