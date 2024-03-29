import firebase from "firebase/compat/app";
import { db, storage } from "../../firebase/utils";
import { Query } from "@firebase/firestore-types";
import { handleGetUserData } from './../Recipes/recipes.helpers'
import { CommentType, Comments, FiltersTypes, NewRecipeData } from "../../shared/types";
import { handleUserActivity } from "../User/user.helpers";

export const handleFetchSelectedRecipe = (recipeId: string) => {
  return new Promise((resolve, reject) => {
    db.collection("recipes")
      .doc(recipeId)
      .get()
      .then(async (doc) => {
        if (doc.data()) {
          let { profilePic, username } = await handleGetUserData(doc.data()?.authorId);
          resolve({ id: doc.id, data: { ...doc.data(), profilePic, username } });
        }
        else {
          resolve(null);
        }
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

export const handleFetchRecipeData = (recipeId: string, userId?: string) => {
  return new Promise((resolve, reject) => {
    db.collection("recipes")
      .doc(recipeId)
      .get()
      .then(async (doc) => {
        if (doc.data()) {
          let { profilePic, username } = await handleGetUserData(doc.data()?.authorId);
          let liked = await checkIfLiked(userId, doc.data());
          resolve({ ...doc.data(), profilePic, username, liked });
        }
        else {
          resolve(null);
        }
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

export const checkIfLiked = (userId: string, data: firebase.firestore.DocumentData) => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      if (data?.likesUsers?.includes(userId)) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error.message)
    }
  })
}

export const handleLikeRecipe = (userId: string, recipeId: string, authorId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes")
        .doc(recipeId)
        .update({
          // eslint-disable-next-line 
          ['stats.likesQuantity']: firebase.firestore.FieldValue.increment(1),
          likesUsers: firebase.firestore.FieldValue.arrayUnion(userId),
        }).then(() => {
          db.collection('users').doc(authorId).update({
            // eslint-disable-next-line 
            ['stats.likesQuantity']: firebase.firestore.FieldValue.increment(1),
          }).then(() => {
            resolve(true);
          })
        })
    } catch (err) {
      reject(err.message)
    }
  })
};

export const handleViewRecipe = (recipeId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes")
        .doc(recipeId)
        .update({
          // eslint-disable-next-line 
          ['stats.views']: firebase.firestore.FieldValue.increment(1),
        });
      resolve(true);
    } catch (err) {
      reject(err.message)
    }
  })
};

export const handleDislikeRecipe = (userId: string, recipeId: string, authorId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes")
        .doc(recipeId)
        .update({
          // eslint-disable-next-line 
          ['stats.likesQuantity']: firebase.firestore.FieldValue.increment(-1),
          likesUsers: firebase.firestore.FieldValue.arrayRemove(userId),
        }).then(() => {
          db.collection('users').doc(authorId).update({
            // eslint-disable-next-line 
            ['stats.likesQuantity']: firebase.firestore.FieldValue.increment(-1),
          }).then(() => {
            resolve(true);
          })
        })
      resolve(true);
    } catch (err) {
      reject(err.message)
    }
  })
};

export const handleDeleteRecipe = ({ imageRef, imageLowRef, recipeId, authorId }: { imageRef: string, imageLowRef: string, recipeId: string, authorId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection('recipes').doc(recipeId).collection('comments').get().then((snapshot) => {
        // eslint-disable-next-line array-callback-return
        snapshot.docs.forEach((doc) => {
          db.collection('recipes').doc(recipeId).collection('comments').doc(doc.id).delete();
        })
      }).then(() => {
        db.collection("recipes").doc(recipeId).delete()
      })
        .then(() => {
          storage.refFromURL(imageRef).delete()
          storage.refFromURL(imageLowRef).delete()
            .then(() => {
              db.collection('collections').where('eng_recipes', 'array-contains', recipeId).get().then((snapshot) => {
                // eslint-disable-next-line 
                snapshot.docs.map((doc) => {
                  if (doc.id) {
                    db.collection('collections').doc(doc.id).update({
                      'eng_recipes': firebase.firestore.FieldValue.arrayRemove(recipeId)
                    })
                  }
                })
              });
            })
        }).then(() => {
          db.collection('collections').where('pl_recipes', 'array-contains', recipeId).get().then((snapshot) => {
            // eslint-disable-next-line 
            snapshot.docs.map((doc) => {
              if (doc.id) {
                db.collection('collections').doc(doc.id).update({
                  'pl_recipes': firebase.firestore.FieldValue.arrayRemove(recipeId)
                })
              }
            })
          });
        }).then(() => {
          handleUserActivity(authorId, -2);
        }).then(() => {
          resolve(true);
        })
    } catch (err) {
      reject(err.message);
    }
  })
};

export const putImgToStorage = (file: any, refString: string) => {
  return new Promise((resolve, reject) => {
    try {
      let ref = storage.ref(refString)
      ref.put(file).then(() => resolve(ref.getDownloadURL()))
    } catch (error) {
      reject(error.message)
    }
  })
}

const handleExistingDoc = (title: string, collection: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const id = title.trim().replace(/[-._,]/g, '').split(' ').join('-').toLowerCase();
      const refSnapshot = db.collection(collection).doc(id).get();
      if (!(await refSnapshot).exists) {
        resolve(id);
      } else {
        const existingId = (await refSnapshot).id;
        const newId = existingId.concat(Date.now().toString());
        resolve(newId);
      }
    } catch (error) {
      reject(error.message);
      alert(error.message);
    }
  })
}

export const handleCreateRecipe = (payload: NewRecipeData) => {
  return new Promise((resolve, reject) => {
    const {
      authorId,
      type,
      title,
      ingredients,
      method,
      tags,
      portions,
      imgFileHigh,
      imgFileLow,
      language,
      handleAdd,
      description
    } = payload;
    const imageName_highRes: string = new Date().getTime() + imgFileHigh.name + '_HIGH';
    const imageName_lowRes: string = new Date().getTime() + imgFileLow.name + "_LOW";
    const urls: { highResImg: string, lowResImg: string } = {
      highResImg: "", lowResImg: ""
    };
    const putHighResImg = putImgToStorage(imgFileHigh, `recipeImages/${authorId}/${title}/${imageName_highRes}`).then((res: string) => (urls.highResImg = res));
    const putLowResImg = putImgToStorage(imgFileLow, `recipeImages/${authorId}/${title}/${imageName_lowRes}`).then((res: string) => (urls.lowResImg = res));
    const uniqueId = handleExistingDoc(title, 'recipes');

    Promise.all([putHighResImg, putLowResImg, uniqueId])
      .then(() => {
        handleAdd(true);
      })
      .then(async () => {
        db.collection('recipes').doc(await uniqueId).set({
          authorId: authorId,
          type: type,
          description: description,
          title: title,
          ingredients: ingredients,
          method: method,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          likesUsers: [],
          tags: tags,
          portions: portions,
          image: urls.highResImg,
          imageLow: urls.lowResImg,
          language: language,
          stats: {
            likesQuantity: 0,
            views: 0,
          }
        }).then(() => {
          resolve(true);
        })
      }).catch(err => {
        console.log(err.message);
        reject(err.message);
      });
  });
};

export const handleAddComment = (comment: string, userId: string, recipeId: string, parentId: string, replyToId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection('recipes').doc(recipeId).collection('comments').add({
        authorId: userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        text: comment,
        likesUsers: [],
        likesQuantity: 0,
        repliesQuantity: 0,
        parentId: parentId,
        replyToId: replyToId || "",
      }).then((docRef) => {
        resolve(docRef.id);
      })
    } catch (error) {
      reject(error);
    }
  })
}

export const handleReplyCounter = (recipeId: string, parentId: string, counter: number) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection('recipes').doc(recipeId).collection('comments').doc(parentId).update({
        repliesQuantity: firebase.firestore.FieldValue.increment(counter)
      }).then(() => {
        resolve(true);
      })
    } catch (error) {
      reject(error.message);
    }
  })
}

export const handleDeleteComment = (commentId: string, recipeId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection('recipes').doc(recipeId).collection('comments').doc(commentId).delete().then(() => {
        resolve(true);
      })
    } catch (error) {
      reject(error);
    }
  })
}

export const handleDeleteAllReplies = ({ recipeId, commentId }: { recipeId: string, commentId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection('recipes').doc(recipeId).collection('comments').where('parentId', '==', commentId).get().then(res => res.forEach(element => {
        handleDeleteComment(element?.id, recipeId)
        handleUserActivity(element?.data().authorId, -0.25);
      })).then(() => {
        resolve(true);
      })
    } catch (error) {
      reject(error.message);
    }
  })
}

export const handleFetchComments = (filters: FiltersTypes) => {
  return new Promise((resolve, reject) => {
    let ref: Query = db.collection("recipes").doc(filters.recipeId).collection('comments');

    let {
      sortFilter,
      counter,
      startAfterDoc,
      commentsQuantity,
      userId,
      parentId,
      persistComments = [],
    } = filters;

    let commentsCounter = commentsQuantity;

    if (parentId) {
      ref = ref.where('parentId', '==', parentId);
    } else {
      ref = ref.where('parentId', '==', '');
    }

    if (sortFilter === 'popular') {
      ref = ref.orderBy("likesQuantity", "desc");
    } else if (sortFilter === 'newest') {
      ref = ref.orderBy("timestamp", "desc");
    } else if (sortFilter === 'oldest') {
      ref = ref.orderBy('timestamp', 'asc');
    }

    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    !commentsQuantity && ref.get().then((snapshot) => {
      commentsCounter = snapshot.size;
    })

    ref
      .limit(counter)
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;
        const queryDoc = snapshot.docs[totalCount - 1];
        const isLastPage = totalCount < counter;

        const data = [
          ...persistComments,
          ...snapshot.docs.map(async (doc) => {
            let { profilePic, username } = await handleGetUserData(doc.data().authorId);
            let liked = await checkIfLiked(userId, doc.data());
            return {
              id: doc.id,
              data: { ...doc.data(), profilePic, username, liked },
            }
          })
        ];

        Promise.all(data).then((value) => resolve({
          data: value,
          queryDoc,
          isLastPage,
          amount: commentsCounter,
          repliesFetched: [],
        }));
      })
      .catch(err => {
        console.log(err.message);
        reject(err.message);
      })
  })
};

export const handleRemoveStoreComment = ({ prevComments, commentToRemove }: { prevComments: Comments['data'], commentToRemove: string }) => {
  return prevComments.filter(
    (comment: CommentType) => comment.id !== commentToRemove
  );
};

export const handleDislikeComment = (userId: string, recipeId: string, commentId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes")
        .doc(recipeId)
        .collection('comments')
        .doc(commentId)
        .update({
          likesQuantity: firebase.firestore.FieldValue.increment(-1),
          likesUsers: firebase.firestore.FieldValue.arrayRemove(userId),
        }).then(() => {
          resolve(true);
        })
    } catch (err) {
      reject(err.message)
    }
  })
};

export const handleLikeComment = (userId: string, recipeId: string, commentId: string) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("recipes")
        .doc(recipeId)
        .collection('comments')
        .doc(commentId)
        .update({
          likesQuantity: firebase.firestore.FieldValue.increment(+1),
          likesUsers: firebase.firestore.FieldValue.arrayUnion(userId),
        }).then(() => {
          resolve(true);
        })
    } catch (err) {
      reject(err.message)
    }
  })
};

export const handleSetRepliesData = ({ prevData, newData, parentId }: { prevData: CommentType[], newData: Comments['data'], parentId: string }) => {
  const filteredData = prevData.filter(({ data }) => {
    return !(data?.parentId === parentId && data.isNewReply)
  })

  return [...filteredData, ...newData]
}

export const handleCommentsLikes = ({ prevComments, commentId, likeStatus }: { prevComments: Comments['data'], commentId: string, likeStatus: boolean }) => {
  let foundComment: CommentType = prevComments.find(
    (comment: CommentType) => comment.id === commentId
  );
  foundComment.data.liked = likeStatus;
  return prevComments;
};

export const handleAddStoreCommentReply = ({ prevComments, data }: { prevComments: Comments['data'], data: CommentType['data'] }) => {
  let foundComment: CommentType = prevComments.find(
    (comment: CommentType) => comment.id === data.parentId
  )
  foundComment.data.repliesQuantity += 1

  return [...prevComments, {
    id: data.commentId,
    data: data
  }]
}

export const handleRemoveStoreCommentReply = ({ prevComments, parentId, commentToRemove }: { prevComments: Comments['data'], parentId: string, commentToRemove: string }) => {
  let foundComment: CommentType = prevComments.find(
    (comment: CommentType) => comment.id === parentId
  )
  foundComment.data.repliesQuantity -= 1

  return prevComments.filter(
    (comment: CommentType) => comment.id !== commentToRemove
  );

}