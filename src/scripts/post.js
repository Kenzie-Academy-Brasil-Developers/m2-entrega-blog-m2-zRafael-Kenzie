import { ApiRequests } from "./requests.js"






export class ManipularPosts {

    static new_post() {
        const post = document.getElementsByClassName('post--area')[0]

        ApiRequests.posting(post.value)

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
            ApiRequests.edit_post(text, id)
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
              ApiRequests.delet_post(id)
            }
          })
    }


}
export class Build_Posts {

  static creat_card(dados) {

      const ulpost = document.querySelector('.ul-post')

      dados.data.forEach(element => {
          const post_card = document.createElement('li')
          ulpost.appendChild(post_card)
          post_card.className = 'post--card' // coloca a class da li aqui <<<

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



      // Caso vc queira utilizar a parte de 2 botoes
      // if (dados.user.id == localStorage.getItem('Id')) {
      //     const button_editar02 = document.createElement('button')
      //     button_editar02.id = dados.id
      //     footer.appendChild(button_editar02)
      //     button_editar02.className = 'button--editar-02'
      //     button_editar02.addEventListener("click", (data) => {
      //         ManipularPosts.editing_post(data.target.id)
      //     })

          

      //     const button_excluir02 = document.createElement('button')
      //     footer.appendChild(button_excluir02)
      //     button_excluir02.className = 'button--excluir-02'
      //     button_excluir02.id = dados.id
      //     button_excluir02.addEventListener("click", (data) => {
      //         ManipularPosts.deleting_post(data.target.id);
      //     })
     // }

  }
}