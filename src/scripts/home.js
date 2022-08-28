import { Apirequest } from "./requests.js";

export class BuildHeader {

    static buildProfile(dados) {
        const header = document.getElementsByTagName('header')[0];
        const userDados = document.createElement('div')
        userDados.className = 'dados-user'
        header.appendChild(userDados)

        const avatar = document.createElement('img')
        avatar.src = dados.avatarUrl
        avatar.className = 'avatar-user'
        userDados.appendChild(avatar)

        const username = document.createElement('h1')
        username.className = 'name-user'
        userDados.appendChild(username)
        username.innerText = dados.username

        BuildHeader.logoutButton()


    }

    static logoutButton() {
        const header = document.getElementsByTagName('header')[0];

        const logoutButton = document.createElement('button')
        header.appendChild(logoutButton)
        logoutButton.innerText = 'Logout'
        logoutButton.className = 'logout-button'
        logoutButton.addEventListener('click', ()=> {
            localStorage.clear()
            location.assign('../../index.html')
        })

        BuildMain.newPost()
    }

}

class BuildMain {
    static newPost() {
        const body = document.getElementsByTagName('body')[0]
        const main = document.createElement('main')
        body.appendChild(main)

        const newPost = document.createElement('div')
        main.appendChild(newPost)
        newPost.className = 'new-post-container'

        const postArea = document.createElement('textarea')
        newPost.appendChild(postArea)
        postArea.className = 'post-area'
        postArea.placeholder = 'No que está pensando?'

        const postar = document.createElement('button')
        newPost.appendChild(postar)
        postar.className = 'postar'
        postar.innerText = '+'
        postar.addEventListener("click", PostManipulation.newPost)

        Apirequest.getPosts()



    }
}

export class BuildPosts {

    static creatCard(dados) {

        const body = document.getElementsByTagName('body')[0]
        const postsFeitos = document.createElement('ul')
        postsFeitos.className = 'old-posts'
        body.appendChild(postsFeitos)

        dados.data.forEach(element => {
            const postCard = document.createElement('li')
            postsFeitos.appendChild(postCard)
            postCard.className = 'post-card'

            BuildPosts.cardContent(element, postCard)
        });

    }

    static cardContent(dados, father) {

        const divImg = document.createElement('div')
        father.appendChild(divImg)
        divImg.className = 'div-img'

        const UserImg = document.createElement('img')
        divImg.appendChild(UserImg)
        UserImg.src = dados.user.avatarUrl
        UserImg.className = 'author-img'

        if (dados.user.id == localStorage.getItem('@blogzinho:UserID')) {
        const btnEditarDesktop = document.createElement('button')
        divImg.appendChild(btnEditarDesktop)
        btnEditarDesktop.id = dados.id
        btnEditarDesktop.className = 'button-editar-desktop'
        btnEditarDesktop.addEventListener("click", (data) => {
            
            PostManipulation.editPost(data.target.id)
        })

        const btnExcluirDesktop = document.createElement('button')
        divImg.appendChild(btnExcluirDesktop)
        btnExcluirDesktop.className = 'button-excluir-desktop'
        btnExcluirDesktop.id = dados.id
        btnExcluirDesktop.addEventListener("click", (data) => {
            PostManipulation.deletePost(data.target.id);
        })
        
    }


        const postContent = document.createElement('div')
        father.appendChild(postContent)
        postContent.className = 'post-content'


        const namePost = document.createElement('h2')
        namePost.innerText = dados.user.username
        postContent.appendChild(namePost)

        const content = document.createElement('p')
        postContent.appendChild(content)
        content.innerText = dados.content

        const footer = document.createElement('div')
        father.appendChild(footer)
        footer.className = 'footer'

        const date = document.createElement('p')
        const data = dados.createdAt
        date.innerText = data.substring(0, 10).replaceAll('-','/').split("/").reverse().join("/")
        footer.appendChild(date)

        if (dados.user.id == localStorage.getItem('@blogzinho:UserID')) {
            const btnEditarMobile = document.createElement('button')
            btnEditarMobile.id = dados.id
            footer.appendChild(btnEditarMobile)
            btnEditarMobile.className = 'button-editar-mobile'
            btnEditarMobile.addEventListener("click", (data) => {
                PostManipulation.editPost(data.target.id)
            })

            

            const btnExcluirMobile = document.createElement('button')
            footer.appendChild(btnExcluirMobile)
            btnExcluirMobile.className = 'button-excluir-mobile'
            btnExcluirMobile.id = dados.id
            btnExcluirMobile.addEventListener("click", (data) => {
                PostManipulation.deletePost(data.target.id);
            })
        }

    }
}

class PostManipulation {

    static newPost() {
        const post = document.getElementsByClassName('post-area')[0]

        Apirequest.posting(post.value)

    }

    static async editPost(id){

        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Editando o Post?',
            inputPlaceholder: 'Deixe sua Mensagem...',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true
          })
          
          if (text) {
            Swal.fire('Post Editado com sucesso')
            Apirequest.editPost(text, id)
          }
    }

    static async deletePost(id){
        Swal.fire({
            title: 'Quer mesmo deletar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, Quero Deletar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deletado!',
                'Seu post foi deletado.',
                'success'
              )
              console.log(id);
              Apirequest.deletPost(id)
            }
          })
    }


}

Apirequest.userDados()

