export class Logout {
    static logoutToIndex() {
        const btnLogout = document.getElementById('btnLogout')


        btnLogout.addEventListener("click", (event) => {

            event.preventDefault()
            localStorage.clear()
            location.assign('../../index.html')
        })
    }


}



