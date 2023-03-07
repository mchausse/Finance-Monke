import { mount } from '@vue/test-utils'
import TransactionsListItem from '@/components/TransactionsListItem.vue'

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const transaction = {
            id: "1",
            amount: 2,
            date: new Date().toUTCString()
        }

        console.log(transaction)
        const wrapper = mount(TransactionsListItem, {
            props: { transaction }
        })
        expect(wrapper.text()).toBe(transaction.amount+transaction.date)
    })
})