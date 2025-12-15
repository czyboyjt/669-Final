import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, RefreshControl, TouchableOpacity, ScrollView } from "react-native";
import { fetchGoals } from "../goals";
import { Ionicons } from '@expo/vector-icons'
import { fetchTasksForGoal } from "../tasks";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from "expo-blur";


export default function TasksScreen({ route, navigation }) {
    const { goalId, title, description } = route.params;
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadTasks = async () => {
        try {
          setLoading(true);
          const data = await fetchTasksForGoal(goalId);
          setTasks(data);
        } catch (e) {
          console.log("❌ fetchTasksForGoal failed:", e);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {

        loadTasks();
        const unsubscribe = navigation.addListener("focus", loadTasks);
        return unsubscribe;
      }, [navigation, goalId]);

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
        <View style={styles.header}>
        <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        >
        <Ionicons name="chevron-back-outline" size={24} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        <Text style={{color: '#fff'}}>App</Text>
        <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate("Images", { goalId, title })} 
        >
        <Ionicons name="images-outline" size={24} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        </View>

        <BlurView intensity={35} tint="dark" style={styles.minimizedContainer}>

      {tasks.length == 0 ? (  
      <View style={styles.topshelf}>
          <TouchableOpacity
          style={styles.addbutton}
          onPress={() =>
            navigation.navigate("AddGoal", {
              mode: "edit",
              goalId,
              initialTitle: title,
              initialDescription: description, 
            })
          }
          >
              <Text style={styles.headertext}>{title}</Text>
              <Ionicons name="pencil" size={12} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
        ) : (
    <Text style={styles.headertext}>{title}</Text>

  )
        }

  <FlatList
    data={tasks.slice(0, 2)}
    keyExtractor={(item) => item.id}
    scrollEnabled={true}
    contentContainerStyle={{ paddingBottom: 30 }}
    renderItem={({ item }) => (
      <View style={styles.taskCard}>
        <View style={styles.taskTextContainer}>
          <Text style={styles.taskText}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
        </View>
        <TouchableOpacity
          style={styles.extraButton}
          onPress={() => navigation.navigate("AddTask", {mode: "edit",
          goalId,
          taskId: item.id,
          initialTitle: item.title,
          initialDescription: item.description,
          initialCompleted: item.completed,})}
        >
          <Ionicons name="ellipsis-horizontal" size={24} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
    )}
    ListEmptyComponent={<Text style={{ marginTop: 16, color: "#CACACA", marginBottom: 16 }}>No tasks yet.</Text>}
  />

{tasks.length > 0 ? (
  <TouchableOpacity
    style={styles.loginButton}
    onPress={() =>
      navigation.navigate("Expanded", {
        goalId,
        title,
        description,
      })
    }
  >
    <Text style={styles.loginButtonText}>Expand</Text>
  </TouchableOpacity>
) : (
  <TouchableOpacity
    style={styles.addTaskButton}
    onPress={() =>
      navigation.navigate("AddTask", {
        mode: "create",
        goalId,
      })
    }
  >
    <Text style={styles.addTaskText}>Add Task</Text>
  </TouchableOpacity>
)}
</BlurView>
      </View>

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
        justifyContent: 'space-between',
        marginHorizontal: 4,
        alignItems: 'center',
        color: '#fff',
      },
      headertext: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
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

      extraButton: {
        padding: 8,
        marginBottom: 10,
        width: 45,
      },



      taskCard: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: "100%",
        borderRadius: 20,
        marginTop: 10,
      
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      
        backgroundColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
      },
        taskTextContainer: {
            flexDirection: 'column',
        },
        taskText: { fontSize: 14, color: "#fff" },
        taskDescription: { fontSize: 12, marginTop: 4, color: "rgba(255,255,255,0.7)" },
        
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
        backgroundColor: '#1E1E1E',
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
      addTaskButton: {
        marginTop: 12,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
        width: "100%",
        alignItems: "center",
      },
      addTaskText: {
        color: "#fff",
      },
      extraButton: {
        padding: 8,
        marginBottom: 10,
        width: 45,
      },
      topshelf:{
        flexDirection: 'row', justifyContent: 'center',  width: '100%', 
          paddingBottom: 12,
        },
      addbutton:{
          flexDirection: 'row', justifyContent: 'center',  width: '100%', 
          alignItems: 'baseline', gap: 4,
          },
    });