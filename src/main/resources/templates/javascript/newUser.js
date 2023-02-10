// Создание нового пользователя
// const url = "http://localhost:8080/api/new"
const url = "api/new"
const addUserForm = document.querySelector('#newUser')

const addName = document.getElementById('inputName')
const addSurname = document.getElementById('inputSurname')
const addEmail = document.getElementById('inputEmail')
const addPassword = document.getElementById('inputPassword')
const addRole = document.getElementById('inputRole')


addUserForm.addEventListener('submit',
    (e) => {
        e.preventDefault();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: addEmail.value,
                password: addPassword.value,
                name: addName.value,
                surname: addSurname.value,
                email: addEmail.value,
                roles:
                    Array.from(document.getElementById("inputRole"))
                        .filter(option => option.selected)
                        .map(option => option.value)
            })
        }).then(res => res.json())
            .then(data => {
                users = data;
                tableUsers(users);
            })
    })

// const on = (element, event, selector, handler) => {
//     element.addEventListener(event, e => {
//         if (e.target.closest(selector)) {
//             handler(e)
//         }
//     })
// }