import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export function onAuthStateChanged(
  listener: FirebaseAuthTypes.AuthListenerCallback,
) {
  auth().onAuthStateChanged(listener);
}

export function onIdTokenChanged(
  listener: FirebaseAuthTypes.AuthListenerCallback,
) {
  auth().onIdTokenChanged(listener);
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> {
  try {
    return await auth().signInWithEmailAndPassword(email, password);
  } catch (error: any) {
    const code = error.code;
    if (code) {
      if (code === 'auth/wrong-password') {
        throw Error('Invalid email or password');
      } else if (error?.code === 'auth/user-not-found') {
        throw Error('User not found');
      } else if (error?.code === 'auth/user-disabled') {
        throw Error(
          "We're sorry, the information you have provided does not match our records. Please try again.",
        );
      } else {
        throw Error(error.message);
      }
    } else {
      throw Error(error.message);
    }
  }
}

export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.UserCredential> {
  try {
    return await auth().createUserWithEmailAndPassword(email, password);
  } catch (error: any) {
    const code = error.code;
    if (code) {
      if (code === 'auth/email-already-in-use') {
        throw Error('Email already exists');
      } else {
        throw Error(error.message);
      }
    } else {
      throw Error(error.message);
    }
  }
}

export function signOut() {
  try {
    auth().signOut();
  } catch (error) {
    console.log('error', error);
  }
}
