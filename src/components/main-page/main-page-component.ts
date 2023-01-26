import { html, render } from "lit-html"
import { Account } from "../../model/account";
import accountService from "../../services/acccount-service";
import hashTools from "../../utils/hash-tools";

const template = html`
    <div class='all'>
    <div class='content'>
    <div class="upper-right-corner">
    <div class="waviy">
      <span style="--i:1">P</span>
      <span style="--i:2">a</span>
      <span style="--i:3">s</span>
      <span style="--i:4">s</span>
      <span style="--i:5">S</span>
      <span style="--i:6">a</span>
      <span style="--i:7">f</span>
      <span style="--i:8">e</span>
    </div>
    <p id='welcome-message'>Hey, </p>
    </div>
    <div class="upper-left-corner">
    <button id='addAccountBtn' class='addAccountBtn'>Add Account</button>
    </div>
    <div class="space"></div>
    <div class='accounts'>
    <div class="list-group" id='all_accounts'>
</div>

<div id="id01" class="modal">
  
  <form class="modal-content animate" method='post' onsubmit='return false' id='addAccountForm'>
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required id='account-username'>

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" required id='account-email'>

      <label for="email"><b>URL</b></label>
      <input type="text" placeholder="Enter URL" name="url" required id='account-url'>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required id='account-pwd'>
      <button class="generatePasswordBtn" type="button" id='generatePasswordBtn'>Generate Password</button>
    </div>

    <div class="container" style="background-color:#f1f1f1">
      <button type="button" id='cancelBtn' class="cancelbtn">Cancel</button>
      <button class="savebtn" type="submit" id='addBtn'>Add</button>
    </div>
  </form>
</div>

<div id="id02" class="modal">
<form class="modal-content animate" method='post' onsubmit='return false' id='accountDetailsForm'>
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Username" name="uname" required id='account-username-edit'>

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" required id='account-email-edit'>

      <label for="email"><b>URL</b></label>
      <input type="text" placeholder="Enter URL" name="url" required id='account-url-edit'>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required id='account-pwd-edit'>
      <button class="generatePasswordBtn" type="button" id='generatePasswordBtn'>Generate Password</button>
    </div>

    <div class="container" style="background-color:#f1f1f1">
      <button type="button" id='cancelBtn2' class="cancelbtn">Cancel</button>
      <button class="savebtn" type="submit" id='updateBtn'>Update</button>
    </div>
  </form>

</div>
    </div
    </div>
    </div>
`

class MainPageComponent extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })

    let style = document.createElement("style")
    style.textContent = `
    @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css");
    @import url("https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap");
            
    .all{
        margin: 0;
        padding: 0;
        min-height: 100vh;
    }

    .upper-right-corner{
      float: right;
    }

    .upper-left-corner{
      float: left;
    }

    #welcome-message{
      text-align: right;
      color: #fff;
    }

    .generatePasswordBtn {
      background-color: black;

    }

    .space{
      padding: 60px;
    }

    .content{
        padding: 10px;
        overflow: hidden;
    }

    .addAccountBtn{
      background-color: #302b63;
      width:auto;
    }

    input[type=text], input[type=password] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    button {
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width: 100%;
    }

    button:hover {
      opacity: 0.8;
    }

    .cancelbtn {
      width: auto;
      padding: 10px 18px;
      background-color: #f44336;
    }

    .savebtn {
      width: auto;
      padding: 10px 18px;
      background-color: #04AA6D;
      float: right;
    }

    .container {
      padding: 16px;
    }

    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0,0,0);
      background-color: rgba(0,0,0,0.4);
      padding-top: 60px;
    }

    .modal-content {
      background-color: #fefefe;
      margin: 5% auto 15% auto;
      border: 1px solid #888;
      width: 50%;
    }

    .close {
      position: absolute;
      right: 25px;
      top: 0;
      color: #000;
      font-size: 35px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: red;
      cursor: pointer;
    }

    .animate {
      -webkit-animation: animatezoom 0.6s;
      animation: animatezoom 0.6s
    }

    @-webkit-keyframes animatezoom {
      from {-webkit-transform: scale(0)} 
      to {-webkit-transform: scale(1)}
    }
      
    @keyframes animatezoom {
      from {transform: scale(0)} 
      to {transform: scale(1)}
    }

    @media screen and (max-width: 300px) {
      .cancelbtn {
        width: 100%;
      }
      .savebtn {
        width: 100%;
      }
    }

    .waviy {
      position: relative;
      font-family: 'Rock Salt', cursive;
    }
    .waviy span {
      position: relative;
      display: inline-block;
      font-size: 40px;
      color: #fff;
      text-transform: uppercase;
      animation: flip 2s infinite;
      animation-delay: calc(.2s * var(--i))
    }
    @keyframes flip {
      0%,80% {
        transform: rotateY(360deg) 
      }
    }
        `
    shadow.appendChild(style)
  }
  connectedCallback() {
    this.render()
  }

  private createAccountElement(account: Account, id: string): HTMLDivElement{
    var account_div = document.createElement("div")

    account_div.id = id
    
    var link = document.createElement("a")
    link.setAttribute("href", "#")
    link.setAttribute("class", "list-group-item list-group-item-action")

    var div = document.createElement("div")
    div.setAttribute("class", "d-flex w-100 justify-content-between")

    var h5 = document.createElement("h5")
    h5.setAttribute("class", "mb-1")
    h5.textContent = "Name: " + account.name
    var small = document.createElement("small")
    small.setAttribute("class", "text-muted")
    small.textContent = "" + account.creationDate
    
    div.appendChild(h5)
    div.appendChild(small)
    
    link.appendChild(div)

    var p = document.createElement("p")
    p.setAttribute("class", "mb-1")
    p.textContent = "URL: " + account.url

    link.appendChild(p)

    var small2 = document.createElement("small")
    small2.setAttribute("class", "text-muted")
    small2.textContent = "click me for more information"

    link.appendChild(small2)

    account_div.appendChild(link)

    return account_div
  }

  private genPassword() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber +1);
    }
    
    return password
  }

  private async render() {
    render(template, this.shadowRoot)

    this.shadowRoot.getElementById("welcome-message").textContent += " " + sessionStorage.getItem("username")

    var openWindowBtn = this.shadowRoot.getElementById("addAccountBtn")
    openWindowBtn.addEventListener('click', (event) => {
      this.shadowRoot.getElementById('id01').style.display = 'block'
    })

    var cancelBtn = this.shadowRoot.getElementById("cancelBtn")
    cancelBtn.addEventListener('click', (event) => {
      this.shadowRoot.getElementById('id01').style.display = 'none'
    })

    var cancelBtn2 = this.shadowRoot.getElementById('cancelBtn2')
    cancelBtn2.addEventListener('click', (event) => {
      this.shadowRoot.getElementById('id02').style.display = 'none'
    })

    var userId = Number(sessionStorage.getItem("user_id"));

    const addAccountForm = this.shadowRoot.getElementById('addAccountForm');
    addAccountForm.addEventListener('submit', (event) => {
      const username = (<HTMLInputElement>this.shadowRoot.getElementById("account-username")).value
      const email = (<HTMLInputElement>this.shadowRoot.getElementById("account-email")).value
      const url = (<HTMLInputElement>this.shadowRoot.getElementById("account-url")).value
      const pwd = (<HTMLInputElement>this.shadowRoot.getElementById("account-pwd")).value
      const creationDate = new Date()

      var hashedPwd = hashTools.encrypt(pwd)

      var account: Account = { name: username, email: email, password: hashedPwd, url: url, creationDate: creationDate }
      accountService.addAccountDataToUser(userId, account)
    })

   var all_accounts = this.shadowRoot.getElementById("all_accounts")

   var accounts = await accountService.getAccountDataWithUserId(userId)
   
   accounts.forEach((account:any) => {
    var newAccount = this.createAccountElement(account.account, account.id)
    newAccount.addEventListener('click', async (event) => {
      var accountDetails = await accountService.getAccountWithId(parseInt(newAccount.id))
      const username_edit_field = (<HTMLInputElement>this.shadowRoot.getElementById("account-username-edit"))
      username_edit_field.value = accountDetails[0].account.name
      const email_edit_field = (<HTMLInputElement>this.shadowRoot.getElementById("account-email-edit"))
      email_edit_field.value = accountDetails[0].account.email
      const url_edit_field = (<HTMLInputElement>this.shadowRoot.getElementById("account-url-edit"))
      url_edit_field.value = accountDetails[0].account.url
      const password_edit_field = (<HTMLInputElement>this.shadowRoot.getElementById("account-pwd-edit"))
      password_edit_field.value = hashTools.decrypt(accountDetails[0].account.password)
      
      this.shadowRoot.getElementById('id02').style.display = 'block'
    })
    all_accounts.appendChild(newAccount)
   });

  const generatePasswordBtn = this.shadowRoot.getElementById('generatePasswordBtn')
  generatePasswordBtn.addEventListener('click', (event) => {
    const password_field = (<HTMLInputElement>this.shadowRoot.getElementById("account-pwd"))
    password_field.value = this.genPassword()
  })
  }
}

customElements.define("main-page", MainPageComponent)