import { auth, db } from "../../firebase/utils";

export const handleUserProfile = async ({ userAuth, additionalData }: any) => {
  if (!userAuth) return;
  console.log(userAuth);
  console.log(additionalData);
  const { uid } = userAuth;

  const userRef = db.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const userRoles = ["user"];

    try {
      await userRef.set({
        displayName,
        email,
        uid: uid,
        profilePic: photoURL || null,
        userRoles,
        ...additionalData,
      });
    } catch (err) {
      // console.log(err);
    }
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const handleResetPasswordAPI = (email: string) => {
  const config = {
    url: "http://localhost:3000/auth",
  };

  return new Promise<void>((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not found. Please try again."];
        reject(err);
      });
  });
};  
