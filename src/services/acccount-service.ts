import produce from "immer"
import { Account } from "../model/account"
import store from "../model/store"
import { User } from "../model/user"

const ConnectionString = "http://localhost:3000/password_data"

class AccountService {

    async addAccountDataToUser(userId: number, account: Account) {
         return fetch(ConnectionString, {
             method: 'POST',
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                account, userId
             })
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

    async getAccountDataWithUserId(userId: number): Promise<[]> {
        return fetch(ConnectionString + '/?' + new URLSearchParams({
            userId: userId.toString()
        }), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        
    }

    async getAccountWithId(accountId: number) {
        return fetch(ConnectionString + '/?' + new URLSearchParams({
            id: accountId.toString()
        }), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
    }

}

const accountService = new AccountService()
export default accountService

