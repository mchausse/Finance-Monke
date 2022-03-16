<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar id="toolbar">
        <ion-buttons>
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title id="title">Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-card>
      <ion-card-content>
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input placeholder="john@doe.com" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Password</ion-label>
          <ion-input
            placeholder="*******"
            v-model="password"
            type="password"
          ></ion-input>
        </ion-item>
        <ion-button expand="full" @click="login(email, password)"
          >Log In</ion-button
        >
        <ion-button expand="full" color="light">Sign Up</ion-button>
      </ion-card-content>
    </ion-card>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LoginPage",
  components: {
    IonPage,
    IonCard,
    IonCardContent,
    IonInput,
    IonItem,
    IonLabel,
  },
  methods: {
    async login(email: string, password: string) {
      console.log(email);
      console.log(password);

      const response = await axios.post(
        "http://10.10.10.185:8081/api/auth/login",
        {
          email,
          password,
        }
      );
      const responseData = JSON.parse(JSON.stringify(response.data));
      const userToken = responseData.token;

      if (userToken) localStorage.setItem("userToken", userToken);
      window.location.href = "/folder/Expenses";
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

#title {
  padding-top: 1em;
  padding-bottom: 1.5em;
  text-align: center;
  font-size: 70px;
}

#toolbar {
  width: 95%;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 15px;
}
</style>
