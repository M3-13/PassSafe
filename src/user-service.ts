import produce from "immer"
import store from "./model/store"
import { User } from "./model/user"

const ConnectionString = "http://localhost:3000/"

class UserService {

    async getAllUser() {
        return fetch(ConnectionString + 'user', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
    }

    async addUser(user: User) {
        return fetch(ConnectionString + 'user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))        // -> ID from User
    }

    async authorizeUser(user: User) {
        return fetch(ConnectionString + 'user/?' + new URLSearchParams({
            email: user.email
        }), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
    }

    async getUserById(userId: string) {
        return fetch(ConnectionString + 'user/?' + new URLSearchParams({
            id: userId
        }), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
    }

    async removeUser() {

    }
}

const userService = new UserService()
export default userService