import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { createTaskForGoal, updateTaskForGoal, deleteTaskForGoal } from "../tasks";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from "expo-blur";

export default function AddTaskScreen({ navigation, route }) {
  const { mode, goalId, taskId, initialTitle, initialDescription, initialCompleted } = route?.params || {};
  const [title, setTitle] = useState(initialTitle || "");
    const [description, setDescription] = useState(initialDescription || "");
    const isEditing = mode === "edit" && taskId;

    const onSave = async () => {
        if (!title.trim()) {
          return Alert.alert("Title required", "Please enter a task title.");
        }
    
        try {
          if (isEditing) {
            await updateTaskForGoal(goalId, taskId, {
              title: title.trim(),
              description: description.trim(),
            });
            Alert.alert("Task updated!");
          } else {
            await createTaskForGoal(goalId, {
              title: title.trim(),
              description: description.trim(),
            });
            Alert.alert("Task created!");
          }
        
          navigation.goBack();
        } catch (e) {
          console.log("❌ Task save failed:", e);
          Alert.alert("Error", e?.message || "Could not save task.");
        }
      }

      const onDelete = () => {
        Alert.alert(
          "Delete task?",
          "This cannot be undone.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: async () => {
                try {
                  await deleteTaskForGoal(goalId, taskId);
                  navigation.goBack();
                } catch (e) {
                  Alert.alert("Delete failed", e?.message || "Unknown error");
                }
              },
            },
          ]
        );
      };

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {isEditing ? (
            <View style={styles.headerEdit}>
            <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
             >
             <Ionicons name="chevron-back-outline" size={24} color={'#ffffff'}></Ionicons>
             </TouchableOpacity>
             <Text style={{color: '#fff', size: 18, fontWeight: 600,}}>Edit Task</Text>
             <TouchableOpacity 
            style={styles.backButton}
            onPress={onDelete}
             >
             <Ionicons name="trash" size={24} color={'#ffffff'}></Ionicons>
             </TouchableOpacity>
            </View>
          ):(
                      <View style={styles.header}>
                      <TouchableOpacity 
                      style={styles.backButton}
                      onPress={() => navigation.goBack()}
                      >
                      <Ionicons name="chevron-back-outline" size={24} color={'#ffffff'}></Ionicons>
                      </TouchableOpacity>
                      <Text style={{color: '#fff', size: 18, fontWeight: 600,}}>Add Task</Text>
                    </View>
          ) }



          <Text style={styles.label}>Task title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Lift 2x a week"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Task Description</Text>
          <TextInput
            style={styles.input2}
            multiline
            placeholder="e.g., I want to improve my strength and overall health by lifting weights twice a week."
            value={description}
            onChangeText={setDescription}
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <BlurView intensity={35} tint="dark" style={styles.minimizedContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={onSave}
          >
      <Text style={styles.loginButtonText}>{isEditing ? "Update" : "Create"}</Text>
          </TouchableOpacity>
          </BlurView>
        </View>
      </TouchableWithoutFeedback>
        </LinearGradient>
      );
    }
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
      },
      header: {
        marginTop: 80,
        marginBottom: 20,
        flexDirection: 'row',
        gap: 110,
        marginHorizontal: 4,
        alignItems: 'center',
        color: '#fff',
      },
      headerEdit: {
        marginTop: 80,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 4,
        alignItems: 'center',
        color: '#fff',
      },
      backButton: {
        padding: 8,
        marginBottom: 10,
        backgroundColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
        borderRadius: 8,
        width: 45,
      }, 


      label: { fontSize: 14, color: "#f9f9f9", marginBottom: 8 },
      input: {
        backgroundColor: '#3A3B3D',
        padding: 16, borderRadius: 12,
        marginBottom: 20, color: '#fff'
      },
      input2: {
        backgroundColor: '#3A3B3D',
        padding: 16, borderRadius: 12,
        height: 200,
        marginBottom: 20, color: '#fff',
        textAlignVertical: 'top'
      },
      multiline: { height: 80, textAlignVertical: "top" },
      minimizedContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

        flexDirection: "column",
        alignItems: "center",
      
        paddingHorizontal: 22,
        paddingTop: 18,
        paddingBottom: 24,
      
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: "hidden",              // REQUIRED for rounded blur
      
        // “glass” tint layer (BlurView is transparent—this adds milky glass)
        backgroundColor: "rgba(255,255,255,0.08)",
      
        // crisp glass edge
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
      
        // depth
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: -10 },
        elevation: 12,
      },
      
      glassHighlight: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "rgba(255,255,255,0.10)",
      },

    loginButton: {
      width: '100%',       
      borderRadius: 30,
      backgroundColor: "rgba(255,255,255,0.10)",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.18)",
      marginTop: '6%',
      marginBottom: '2%',
      paddingVertical: '4%',
      paddingHorizontal: '40%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginButtonText: {
      fontSize: 16,
      color: 'white',
      fontWeight: '500',
    },
    });