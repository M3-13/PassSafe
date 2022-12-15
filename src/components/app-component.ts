import { html, render } from "lit-html"
import { from } from "rxjs"
import "../components/login-register/index"

const template = html`
<login-register></login-register>`

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("app-component connected")
        this.render()
    }
    private render() {
        render(template, this.shadowRoot)
    }
}
customElements.define("app-component", AppComponent)