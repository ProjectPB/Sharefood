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
        profilePic: photoURL || '',
        stats: {
          recipesAdded: 0,
          likesQuantity: 0,
        },
        ...additionalData,
        userRoles,
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
        const err = ["EMAIL_NOT_FOUND"];
        reject(err);
      });
  });
};

export const validateRegister = (displayName: string, email: string, password: string, passwordConfirm: string) => {
  let errors = [];
  if (displayName.length > 12 || displayName.length < 4) {
    errors.push("INVALID_USERNAME");
  }
  if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")) {
    errors.push("INVALID_EMAIL");
  }
  if (
    !password.match(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))
  ) {
    errors.push("INVALID_PASSWORD");
  }
  if (password !== passwordConfirm) {
    errors.push("PASSWORDS_VARY");
  }
  return errors;
}

export const validateLogin = (email: string, password: string) => {
  let errors = []
  if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")) {
    errors.push('INVALID_EMAIL');
  }
  if (!password) {
    errors.push("INVALID_PASSWORD")
  }
  return errors;
}