export class ApiRequests{

    static baseUrl = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@blogzinho:token") || ""
    static headers = {
        'Content-Type':"application/json",
        authorization: `Bearer ${this.token}`
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
            localStorage.setItem("@blogzinho:UserID",res.userID)
          })
          .catch(err=>console.log(err))
          return userLogin
        }

        static async createUser(body) {
            const newUser = await fetch(`${this.baseUrl}/users/register`, {
              method: "POST",
              headers: this.headers,
              body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(res => {
               return res
            })
            .catch(err => console.log(err))
        
            return newUser
          }
}