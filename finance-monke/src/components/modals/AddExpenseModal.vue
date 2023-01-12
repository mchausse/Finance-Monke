<template>
    <ion-content>
        <ion-card id="toolbar">
            <ion-title id="title">New expense</ion-title>
        </ion-card>

        <ion-list id="input-list">
            <ion-item>
                <ion-label>Price</ion-label>
                
                <ion-input
                    @ionInput="price"
                    placeholder="$"
                    type="text"
                    min="0"
                    maxlength="9"></ion-input>
            </ion-item>
                
            <ion-list>
                <ion-item>
                <ion-select placeholder="Select the user"
                        v-model="user">
                    <ion-select-option
                        v-for="user in users"
                        :key="user.id"
                        :value="user.id">{{ user.name }}</ion-select-option>
                </ion-select>
                </ion-item>
            </ion-list>
            <ion-item>
                <ion-grid>
                    <ion-row>
                        <ion-col size="3">
                            <ion-button
                                id="trigger-button"
                                @click="closeModal"
                                color="danger"
                                size="large"
                                expand="block">
                                <ion-icon
                                    :icon="arrowBackCircleOutline"></ion-icon>
                            </ion-button>
                        </ion-col>

                        <ion-col size="9">
                            <ion-button
                                id="trigger-button"
                                @click="addTransaction"
                                color="success"
                                size="large"
                                expand="block">
                                <ion-icon
                                    :icon="
                                        arrowForwardCircleOutline
                                    "></ion-icon>
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-item>
        </ion-list>
    </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
    IonList,
    IonItem,
    IonContent,
    IonButton,
    modalController,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonTitle,
    IonSelect,
    IonSelectOption
} from '@ionic/vue'
import {
    arrowForwardCircleOutline,
    arrowBackCircleOutline,
} from 'ionicons/icons'
import axios from 'axios'
import User from '../../model/user'

export default defineComponent({
    name: 'AddExpenseModal',
    components: {
        IonList,
        IonItem,
        IonContent,
        IonButton,
        IonGrid,
        IonRow,
        IonCol,
        IonCard,
        IonTitle,
        IonSelect,
        IonSelectOption
    },
    setup() {
        const closeModal = () => {
            modalController.dismiss()
        }

        return {
            closeModal,
            arrowForwardCircleOutline,
            arrowBackCircleOutline,
        }
    },
    methods: {
        async getUsers(): Promise<User[]> {
            let users: User[] = []

            const response = await axios.get(
                'https://firestore.googleapis.com/v1/projects/quickpay-f5a8e/databases/(default)/documents/users'
            )
            let resJSON = JSON.parse(JSON.stringify(response.data))
            
            resJSON.documents.forEach((e:any) => {
                users.push({
                    id: e.name,
                    name: e.fields.name.stringValue
                })
            })

            return users
        },
        price(ev: any) {
            this.truePrice = +ev.target.value
        },
        async addTransaction() {
            console.log("price", this.truePrice)
            console.log("user", this.user)

            const response = await axios.post(
                'https://firestore.googleapis.com/v1/projects/quickpay-f5a8e/databases/(default)/documents/transactions'
                ,{
                    "fields": {
                        "amount": {
                            "doubleValue": this.truePrice
                        },
                        "user": {
                            "referenceValue": "projects/quickpay-f5a8e/databases/(default)/documents/users/nLYEYiLWbHKBcKMRxx50"
                        },
                        "date": {
                            "timestampValue": "2023-01-12T05:00:00.313Z"
                        }
                    }
                }
            )
            console.log(response)
            modalController.dismiss()
        },
    },
    async mounted() {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
            this.users = await this.getUsers()
        }
    },
    data() {
        return {
            users: [] as User[],
            user: "",
            truePrice: 0
        }
    },
})
</script>

<style scoped>
#title {
    padding-top: 2.25em;
    padding-bottom: 2.25em;
    text-align: center;
    font-size: 50px;
    color: black;
}

#toolbar {
    width: 95%;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 15px;
}

#input-list {
    position: absolute;
    bottom: 0px;
    width: 100%;
}
</style>
