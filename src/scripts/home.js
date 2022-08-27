
import { Logout } from "./logout.js";
import { ApiRequests } from "./requests.js"


export class Home{

    static renderPost(arrPost){
        const ul= document.querySelector(".ul-post")
        arrPost.data.forEach(element => {
            const postado = this.criarPost(element)
            ul.append(postado)
        });

    }

    static criarPost({content, createdAt, user}){

        


        const li = document.createElement("li")
        const div = document.createElement("div")
        const userNome = document.createElement("H2")
        const conteudo = document.createElement("p")
        const imagemPerfil = document.createElement("img")
        const dataCriação = document.createElement("span")
       

        userNome.innerText =  user.username
        conteudo.innerText = content
        dataCriação.innerHTML = createdAt
        imagemPerfil.src = user.avatarUrl

        div.append(userNome, conteudo, dataCriação)
        li.append(imagemPerfil, div)


        return li
    }

    // static renderUser(){
    //     const header = document.querySelector('header')
    //     const username = localStorage.getItem('@blogzinho:username')
    //     const avatarUrl = localStorage.getItem('@blogzinho:avatarUrl')

    //     const avatar = document.createElement('img')
    //     const name = document.createElement('p')

    //     avatar.src = avatarUrl
    //     username.innerText = username

    //     header.append(avatar,username)

    // }
    
    
}

const dataPost = await ApiRequests.posts()


Logout.logoutToIndex()





class Build_Main {
    static new_post() {
        const body = document.getElementsByTagName('body')[0]
        const main = document.createElement('main')
        body.appendChild(main)
  
        const new_post = document.createElement('div')
        main.appendChild(new_post)
        new_post.className = 'new--post--container'
  
        const post_area = document.createElement('textarea')
        new_post.appendChild(post_area)
        post_area.className = 'post--area'
        post_area.placeholder = 'No que está pensando?'
  
        const postar = document.createElement('button')
        new_post.appendChild(postar)
        postar.className = 'postar'
        postar.innerText = '+'
        postar.addEventListener("click", Post_Manipulations.new_post)
  
        ApiRequests.posts()
  
  
  
    }
  }