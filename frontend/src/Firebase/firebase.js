// Import the functions you need from the SDKs you need
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDX1rVvQ_9LzJPZntGWIOgSP-Maz6RRXGs",
  authDomain: "cmpe275-vms.firebaseapp.com",
  projectId: "cmpe275-vms",
  storageBucket: "cmpe275-vms.appspot.com",
  messagingSenderId: "1039305777316",
  appId: "1:1039305777316:web:7f2efc9d1532c388904631",
  measurementId: "G-JR7Q9SJ495",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
