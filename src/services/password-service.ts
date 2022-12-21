import produce from "immer"
import { Password } from "../model/password"
import store from "../model/store"
import { User } from "../model/user"

const ConnectionString = "http://localhost:3000/password_data"

class PasswordService {

    async addPasswordDataToUser(userId: number, password: Password) {
         return fetch(ConnectionString, {
             method: 'POST',
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                 password, userId
             })
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

    async getPasswordDataWithUserId(userId: number): Promise<[] | void> {
        return fetch(ConnectionString + '/?' + new URLSearchParams({
            userId: userId.toString()
        }), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => console.log(response.length === 0 ? [] : response))
    }

    async getPasswordWithId(passwordId: number): Promise<[] |void> {
        return fetch(ConnectionString + '/?' + new URLSearchParams({
            id: passwordId.toString()
        }), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => console.log(response.length === 0 ? [] : response[0].password))
    }

}

const passwordService = new PasswordService()
export default passwordService

