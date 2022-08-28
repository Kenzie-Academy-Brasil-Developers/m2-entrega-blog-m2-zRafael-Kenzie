import { BuildHeader, BuildPosts } from "./home.js";

export class Apirequest {

  static async userDados() {

    const dados = await fetch(`${this.baseUrl}/users/${localStorage.getItem('@blogzinho:UserID')}`, {
      method: "GET",
      headers: this.headers,
    })
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));

    BuildHeader.buildProfile(dados)

  }

  static async getPosts() {

    const dados = await fetch(`${this.baseUrl}/posts?page=1`, {
      method: "GET",
      headers: this.headers,
    })
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));

    BuildPosts.creatCard(dados)
  }

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

  static editPost(value, id) {

  fetch(`${this.baseUrl}/posts/${id}`, {
      method: "PATCH",
      headers: this.headers,
      body: `{"content":"${value}"}`
    })
      .then(response => response.json())
      .then(response => location.reload())
      .catch(err => console.error(err));
  
  }

  static deletPost(id) {

  fetch(`${this.baseUrl}/posts/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })

      .then(response => location.reload())
      
      .catch(err => console.error(err))

  }
}