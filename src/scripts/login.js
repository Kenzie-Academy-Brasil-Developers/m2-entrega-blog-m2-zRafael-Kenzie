
class Login{

    static baseUrl = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@blogzinho:token") || ""
    static id = localStorage.getItem('@blogzinho:UserID')|| ''
    static headers = {
        'Content-Type':"application/json",
        Authorization: `Bearer ${this.token}`
    }

    static async loginPage(){
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
            
            this.login(data)
        })
    }

    static async login(body) {
        const userLogin = await fetch(`${this.baseUrl}/users/login`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
          })
          .then(res=>res.json())
          .then(res =>{ 
            localStorage.setItem("@blogzinho:token",res.token)
            localStorage.setItem("@blogzinho:UserID",res.userId)
            location.assign("/src/pages/home.html")
            
          })
          .catch(err=>console.log(err))
          return userLogin
        }
}

Login.loginPage()
