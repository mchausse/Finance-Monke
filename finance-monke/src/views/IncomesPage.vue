<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar id="toolbar">
                <ion-buttons>
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title id="title">Incomes</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-fab vertical="center" horizontal="end" slot="fixed">
            <ion-fab-button>
                <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
        </ion-fab>

        <transactions-list :isTransactions="false"></transactions-list>
    </ion-page>
</template>

<script lang="ts">
import TransactionsList from "../components/TransactionsList.vue"

import { IonPage, IonFab, IonFabButton, IonIcon } from "@ionic/vue"
import { add } from "ionicons/icons"
import { defineComponent } from "vue"

export default defineComponent({
    name: "IncomesPage",
    components: {
        IonPage,
        IonFab,
        IonFabButton,
        IonIcon,
        TransactionsList,
    },
    setup() {
        return {
            add,
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
