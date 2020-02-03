/**Checkear porque parece que NO está instalado firebase en las dependencias */
/**¿SDK? */
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth' //Para autenticación; es algo muy específico de firebase.
import 'firebase/storage'

const Config = {
    apiKey: "AIzaSyBxCEjHPMPfzWYyl33nIOuN-6nVBPgLXrU",
    authDomain: "m-city-c7e7e.firebaseapp.com",
    databaseURL: "https://m-city-c7e7e.firebaseio.com",
    projectId: "m-city-c7e7e",
    storageBucket: "m-city-c7e7e.appspot.com",
    messagingSenderId: "336633631434",
    appId: "1:336633631434:web:5fea57962a50f9ac8b9a33",
    measurementId: "G-B3ELJWPJ50"
  };

  firebase.initializeApp(Config);

  /**variable que va a conectar con la base de datos */
  const firebaseDB = firebase.database();
  const firebaseMatches = firebaseDB.ref('matches');
  const firebasePromotions = firebaseDB.ref('promotions');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebasePlayers = firebaseDB.ref('players');

  export {
      firebase,
      firebaseMatches,
      firebasePromotions,
      firebaseTeams,
      firebasePlayers,
      firebaseDB

   }