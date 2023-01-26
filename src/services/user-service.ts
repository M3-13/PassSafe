import produce from "immer"
import store from "../model/store"
import { User } from "../model/user"

const ConnectionString = "http://localhost:3000/user"

class UserService {

    async getAllUser() {
        return fetch(ConnectionString, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
    }

    async addUser(user: User) {
        return fetch(ConnectionString, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))        // -> ID from User
    }

    async authorizeUser(user: User): Promise<any> {
        return fetch (ConnectionString + '/?' + new URLSearchParams({
            email: user.email,
            password: user.password
        }), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then (response => response.json())
    }

    async getUserById(userId: number) {
        return fetch(ConnectionString + '/?' + new URLSearchParams({
            id: userId.toString()
        }), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

    async removeUser(userId: number) {
        fetch(`http://localhost:3000/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => console.log(response.status))
    }

}

const userService = new UserService()
export default userService