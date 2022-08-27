import { Home } from "./home.js"


export class ApiRequests{

    static baseUrl = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@blogzinho:token") || ""
    static id = localStorage.getItem('@blogzinho:UserID')|| ''
    static headers = {
        'Content-Type':"application/json",
        Authorization: `Bearer ${this.token}`
    }

    static async getUser(body){
      const user= await fetch(`${this.baseUrl}/users/${id}`,{
        method: "GET",
        headers: this.headers,
        body: JSON.stringify(body)
      })
      .then(res=>res.json())
      .then(res=>{
        res
      })
      .catch(err =>console.log(err))
      Build_Header.build_profile(dados)
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
      .catch(err=>console.log(err))
      Home.renderPost(posts)
    }

    // static async posting(dados){
    //   const postar = await fetch(`${this.baseUrl}/postar`,{
    //     method: 'POST'
    //     headers: this.headers
    //     body: Json.stringify(dados)
    //   })
    //   .then(res => res.json())
    //   .then(res =>location.reaload())
    //   .catch(err => console.log(err))
    //   return postar
    // }

    // static async edit_post(value,id){
    //   const editar = await fetch(`${this.baseUrl}/posts/${id}`,{
    //     method: 'PATCH'
    //     headers: this.headers
    //     body: Json.stringify(value)
    //   })
    //   .then(res =>res.json())
    //   .then(res => location.reaload())
    //   .catch(err =>console.log(err))
    // }

    // static async delet_post(id){
    //   const editar = await fetch(`${this.baseUrl}/posts/${id}`,{
    //     method: 'DELETE'
    //     headers: this.headers
    //   })
    //   .then(res =>location.reaload)
    //   .catch(err =>console.log(err))
    

    // }

}
