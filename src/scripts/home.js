
import { Logout } from "./logout.js";
import { ApiRequests } from "./requests.js"


class Home{

    static renderPost(arrPost, container){
        arrPost.data.forEach(element => {
            const postado = this.criarPost(element)
            container.append(postado)
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

    static renderUser(){
        const header = document.querySelector('header')
        const username = localStorage.getItem('@blogzinho:username')
        const avatarUrl = localStorage.getItem('@blogzinho:avatarUrl')

        const avatar = document.createElement('img')
        const name = document.createElement('p')

        avatar.src = avatarUrl
        username.innerText = username

        header.append(avatar,username)

    }
    
    
}

const dataPost = await ApiRequests.posts()

const ul= document.querySelector(".ul-post")
Logout.logoutToIndex()
Home.renderPost(dataPost, ul)
Home.renderUser()





