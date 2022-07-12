import { auth, db } from "../../firebase/utils";

export const handleUserProfile = async ({ userAuth, additionalData }: any) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, photoURL } = userAuth;

    try {
      await userRef.set({
        displayName: additionalData?.displayName,
        email,
        uid: userAuth.uid,
        profilePic: photoURL || '',
        stats: {
          recipesAdded: 0,
          likesQuantity: 0,
        },
        userRoles: ["user"],
      });
    } catch (err) {
      // console.log(err);
    }
  }
  return userRef;
};

export const updateUserData = ({ userId, key, value }: { userId: string, key: string, value: string, }) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection('users').doc(userId).update({
        [key]: value
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  })
}

export const checkCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      if (userAuth) {
        resolve(userAuth);
      } else {
        resolve(false);
      }
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
