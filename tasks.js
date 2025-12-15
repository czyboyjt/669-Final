import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "./firebase";

function tasksCollection(goalId) {
  const uid = auth.currentUser.uid;
    return collection(db, "Goals", goalId, "Tasks"); 
  }

export async function createTaskForGoal(goalId, { title, description }) {
  const uid = auth.currentUser.uid;
    const ref = await addDoc(tasksCollection(goalId), {
      title,
      description,
      completed: false,
      createdAt: serverTimestamp(),
    });
  
    return ref.id;
  }


 export async function fetchTasksForGoal(goalId) {
  const uid = auth.currentUser.uid;
    const q = query(tasksCollection(goalId), orderBy("createdAt", "asc"));
  
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  export async function updateTaskForGoal(goalId, taskId, { title, completed, description }) {
    const uid = auth.currentUser.uid;
    const taskRef = doc(db, "Goals", goalId, "Tasks", taskId);
  
    const payload = {
      updatedAt: serverTimestamp(),
    };
  
    if (title !== undefined) payload.title = title;
    if (description !== undefined) payload.description = description;
    if (completed !== undefined) payload.completed = completed;
  
    await updateDoc(taskRef, payload);
  }

  export async function deleteTaskForGoal(goalId, taskId) {
    const uid = auth.currentUser.uid;
    const taskRef = doc(db, "Goals", goalId, "Tasks", taskId);
    await deleteDoc(taskRef);
  }

  export async function fetchTaskCountForGoal(goalId) {
    const snap = await getDocs(collection(db, "Goals", goalId, "Tasks"));
    return snap.size;
  }