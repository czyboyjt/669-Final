import React from 'react';
import { StatusBar } from 'react-native';

import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GoalsListScreen from "./Screens/GoalsListScreen";
import AddGoalScreen from "./Screens/AddGoalScreen";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Stack = createStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './Secrets';


import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import TasksScreen from './Screens/TasksScreen';
import AddTaskScreen from './Screens/AddTaskScreen';
import ImagesScreen from './Screens/ImagesScreen';
import TasksScreenExpanded from './Screens/TasksExpanded';
import ImagesDetails from './Screens/ImageDetails';

export default function App() {
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log("🟨 setting up auth listener");
  const unsubscribe = onAuthStateChanged(auth, (u) => {
    console.log("🟩 auth state changed:", u ? u.uid : null);
    setUser(u);
    setLoading(false);
  });
  return unsubscribe;
}, []);

  if (loading) return <Text>Loading...</Text>;

  function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  function AppStack() {
    return (
      <Stack.Navigator initialRouteName='Goals' 
            screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name="Goals" component={GoalsListScreen} />
          <Stack.Screen name="AddGoal" component={AddGoalScreen} />
          <Stack.Screen name="Tasks" component={TasksScreen} />
          <Stack.Screen name="Expanded" component={TasksScreenExpanded} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="Images" component={ImagesScreen} />
          <Stack.Screen name="Details" component={ImagesDetails} />
        </Stack.Navigator>
    );
  }

  return (
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
