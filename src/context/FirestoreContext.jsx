import React from 'react';

import { firestore } from '../scripts/firebase';

const collections = {
  POSTS: 'posts',
  USERS: 'users'
};

const FirestoreContext = React.createContext({});

const FirestoreContextProvider = ({ children }) => {
  const firestoreContext = React.useMemo(
    () => ({
      getPosts: async () => {
        const postsRef = firestore.collection(collections.POSTS);
        const snapshot = await postsRef.orderBy('date', 'desc').get();

        const result = [];

        snapshot.forEach(doc =>
          result.push(
            Object.defineProperty(doc.data(), 'id', {
              value: doc.id,
              enumerable: true
            })
          )
        );

        return result;
      },
      createPost: async data =>
        await firestore.collection(collections.POSTS).add(data),
      deletePost: async id =>
        await firestore.collection(collections.POSTS).doc(id).delete(),
      createUser: async (uid, data) =>
        await firestore.collection(collections.USERS).doc(uid).set(data),
      getUser: async uid =>
        await firestore.collection(collections.USERS).doc(uid).get(),
      updateUser: async (uid, data) =>
        await firestore.collection(collections.USERS).doc(uid).update(data)
    }),
    []
  );

  return (
    <FirestoreContext.Provider value={firestoreContext}>
      {children}
    </FirestoreContext.Provider>
  );
};

export { FirestoreContext, FirestoreContextProvider };
