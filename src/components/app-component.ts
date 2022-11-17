import { html, render } from "lit-html"

const template = html`
    <h1 class='headline'>PassSafe</h1>`

class AppComponent extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        let style = document.createElement("style");

        style.textContent = `
        .headline{
            text-align: center
        }`;
        shadow.appendChild(style);
    }
    connectedCallback() {
        console.log("app component connected")
        this.render()
    }
    private render() {
        render(template, this.shadowRoot)
    }
}
customElements.define("app-component", AppComponent)