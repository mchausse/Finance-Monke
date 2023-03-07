<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar id="toolbar">
                <ion-buttons>
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title id="title">Expenses</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-fab vertical="top" horizontal="end" slot="fixed" class="fab">
            <ion-fab-button class="fab-button">
                <ion-icon :icon="add" @click="openAddExpenseModal"></ion-icon>
            </ion-fab-button>
        </ion-fab>

        <transactions-list
            id="transaction-list"
            :isTransactions="true"></transactions-list>
    </ion-page>
</template>

<script lang="ts">
import TransactionsList from '../components/TransactionsList.vue'
import AddExpenseModal from '../components/modals/AddExpenseModal.vue'

import {
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon,
    modalController,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton
} from '@ionic/vue'
import { add } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ExpensesPage',
    components: {
        IonPage,
        IonFab,
        IonFabButton,
        IonIcon,
        TransactionsList,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonMenuButton
    },
    setup() {
        const openAddExpenseModal = async () => {
            const modal = await modalController.create({
                component: AddExpenseModal, //Modal is name of the component to render inside ionic modal
            })
            return modal.present()
        }

        return {
            add,
            openAddExpenseModal,
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
    background-color: #296EB4;
    color:aliceblue;
}
#title {
    padding-top: 1em;
    padding-bottom: 1.5em;
    text-align: center;
    font-size: 70px;
}

ion-header {
    width: 95%;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
}
ion-title,
ion-header,
ion-toolbar {
    border-radius: 15px;
}

.fab {
    position:absolute;
    top:15rem;
}
.fab-button {
    color: #fdb833;
}
</style>
