export class ApiRequests{

    static baseUrl = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@blogzinho:token") || ""
    static id = localStorage.getItem('@blogzinho:UserID')|| ''
    static headers = {
        'Content-Type':"application/json",
        Authorization: `Bearer ${this.token}`
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

    static async getUser(body){
      const user= await fetch(`${this.baseUrl}/users/${id}`,{
        method: "GET",
        headers: this.headers,
        body: JSON.stringify(body)
      })
      .then(res=>res.json())
      .then(res=>{
        localStorage.setItem('@blogzinho:username',res.username)
        localStorage.setItem('@blogzinho:userAvatar',res.avatarUrl)
      })
      return user
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

    static async posts(){
      const posts = await fetch(`${this.baseUrl}/posts?page=1`,{
        method: "GET",
        headers:this.headers
      })
      .then(res => res.json())
      .then(res => {
        return res
    })
      // .catch(location.assign('../../index.html'))
      return posts
    }
}
