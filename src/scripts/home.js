import { Get_Dados, Requisition } from "./requests.js";

export class Build_Header {

    static build_profile(dados) {
        const header = document.getElementsByTagName('header')[0];
        const user_dados = document.createElement('div')
        user_dados.className = 'dados--user'
        header.appendChild(user_dados)

        const avatar = document.createElement('img')
        avatar.src = dados.avatarUrl
        avatar.className = 'avatar--user'
        user_dados.appendChild(avatar)

        const user_name = document.createElement('h1')
        user_name.className = 'name--user'
        user_dados.appendChild(user_name)
        user_name.innerText = dados.username

        Build_Header.logout_button()


    }

    static logout_button() {
        const header = document.getElementsByTagName('header')[0];

        const logout_button = document.createElement('button')
        header.appendChild(logout_button)
        logout_button.innerText = 'Logout'
        logout_button.className = 'logout--button'
        logout_button.addEventListener('click', ()=> {
            localStorage.clear()
            location.assign('../../index.html')
        })

        Build_Main.new_post()
    }

}

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

        Get_Dados.get_posts()



    }
}

export class Build_Posts {

    static creat_card(dados) {

        const body = document.getElementsByTagName('body')[0]
        const old_posts = document.createElement('ul')
        old_posts.className = 'old--posts'
        body.appendChild(old_posts)

        dados.data.forEach(element => {
            const post_card = document.createElement('li')
            old_posts.appendChild(post_card)
            post_card.className = 'post--card'

            Build_Posts.creat_card_content(element, post_card)
        });

    }

    static creat_card_content(dados, father) {

        const div_img = document.createElement('div')
        father.appendChild(div_img)
        div_img.className = 'div--img'

        const author_img = document.createElement('img')
        div_img.appendChild(author_img)
        author_img.src = dados.user.avatarUrl
        author_img.className = 'author--img'

        if (dados.user.id == localStorage.getItem('@blogzinho:UserID')) {
        const button_editar01 = document.createElement('button')
        div_img.appendChild(button_editar01)
        button_editar01.id = dados.id
        button_editar01.className = 'button--editar-desktop'
        button_editar01.addEventListener("click", (data) => {
            
            Post_Manipulations.editing_post(data.target.id)
        })

        const button_excluir01 = document.createElement('button')
        div_img.appendChild(button_excluir01)
        button_excluir01.className = 'button--excluir-desktop'
        button_excluir01.id = dados.id
        button_excluir01.addEventListener("click", (data) => {
            Post_Manipulations.deleting_post(data.target.id);
        })
        
    }


        const post_content = document.createElement('div')
        father.appendChild(post_content)
        post_content.className = 'post--content'


        const author_name = document.createElement('h2')
        author_name.innerText = dados.user.username
        post_content.appendChild(author_name)

        const content = document.createElement('p')
        post_content.appendChild(content)
        content.innerText = dados.content

        const footer = document.createElement('div')
        father.appendChild(footer)
        footer.className = 'footer'

        const date = document.createElement('p')
        const data = dados.createdAt
        date.innerText = data.substring(0, 10).replaceAll('-','/').split("/").reverse().join("/")
        footer.appendChild(date)

        if (dados.user.id == localStorage.getItem('@blogzinho:UserID')) {
            const button_editar02 = document.createElement('button')
            button_editar02.id = dados.id
            footer.appendChild(button_editar02)
            button_editar02.className = 'button--editar-mobile'
            button_editar02.addEventListener("click", (data) => {
                Post_Manipulations.editing_post(data.target.id)
            })

            

            const button_excluir02 = document.createElement('button')
            footer.appendChild(button_excluir02)
            button_excluir02.className = 'button--excluir-mobile'
            button_excluir02.id = dados.id
            button_excluir02.addEventListener("click", (data) => {
                Post_Manipulations.deleting_post(data.target.id);
            })
        }

    }
}

class Post_Manipulations {

    static new_post() {
        const post = document.getElementsByClassName('post--area')[0]

        Requisition.posting(post.value)

    }

    static async editing_post(id){

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
            Requisition.edit_post(text, id)
          }
    }

    static async deleting_post(id){
        Swal.fire({
            title: 'Quer mesmo deletar?',
            text: "Essa ação não pode ser desfeita!",
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
              Requisition.delet_post(id)
            }
          })
    }


}

Get_Dados.user_dados()

