import "./components/app-component"
import userService from "./services/user-service"
import { User } from "./model/user"

const title = document.querySelector("title")
title.textContent = "PassSafe"
const body = document.querySelector("body")
body.style.background = "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)"
const appComponent = document.createElement("app-component")
body.appendChild(appComponent)
