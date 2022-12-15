import { html, render } from "lit-html"
import { from } from "rxjs"
import "./login-register"
import "./main-page"
import { LOGGEDIN_EVENT } from "../components/login-register/index"

const template = html`
<login-register id='login-register'></login-register>`

var shadow: any;

class AppComponent extends HTMLElement {
    constructor() {
        super()
        shadow = this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("app-component connected")
        this.render()
    }
    private render() {
        render(template, this.shadowRoot)

        const loginRegisterComponent = this.shadowRoot.querySelector<HTMLElement>("login-register")
        loginRegisterComponent.addEventListener(LOGGEDIN_EVENT, (e: CustomEvent) => {
            const loggedIn = e.detail
            if (loggedIn) {
                loginRegisterComponent.remove()
                const mainpage = document.createElement("main-page")
                shadow.appendChild(mainpage)
            }
        })
    }
}
customElements.define("app-component", AppComponent)