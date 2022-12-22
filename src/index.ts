
import "./components/app-component"
import userService from "./services/user-service"
import passwordService from "./services/password-service"
import { Password } from "./model/password"
import { User } from "./model/user"

const title = document.querySelector("title")
title.textContent = "PassSafe"
const body = document.querySelector("body")
const appComponent = document.createElement("app-component")
body.appendChild(appComponent)
