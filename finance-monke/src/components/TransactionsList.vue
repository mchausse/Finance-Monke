<template>
    <ion-content id="content">
        <ion-list id="transaction-list">
            <ion-item
                v-for="transaction in isTransactions ? expenses : incomes"
                :key="transaction.id">
                <transactions-list-item :transaction="transaction" />
            </ion-item>
        </ion-list>
    </ion-content>
</template>

<script lang="ts">
import axios from 'axios'
import TransactionsListItem from '../components/TransactionsListItem.vue'
import Transaction from '../model/transaction'

import { defineComponent } from 'vue'
import { IonList, IonItem, IonContent } from '@ionic/vue'

export default defineComponent({
    name: 'TransactionsList',
    props: {
        isTransactions: Boolean,
    },
    components: {
        IonList,
        IonItem,
        TransactionsListItem,
        IonContent,
    },
    methods: {
        async getExpenses(token: string): Promise<Transaction[]> {
            const response = await axios.get(
                'http://10.10.10.185:8081/api/transactions/' + token
            )
            return JSON.parse(JSON.stringify(response.data))
        },
    },
    async mounted() {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
            this.expenses = await this.getExpenses(userToken)
        }
    },
    data() {
        return {
            expenses: [] as Transaction[],
            incomes: [] as Transaction[],
        }
    },
})
</script>

<style scoped>
#transaction-list {
    width: 97.5%;
    margin-left: 10px;
    border-radius: 15px 15px 0px 0px;
    --offset-bottom: auto !important;
    --overflow: hidden;
    scrollbar-width: none;
    overflow: auto;
    position: relative;
    margin-top: 15em;
}
</style>
