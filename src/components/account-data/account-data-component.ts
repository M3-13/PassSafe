import { html, render } from "lit-html"

const template = html`
    <div>User: Max Mustermann</div>
` 

class AccountDataComponent extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        this.render()
    }
    private render() {
        render(template, this.shadowRoot)
    }
}

customElements.define("account-data", AccountDataComponent)