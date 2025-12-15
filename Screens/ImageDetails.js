import { View } from "react-native";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from "expo-blur";
import { deleteImageForGoal } from "../imagehelpers";





export default function ImagesDetails ({ route, navigation }) {
  const { image, goalId } = route.params;
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
    <View
        style= {styles.header}
        >
         <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        >
        <Ionicons name="chevron-back-outline" size={24} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        <Text style={{color: '#fff'}}>Image Details</Text>
        </View>
      <Image source={{ uri: image.url }} style={styles.image} />
    </View>
    <BlurView intensity={35} tint="dark" style={styles.minimizedContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={async () => {
                try {
                  console.log("🗑️ deleting image:", { id: image.id, url: image.url });
              
                  await deleteImageForGoal(goalId, image.id, { url: image.url });
              
                  navigation.goBack();
                } catch (e) {
                  console.log("❌ Error deleting image:", e);
                }
              }
        }
          >
      <Text style={styles.loginButtonText}>Delete</Text>
          </TouchableOpacity>
          </BlurView>
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
    gap: 90,
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

  image: {
    width: '100%',
    height: 500,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
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