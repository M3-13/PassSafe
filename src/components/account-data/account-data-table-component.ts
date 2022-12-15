import { html, render } from "lit-html"
import { ACCOUNT_SELECTED_EVENT } from "."
import store from "../../model/store"
import { distinctUntilChanged, map } from "rxjs"
import { Account } from "../../model/account"

const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <table class="w3-table-all">
        <thead>
            <tr>
                <th>Id</th><th>Name</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
`
const rowTemplate = (account: Account) => html`
    <td>${account.name}</td><td>${account.username}</td>
`
class AccountDataTableComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("connected usertable")
        //userService.fetchAll()
        store
            .pipe(
                //map(model => model.accounts),
                distinctUntilChanged()
            )
            .subscribe(accounts => {
                //this.render(accounts)
            })
    }
    private render(accounts: Array<Account>) {
        render(tableTemplate, this.shadowRoot)

        const tbody = this.shadowRoot.querySelector("tbody")
        accounts.forEach(accounts => {
            const row = tbody.insertRow()
            row.onclick = () => {
                //const event = new CustomEvent(ACCOUNT_SELECTED_EVENT, {detail: {account}})
                this.dispatchEvent(event)
            }
            //render(rowTemplate(account), row)
        });
    }
}

customElements.define("account-data-table", AccountDataTableComponent)