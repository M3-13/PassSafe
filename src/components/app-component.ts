import { html, render } from "lit-html"
import { from } from "rxjs"
import { User } from "../model/user"
import userService from "../services/user-service"

const template = html`
<div class='all'>
    <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true">

			<div class="signup">
				<form id="signup-form" method='post' onsubmit='return false'>
					<label for="chk" aria-hidden="true">PassSafe | Sign up</label>
					<input type="text" name="username" placeholder="Username" required="" id='signup-username'>
					<input type="email" name="email" placeholder="Email" required="" id='signup-email'>
					<input type="password" name="pwd" placeholder="Password" required="" id='signup-pwd'>
					<input class='submit-btn' type='submit' value='Sign up'></input>
				</form>
			</div>

			<div class="login">
				<form id="signin-form" method='post' onsubmit='return false'>
					<label for="chk" aria-hidden="true">PassSafe | Login</label>
					<input type="email" name="email" placeholder="Email" required="" id='signin-email'>
					<input type="password" name="pwd" placeholder="Password" required="" id='signin-pwd'>
					<input class='submit-btn' type='submit' value='Login'></input>
				</form>
			</div>
	</div>
    </div>
    `

class AppComponent extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" })

        let style = document.createElement("style");

        style.textContent = `
        .all{
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: 'Jost', sans-serif;
            background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
        }
        .main{
            width: 350px;
            height: 500px;
            background: red;
            overflow: hidden;
            background: #302b63;
            border-radius: 10px;
            box-shadow: 5px 20px 50px #000;
        }
        #chk{
            display: none;
        }
        .signup{
            position: relative;
            width:100%;
            height: 100%;
        }
        label{
            padding-top: 25px;
            color: #fff;
            font-size: 1.6em;
            justify-content: center;
            display: flex;
            margin: 60px;
            font-weight: bold;
            cursor: pointer;
            transition: .5s ease-in-out;
        }
        input{
            width: 60%;
            height: 20px;
            background: #e0dede;
            justify-content: center;
            display: flex;
            margin: 20px auto;
            padding: 10px;
            border: none;
            outline: none;
            border-radius: 5px;
        }
        .submit-btn{
            width: 60%;
            height: 40px;
            margin: 10px auto;
            justify-content: center;
            display: block;
            color: #fff;
            background: #573b8a;
            font-size: 1em;
            font-weight: bold;
            margin-top: 20px;
            outline: none;
            border: none;
            border-radius: 5px;
            transition: .2s ease-in;
            cursor: pointer;
        }
        .submit-btn:hover{
            background: #6d44b8;
        }
        .login{
            height: 460px;
            background: #eee;
            border-radius: 60% / 10%;
            transform: translateY(-180px);
            transition: .8s ease-in-out;
        }
        .login label{
            color: #573b8a;
            transform: scale(.6);
        }
        
        #chk:checked ~ .login{
            transform: translateY(-500px);
        }
        #chk:checked ~ .login label{
            transform: scale(1);	
        }
        #chk:checked ~ .signup label{
            transform: scale(.6);
        }
        `;

        shadow.appendChild(style);
    }
    connectedCallback() {
        console.log("app-component connected")
        this.render()

        const signup_form = this.shadowRoot.getElementById('signup-form');
        signup_form.addEventListener('submit', (event) => {
            const username = (<HTMLInputElement>this.shadowRoot.getElementById("signup-username")).value
            const email = (<HTMLInputElement>this.shadowRoot.getElementById("signup-email")).value
            const pwd = (<HTMLInputElement>this.shadowRoot.getElementById("signup-pwd")).value

            var user: User = {name: username, email: email, password: pwd};

            userService.addUser(user)
        });

        const signin_form = this.shadowRoot.getElementById('signin-form');
        signin_form.addEventListener('submit', (event) => this.checkUser(), false)
    }
    private render() {
        render(template, this.shadowRoot)
    }

    async checkUser(){
        {
            const email = (<HTMLInputElement>this.shadowRoot.getElementById("signin-email")).value
            const pwd = (<HTMLInputElement>this.shadowRoot.getElementById("signin-pwd")).value

            var user: User = {email: email, password: pwd};

            if(await userService.authorizeUser(user)){
                console.log("logged in")
            }else{
                console.log("incorrect user data")
            }
        }
    }
}
customElements.define("app-component", AppComponent)