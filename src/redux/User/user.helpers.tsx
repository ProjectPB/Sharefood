import { auth, db } from "../../firebase/utils";

export const handleUserProfile = async ({ userAuth, additionalData }: any) => {
  if (!userAuth) return;

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
    url: "https://pb-sharefood.web.app/auth",
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

export const validateRegister = (displayName: string, email: string, password: string, passwordConfirm: string) => {
  let errors = [];
  if (displayName.length > 12 || displayName.length < 4) {
    errors.push("Username does not match requirements.");
  }
  if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")) {
    errors.push("Invalid email.");
  }
  if (
    !password.match(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
  ) {
    errors.push("Password does not match requirements.");
  }
  if (password !== passwordConfirm) {
    errors.push("Passwords do not match.");
  }
  return errors;
}

export const validateLogin = (email: string, password: string) => {
  let errors = []
  if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")) {
    errors.push('Invalid email');
  }
  if (!password) {
    errors.push("Invalid password")
  }
  return errors;
}