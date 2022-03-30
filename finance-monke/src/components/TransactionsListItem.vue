<template>
    <ion-grid>
        <ion-row>
            <ion-col size="6">
                <ion-label>
                    <h2>{{ transaction.amount }}</h2>
                    <h3>{{ transaction.date }}</h3>
                    <p>{{ transaction.category }}</p>
                </ion-label>
            </ion-col>
            <ion-col size="6" id="button-container">
                <ion-button color="medium" size="large">
                    <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
    IonLabel,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/vue'
import { ellipsisHorizontalOutline } from 'ionicons/icons'

export default defineComponent({
    name: 'TransactionsList',
    props: {
        transaction: Object,
    },
    components: {
        IonLabel,
        IonButton,
        IonIcon,
        IonGrid,
        IonRow,
        IonCol,
    },
    setup() {
        return {
            ellipsisHorizontalOutline,
        }
    },
})
</script>

<style scoped>
#button-container > ion-button {
    float: right;
}
</style>
