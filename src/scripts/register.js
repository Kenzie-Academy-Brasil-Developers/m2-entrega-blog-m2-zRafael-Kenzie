import { ApiRequests } from "./requests"

class Signup {

    static createNewUser() {
      const nameInput = document.getElementById('name')
      const emailInput = document.getElementById('email')
      const fotoInput = document.getElementById("avatarUrl")
      const passInput = document.getElementById('password')
      const btnSignup = document.getElementById('btnSignup')
  
      btnSignup.addEventListener('click', async (event) => {
        event.preventDefault()
  
        const data = {
          username: nameInput.value,
          email: emailInput.value,
          avatarUrl:fotoInput.value,
          password: passInput.value
        }
  
        await ApiRequests.createUser(data)
      })
    }}
