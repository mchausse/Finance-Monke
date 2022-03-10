<template>
  <ion-content id="content">
    <ion-list id="transaction-list">
      <ion-item
        v-for="transaction in isTransactions ? expenses : incomes"
        :key="transaction.id"
      >
        <transactions-list-item :transaction="transaction" />
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import moment from "moment";
import TransactionsListItem from "../components/TransactionsListItem.vue";

import { v4 as uuid } from "uuid";
import { defineComponent } from "vue";
import { IonList, IonItem, IonContent } from "@ionic/vue";

export default defineComponent({
  name: "TransactionsList",
  props: {
    isTransactions: Boolean,
  },
  components: {
    IonList,
    IonItem,
    TransactionsListItem,
    IonContent,
  },
  data() {
    return {
      expenses: [
        {
          id: uuid(),
          category: "Resto",
          amount: "12.99",
          date: moment().format("MMM Do YY"),
        },
        {
          id: uuid(),
          category: "Resto",
          amount: "23.89",
          date: moment().format("MMM Do YY"),
        },
        {
          id: uuid(),
          category: "Resto",
          amount: "12.99",
          date: moment().format("MMM Do YY"),
        },
        {
          id: uuid(),
          category: "Resto",
          amount: "23.89",
          date: moment().format("MMM Do YY"),
        },
        {
          id: uuid(),
          category: "Resto",
          amount: "12.99",
          date: moment().format("MMM Do YY"),
        },
        {
          id: uuid(),
          category: "Resto",
          amount: "23.89",
          date: moment().format("MMM Do YY"),
        },
        {
          id: uuid(),
          category: "Resto",
          amount: "12.99",
          date: moment().format("MMM Do YY"),
        },
        {
          id: uuid(),
          category: "Resto",
          amount: "23.89",
          date: moment().format("MMM Do YY"),
        },
      ],
      incomes: [
        {
          id: uuid(),
          category: "Logient",
          amount: "1221.26",
          date: moment().format("MMM Do YY"),
        },
        {
          id: uuid(),
          category: "Gift",
          amount: "50.00",
          date: moment().format("MMM Do YY"),
        },
      ],
    };
  },
});
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
