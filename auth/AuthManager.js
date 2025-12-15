import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword, signOut as _signOut,
    createUserWithEmailAndPassword, 
    updateProfile} from 'firebase/auth';




//Creating the sign in func

const signIn = (email, password) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error; // not sure why we need to catch and re-throw but it hangs otherwise
  }
}

const signOut = async () => {
  try {
    await _signOut(auth);
  } catch (error) {
    throw error;
  }
}


const signUp = async (displayName, email, password) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCred.user, {displayName: displayName});
  }


const getAuthUser = () => {
    return auth.currentUser;
  }

export { signIn, signOut, signUp, getAuthUser };