
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
        const div2 = document.createElement("div")
        const dataCriação = document.createElement("span")
       

        userNome.innerText =  user.username
        conteudo.innerText = content
        dataCriação.innerHTML = createdAt
        imagemPerfil.src = user.avatarUrl

        

        div.append(userNome, conteudo, dataCriação)
        li.append(imagemPerfil, div,)


        return li
    }


    
    
}

const dataPost = await ApiRequests.posts()

const ul= document.querySelector(".ul-post")


posts.renderPost(dataPost, ul)


class postar{
    static criarPost(){
        const formPost = document.getElementById("posting")
        const btnPost = document.getElementById("btnPostar")


        btnPost.addEventListener("click", async (event) => {
            event.preventDefault()

            const newPost = {
                content: formPost.value
            }
            await ApiRequests.criarPost(newPost)
        })   
   }}


