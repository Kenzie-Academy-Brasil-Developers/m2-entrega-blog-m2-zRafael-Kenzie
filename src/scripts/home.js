
import { ApiRequests } from "./requests.js"
class posts{

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
    
}

const dataPost = await ApiRequests.posts()

const ulTeste = document.querySelector(".ul-teste")


posts.renderPost(dataPost, ulTeste)