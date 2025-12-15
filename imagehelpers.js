import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, doc, deleteDoc, getDocs  } from 'firebase/firestore';
import { storage, db } from './firebase';
import { auth } from "./firebase";


export async function pickAndUploadImageForGoal(goalId) {
  const uid = auth.currentUser.uid;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
  
    if (result.canceled) {
      return;
    }
  
    const asset = result.assets[0];

    const response = await fetch(asset.uri);
    const blob = await response.blob();
  
    const path = `goalImages/${goalId}/${Date.now()}.jpg`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, blob);
  
    const downloadURL = await getDownloadURL(fileRef);
  
    await addDoc(collection(db, 'Goals', goalId, 'images'), {
      url: downloadURL,
      storagePath: path,
      addedAt: serverTimestamp(),
    });
  
    return downloadURL;
  }

  export async function deleteImageForGoal(goalId, imageId, { storagePath, url }) {
    const uid = auth.currentUser.uid;

    const storage = getStorage();
  
    try {
      const fileRef = storagePath
      ? ref(storage, storagePath)
      : ref(storage, url);
  
      await deleteObject(fileRef);

    await deleteDoc(doc(db, "Goals", goalId, "images", imageId));}
    catch (e) {
      console.log("❌ Storage delete failed:", e);
      throw e;
    }
  }

  export async function fetchImageCountForGoal(goalId) {
    const snap = await getDocs(
      collection(db, "Goals", goalId, "images")
    );
  
    return snap.size;
  }