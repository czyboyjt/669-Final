import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, Button, StyleSheet, RefreshControl, TouchableOpacity, Image, } from "react-native";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Ionicons } from '@expo/vector-icons';
import { pickAndUploadImageForGoal } from '../imagehelpers';
import { LinearGradient } from 'expo-linear-gradient';
import MasonryList from "@react-native-seoul/masonry-list";

export default function ImagesScreen({ route, navigation }) {
    const { goalId } = route.params;
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = useCallback(async () => {
        try {
          setLoading(true);
          console.log('📸 Fetching images for goal:', goalId);
      
          const imagesColRef = collection(db, 'Goals', goalId, 'images');
          const snapshot = await getDocs(imagesColRef);
      
          console.log('📸 Snapshot size:', snapshot.size);
          const items = snapshot.docs.map(doc => {
            console.log('📸 Doc data:', doc.id, doc.data());
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
      
          setImages(items);
        } catch (err) {
          console.log('❌ Error loading images:', err);
        } finally {
          setLoading(false);
        }
      }, [goalId]);

    const handleAddImage = async () => {
        try {
          await pickAndUploadImageForGoal(goalId);
          await fetchImages(); 
        } catch (err) {
          console.log('Upload error:', err);
        }
      };

      useEffect(() => {
        const unsubscribe = navigation.addListener("focus", fetchImages);
        return unsubscribe;
      }, [navigation, fetchImages]);

    if (images.length === 0) {
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
            <Text style={{color: '#fff'}}>No images yet for this goal.</Text>
        </View>
        <TouchableOpacity
          style={styles.fab}
        >
        <Ionicons 
          name="add-circle" 
          style={styles.add}
          size={64} 
          color="#1E232C" 
          onPress={handleAddImage} 
    
        />
      </TouchableOpacity>
      </View>
      </LinearGradient>
        );
      }


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
        <View style={styles.noheader}>
        <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        >
        <Ionicons name="chevron-back-outline" size={24} color={'#ffffff'}></Ionicons>
        </TouchableOpacity>
        <Text style={{color: '#fff'}}>Images</Text>
        </View>
        <View style={styles.Imagecontainer}
        >
      <MasonryList
      data={images}
      keyExtractor={(item) => item.id}
      numColumns={2}
      marginHorizontal={6}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchImages} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => navigation.navigate('Details', { goalId, image: item })}
          >
          <View style={styles.imagewrap}>
          <Image
            source={{ uri: item.url }}
            style={{
              width: "100%",
              height: item.height || 220,  
              borderRadius: 12,
              marginBottom: 12,
            }}
            resizeMode="cover"
          />
          </View>
          </TouchableOpacity>
        )}
      />
      </View>
      <TouchableOpacity
          style={styles.fab}
        >
        <Ionicons 
          name="add-circle" 
          style={styles.add}
          size={64} 
          color="#1E232C" 
          onPress={handleAddImage} 
    
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
      },
      header: {
        marginTop: 80,
        marginBottom: 20,
        flexDirection: 'row',
        gap: 50,
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

      imagewrap: {
        marginHorizontal: 6,
      },
      Imagecontainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
 
      },
      noheader: {
        marginTop: 80,
        marginBottom: 20,
        flexDirection: 'row',
        gap: 110,
        marginHorizontal: 4,
        alignItems: 'center',
        color: '#fff',
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
    });