<template>
    <ion-content>
        <ion-card id="toolbar">
            <ion-title id="title">New expense</ion-title>
        </ion-card>

        <ion-list id="input-list">
            <ion-item>
                <ion-label>Price</ion-label>
                <ion-input
                    placeholder="10.99"
                    type="number"
                    min="0"
                    maxlength="9"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>Category</ion-label>
                <ion-input placeholder="Groceries" maxlength="50"></ion-input>
            </ion-item>
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
                                @click="closeModal"
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
} from '@ionic/vue'
import {
    arrowForwardCircleOutline,
    arrowBackCircleOutline,
} from 'ionicons/icons'

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
    },
    setup() {
        const closeModal = () => {
            console.log('Close')
            modalController.dismiss()
        }

        return {
            closeModal,
            arrowForwardCircleOutline,
            arrowBackCircleOutline,
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
    color: white;
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
