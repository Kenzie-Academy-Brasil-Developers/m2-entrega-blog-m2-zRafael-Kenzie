class Signup {

  static baseUrl = "https://blog-m2.herokuapp.com"
  static token = localStorage.getItem("@blogzinho:token") || ""
  static id = localStorage.getItem('@blogzinho:UserID')|| ''
  static headers = {
      'Content-Type':"application/json",
      Authorization: `Bearer ${this.token}`
  }

    static createNewUser() {
      const nameInput = document.getElementById('name')
      const emailInput = document.getElementById('email')
      const fotoInput = document.getElementById("avatarUrl")
      const passInput = document.getElementById('password')
      const btnSignup = document.getElementById('btnSignup')
  
      btnSignup.addEventListener('click', (event) => {
        event.preventDefault()
  
        const data = {
          username: nameInput.value,
          email: emailInput.value,
          avatarUrl:fotoInput.value,
          password: passInput.value
        }
  
         this.createUser(data)
      })
    }
  
    static async createUser(body) {
      const newUser = await fetch(`${this.baseUrl}/users/register`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(body)
      })
      .then(res => res.json())
      .then(res => { 
          return res
      })
      .catch(err => console.log(err))
  
      return newUser
    }
}

    Signup.createNewUser()