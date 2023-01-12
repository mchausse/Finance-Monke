import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { IonicVue } from '@ionic/vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6i4qtzIu9DCoP4fnhuEh-Hkjs4TiWiZE",
  authDomain: "quickpay-f5a8e.firebaseapp.com",
  databaseURL: "https://quickpay-f5a8e-default-rtdb.firebaseio.com",
  projectId: "quickpay-f5a8e",
  storageBucket: "quickpay-f5a8e.appspot.com",
  messagingSenderId: "273938821257",
  appId: "1:273938821257:web:83d6f9e71e73c0b7bd5658",
  measurementId: "G-PRFH6EZZQC"
};

// Initialize Firebase
const appF = initializeApp(firebaseConfig);
const analytics = getAnalytics(appF);
const app = createApp(App)
	.use(IonicVue)
	.use(router)
  
router.isReady().then(() => {
	app.mount('#app')
})