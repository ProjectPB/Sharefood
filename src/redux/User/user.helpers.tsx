import firebase from "firebase/compat/app";
import { auth, db, storage } from "../../firebase/utils";
import { deleteUser, getAuth, updateProfile } from "firebase/auth";
import { handleDeleteRecipe, putImgToStorage } from './../Recipe/recipe.helpers';

export const handleUserProfile = async ({ userAuth, additionalData }: any) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, photoURL } = userAuth;

    try {
      await userRef.set({
        displayName: additionalData?.displayName || userAuth.displayName,
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
    url: "https://sharefood.pl/auth",
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

export const validateRegister = (displayName?: string, email?: string, password?: string, passwordConfirm?: string) => {
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

export const handleChangePassword = (oldPassword: string, newPassword: string) => {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
    const errors: string[] = [];

    if (!newPassword.match(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/))) {
      return resolve(["INVALID_PASSWORD"]);
    }

    const reauthenticate = user.reauthenticateWithCredential(credentials).catch((error) => {
      errors.push(error.code)
    })

    const update =
      user.updatePassword(newPassword).catch((error) => {
        errors.push(error.code)
      });

    Promise.all([reauthenticate, update]).then(() => {
      resolve(errors);
    }).catch((error) => {
      reject(error.message)
      console.log(error);
    })
  })
}

export const handleUpdateProfilePic = (userId: string, profilePic: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let imgUrl = '';
      const imageName = new Date().getTime() + profilePic.name;
      const storageRef = `users/${userId}/${imageName}`;

      deleteStorageUserFiles(userId).then(() => {
        putImgToStorage(profilePic, storageRef)
          .then((res: string) => (imgUrl = res)).then(() => {
            updateProfile(auth.currentUser, {
              photoURL: imgUrl
            }).catch((err) => {
              console.log(resolve(err.message));
            })
          })
          .then(() => {
            db.collection('users').doc(userId).update({
              'profilePic': imgUrl,
            })
          })
          .then(() => {
            resolve(imgUrl);
          })
      })
    } catch (error) {
      reject(error.message);
    }
  })
}

export const handleUpdateUsername = (userId: string, username: string) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    try {
      if (username.length > 12 || username.length < 4) {
        return resolve(["INVALID_USERNAME"]);
      }

      updateProfile(auth.currentUser, {
        displayName: username
      }).catch((err) => {
        console.log(resolve([err.message]));
      }).then(() => {
        db.collection('users').doc(userId).update({
          'displayName': username,
        })
      }).then(() => {
        resolve([]);
      })
    } catch (error) {
      reject(error.message);
    }
  })
}

export const handleDeleteAccount = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(deleteUser(auth.currentUser));
    } catch (error) {
      reject(error.message);
    }
  })
}

export const deleteFile = (pathToFile: string, fileName: string) => {
  const ref = storage.ref(pathToFile);
  const childRef = ref.child(fileName);
  childRef.delete()
}

export const deleteStorageUserFiles = (id: string) => {
  return new Promise((resolve, reject) => {
    try {
      const ref = storage.ref(`/users/${id}`);
      ref.listAll()
        .then(directory => {
          directory.items.forEach(fileRef => deleteFile(ref.fullPath, fileRef.name));
        })
        .then(() => {
          resolve(true);
        })
        .catch(error => console.log(error));
    } catch (error) {
      reject(error.message);
    }
  })
}

export const handleDeleteUserData = (id: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection('users').doc(id).delete().then(() => {
        db.collection('recipes').where('authorId', '==', id).get().then(res => res.forEach(element => {
          handleDeleteRecipe({ imageRef: element.data().image, imageLowRef: element.data().imageLow, recipeId: element.id, authorId: element.data().authorId })
        })).then(() => {
          deleteStorageUserFiles(id)
            .then(() => {
              resolve(true);
            })
            .catch(error => console.log(error));
        })
      })
    } catch (error) {
      reject(error.message);
    }
  })
}

export const handleUserActivity = (uid: string, amount: number) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection('users').doc(uid).update({
        // eslint-disable-next-line 
        ['stats.activity']: firebase.firestore.FieldValue.increment(amount),
      }).then(() => resolve(true));
    } catch (error) {
      reject(error.message);
    }
  })
}