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
            let transactions: Transaction[] = []

            const response = await axios.get(
                'https://firestore.googleapis.com/v1/projects/quickpay-f5a8e/databases/(default)/documents/transactions'
            )
            let resJSON = JSON.parse(JSON.stringify(response.data))
            
            resJSON.documents.forEach((e:any) => {
                transactions.push({
                    id: e.name,
                    amount: e.fields.amount.doubleValue,
                    date: e.fields.date.timestampValue.split('T')[0]
                })
            })

            return transactions
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
#content {
    background-color: aliceblue;
}
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
