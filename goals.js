import { db } from "./firebase";
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth } from "./firebase";

console.log("current uid:", auth.currentUser?.uid);
console.log("AUTH OBJECT:", auth);

export async function createGoal({ userId, title, description }) {
  const uid = auth.currentUser?.uid;
  const docRef = await addDoc(collection(db, "Goals"), {
    userId: uid,
    title,
    description: description || "",
    completed: false,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function fetchGoals() {
  const uid = auth.currentUser.uid;
    const q = query(
      collection(db, "Goals"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );
  
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }


  export async function updateGoal(goalId, { title, description }) {
    const uid = auth.currentUser.uid;
    const goalRef = doc(db, 'Goals', goalId);
    await updateDoc(goalRef, {
      title,
      description: description || "",
      updatedAt: serverTimestamp(),
    });
  }

  export async function deleteGoal(goalId) {
    const goalRef = doc(db, "Goals", goalId);
    await deleteDoc(goalRef);
  }