// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhyL59Swg6XEn1ZxWePTlCQRaMgIHYh1g",
  authDomain: "e-commerce-adbd7.firebaseapp.com",
  projectId: "e-commerce-adbd7",
  storageBucket: "e-commerce-adbd7.appspot.com",
  messagingSenderId: "815234241936",
  appId: "1:815234241936:web:b7773bfa0cbb5a46e24f15",
  measurementId: "G-ZSZ57YWJC6"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var email = document.getElementById("email");
var password = document.getElementById("password");
window.login= function(e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      var aaaa =  (success.user.uid);
      localStorage.setItem("uid",aaaa)
      console.log(aaaa)
      if(obj.email=="arunan1994@gmail.com" || obj.email=="arunn.thiayagarajan2003@gmail.com"){
        window.location.replace('admin.html');
      }
      else{
        window.location.replace('customerdashboard.html');
      }
      
    })
    .catch(function (err) {
      alert("login error"+err);
    });

  console.log(obj);
}


