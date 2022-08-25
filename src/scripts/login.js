import { ApiRequests } from "./requests.js"

class Login{
    static Login(){
        const token = localStorage.getItem("@blogzinho:token")

        if(token){
            window.location.assign("src/pages/home.html")
        }

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