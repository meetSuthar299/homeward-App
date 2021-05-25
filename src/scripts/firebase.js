import * as firebase from 'firebase';
import uuid from 'uuid';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDbrF274UtyqQMVyiEadZgnGFJZa-UfHPo',
  authDomain: 'homeward-314fe.firebaseapp.com',
  databaseURL: 'https://homeward-314fe.firebaseio.com',
  projectId: 'homeward-314fe',
  storageBucket: 'homeward-314fe.appspot.com',
  messagingSenderId: '942422012627',
  appId: '1:942422012627:web:65edc6db9e09fcd74fda26',
  measurementId: 'G-1R1DRY3TPF'
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const uploadImageAsync = async uri => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = e => {
      console.error(e);
      reject(new TypeError('Network request failed'));
    };

    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
};

export { firebase as default, firestore, uploadImageAsync };
