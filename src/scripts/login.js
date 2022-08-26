import { ApiRequests } from "./requests.js"

export class Login{
    static LoginPage(){
        const token = localStorage.getItem("@blogzinho:token")


        const emailInput = document.getElementById("emailInput")
        const passwordInput = document.getElementById("passwordInput")
        const btnLogin = document.getElementById("btnLogin")
        
        btnLogin.addEventListener("click",(event)=>{
            event.preventDefault()

            const data = {
                email: emailInput.value,
                password: passwordInput.value,
            }
            ApiRequests.login(data)
        })
    }
}
