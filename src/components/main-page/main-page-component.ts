import { html, render } from "lit-html"
import { Account } from "../../model/account";

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
    <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Some placeholder content in a paragraph.</p>
    <small class="text-muted">And some muted small print.</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Some placeholder content in a paragraph.</p>
    <small class="text-muted">And some muted small print.</small>
  </a>
  <a href="#" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">List group item heading</h5>s
      <small class="text-muted">3 days ago</small>
    </div>
    <p class="mb-1">Some placeholder content in a paragraph.</p>
    <small class="text-muted">And some muted small print.</small>
  </a>
</div>

<div id="id01" class="modal">
  
  <form class="modal-content animate" method='post' onsubmit='return false' id='addAccountForm'>
    <div class="container">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required id='account-username'>

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Username" name="email" required id='account-email'>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required id='account-pwd'>
    </div>

    <div class="container" style="background-color:#f1f1f1">
      <button type="button" id='cancelBtn' class="cancelbtn">Cancel</button>
      <button class="savebtn" type="submit">Add</button>
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

    let style = document.createElement("style");
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
  private render() {
    render(template, this.shadowRoot)

    this.shadowRoot.getElementById("welcome-message").textContent += " " + sessionStorage.getItem("username")

    var openWindowBtn = this.shadowRoot.getElementById("addAccountBtn")
    openWindowBtn.addEventListener('click', (event) => {
      this.shadowRoot.getElementById('id01').style.display = 'block'
    });

    var cancelBtn = this.shadowRoot.getElementById("cancelBtn")
    cancelBtn.addEventListener('click', (event) => {
      this.shadowRoot.getElementById('id01').style.display = 'none'
    });

    const addAccountForm = this.shadowRoot.getElementById('addAccountForm');
    addAccountForm.addEventListener('submit', (event) => {
      const username = (<HTMLInputElement>this.shadowRoot.getElementById("account-username")).value
      const email = (<HTMLInputElement>this.shadowRoot.getElementById("account-email")).value
      const pwd = (<HTMLInputElement>this.shadowRoot.getElementById("account-pwd")).value

      var account: Account = { name: username, email: email, password: pwd };
      console.log(account)
    });
  }
}

customElements.define("main-page", MainPageComponent)