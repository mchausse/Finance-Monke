<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar id="toolbar">
                <ion-buttons>
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title id="title">Home</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-card> </ion-card>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonCard } from '@ionic/vue'
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    name: 'HomePage',
    components: {
        IonPage,
        IonCard,
    },
    methods: {
        async login(email: string, password: string) {
            const response = await axios.post(
                'http://10.10.10.185:8081/api/auth/login',
                {
                    email,
                    password,
                }
            )
            const responseData = JSON.parse(JSON.stringify(response.data))
            const userToken = responseData.token

            if (userToken) localStorage.setItem('userToken', userToken)
            window.location.href = '/'
        },
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
})
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
