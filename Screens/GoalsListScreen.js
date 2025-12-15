import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, RefreshControl, TouchableOpacity, ScrollView } from "react-native";
import { fetchGoals } from "../goals";
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from "../firebase";
import { fetchImageCountForGoal } from  "../imagehelpers";
import { fetchTaskCountForGoal } from "../tasks";


export default function GoalsListScreen({ navigation }) {
  const [goals, setGoals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [imageCounts, setImageCounts] = useState({});
  const [taskCounts, setTaskCounts] = useState({});
  

  const user = auth.currentUser;
  const name = user?.displayName || "there";

  const load = async () => {
    try {
      console.log("📥 loading goals...");
      const data = await fetchGoals();
      setGoals(data);
      const counts = {};
      for (const goal of data) {
        counts[goal.id] = await fetchImageCountForGoal(goal.id);
      }
      setImageCounts(counts);
      const taskMap = {};
      for (const goal of data) {
      taskMap[goal.id] = await fetchTaskCountForGoal(goal.id);
      }
      setTaskCounts(taskMap);
    } catch (e) {
      console.log("❌ fetchGoals failed:", e);
      Alert.alert("Fetch failed", e?.message || "Unknown error");
    }
  };


  useEffect(() => {
    load();
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
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
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={{ fontSize: 16, color: "#8391A1", lineHeight: 30, color: "#A0A0A0" }}>Welcome, {name} </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>Let’s focus on your goals</Text>
      </View>
      <View style={{flexDirection: 'column'}}>
      <FlatList 
        nestedScrollEnabled={true}
        data={goals}
        keyExtractor={(item) => item.id} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View 
          style={styles.card}
          >
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8}}>
              <View style={{flexDirection:"column"}}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.notes}>  
                  {imageCounts[item.id] ?? 0}{" "}
                  {imageCounts[item.id] === 1 ? "Image" : "Images"}
                  </Text>
                </View>
               <Text style={styles.meta}> {taskCounts[item.id] ?? 0} {taskCounts[item.id] === 1 ? "Task" : "Tasks"} </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Tasks", { goalId: item.id, title: item.title, description: item.description
          })}>
              <Ionicons name="trending-up" style={styles.goButton} size={20}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>No goals yet.</Text>}
      />
      </View>

      <TouchableOpacity
      style={styles.fab}
      >
        <Ionicons 
          name="add-circle" 
          style={styles.add}
          size={64} 
          onPress={() => navigation.navigate("AddGoal", {
            mode: 'create'
          })} 
    
        />
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 16,
    gap: 12,
   },
  hero: {
    marginBottom: 4,
    marginTop: 120,
    paddingHorizontal: 4,
  },
goButton: {
    color: "#FFFFFF",
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 100,
    height: 40,

},

  card: {
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
  fab: {
    position: "absolute",
    bottom: 50,
    right: 24,       
    zIndex: 100,     
    elevation: 10,   
  },
  add: {
    color: "rgba(255,255,255,0.7)",
  },
  title: { fontSize: 18, fontWeight: "700", color: "#fff" },
  notes: { fontSize: 14, marginTop: 4, color: "#CACACA" },
  meta: { fontSize: 14, marginTop: 8, color: "#CACACA", fontWeight: "600", marginTop: 30 },
});