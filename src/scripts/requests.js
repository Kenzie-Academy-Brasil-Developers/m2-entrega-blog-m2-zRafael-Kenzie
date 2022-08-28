import { Build_Header, Build_Posts } from "./home.js";


export class Get_Dados {

  static baseUrl = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@blogzinho:token") || ""
    static headers = {
        'Content-Type':"application/json",
        Authorization: `Bearer ${this.token}`
    }

    
  static async user_dados() {

    const dados = await fetch(`${this.baseUrl}/users/${localStorage.getItem('@blogzinho:UserID')}`, {
      method: "GET",
      headers: this.headers,
    })
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));

    Build_Header.build_profile(dados)

  }

  static async get_posts() {

    const dados = await fetch(`${this.baseUrl}/posts?page=1`, {
      method: "GET",
      headers: this.headers,
    })
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));

    Build_Posts.creat_card(dados)
  }


}

export class Requisition {

  static baseUrl = "https://blog-m2.herokuapp.com"
    static token = localStorage.getItem("@blogzinho:token") || ""
    static headers = {
        'Content-Type':"application/json",
        Authorization: `Bearer ${this.token}`
    }

  static posting(dados) {

    fetch(`${this.baseUrl}/posts`, {
      method: "POST",
      headers: this.headers,
      body: `{"content":"${dados}"}`
    })
      .then(response => response.json())
      .then(response => location.reload())
      .catch(err => console.error(err));

  }

  static edit_post(value, id) {

  fetch(`${this.baseUrl}/posts/${id}`, {
      method: "PATCH",
      headers: this.headers,
      body: `{"content":"${value}"}`
    })
      .then(response => response.json())
      .then(response => location.reload())
      .catch(err => console.error(err));
  
  }

  static delet_post(id) {

  fetch(`${this.baseUrl}/posts/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })

      .then(response => location.reload())
      
      .catch(err => console.error(err))

  }
}