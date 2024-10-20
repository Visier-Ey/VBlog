import {createPinia, defineStore} from 'pinia'

export const pinia = createPinia()

export const useVisitorStore = defineStore('visitor', {
    state: () => {
        return { account: '', password: '',nick: '' }
    },
    actions: {
        setAccount(account) {
            this.account = account
        },
        setPassword(password) {
            this.password = password
        },
        setNick(nick) {
            this.nick = nick
        }
    },
})
