// Таблица пользователей
const tableUsers = (users) => {
    output = '', users.forEach(user => {
        output += `
              <tr>
                <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.surname}</td>
              <td>${user.username}</td>
              <td>${user.roles.map(role => role.roleName === "ROLE_USER" ? "USER" : "ADMIN")}</td>
              <!-- Кнопка-триггер модального окна Edit-->
                <td>
                    <button type="button" data-userid="${user.id}" data-action="edit" 
                    class="btn btn-info" data-bs-toggle="modal" data-bs-target="modal" id="editButton" data-id="${user.id}">Edit</button>
                </td>
                <!-- Кнопка-триггер модального окна Delete-->
                <td>
                    <button type="button" class="btn btn-danger" id="deleteUser" data-action="delete" data-id="${user.id}"
                     data-bs-toggle="modal" data-bs-target="modal">Delete</button>
                </td>
                </tr>`
    })
    info.innerHTML = output;

}

let users = [];
const updateUser = (user) => {
    const foundIndex = users.findIndex(x => x.id == user.id);
    users[foundIndex] = user;
    tableUsers(users);
    console.log('users');
}
const removeUser = (id) => {
    users = users.filter(user => user.id != id);
    console.log(users)
    tableUsers(users);
}

// получение всех пользователей
const info = document.querySelector('#allUsers');
const url = "http://localhost:8080/api/admin"

fetch(url, {mode: 'cors'})
    .then(res => res.json())
    .then(data => {
        users = data;
        tableUsers(data)
    })

//Страница пользователя
const url1 = 'http://localhost:8080/api/user'
const user = document.querySelector('#userPage')
const header = document.querySelector('#topPanel')

fetch(url1)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        header.innerHTML = `<strong><span class="navbar-text-xl text-white text-start" >${data.username}</span></strong>
                <span class="navbar-text-xl text-white text-start">&nbsp with roles: &nbsp</span>
                <span class="navbar-text-xl text-white text-start" >${data.roles.map(role => role.roleName === 'ROLE_ADMIN' ? 'ADMIN' : 'USER')} </span>`;
        user.innerHTML = `
              <td>${data.id}</td>
              <td>${data.name}</td>
              <td>${data.surname}</td>
              <td>${data.username}</td>
              <td>${data.roles.map(role => role.roleName === 'ROLE_ADMIN' ? 'ADMIN' : 'USER')}</td>
                                  `
    })

// Создание нового пользователя
const addUserForm = document.querySelector('#nav-profile')

const addName = document.getElementById('inputName')
const addSurname = document.getElementById('inputSurname')
const addEmail = document.getElementById('inputEmail')
const addPassword = document.getElementById('inputPassword')
const addRole = document.getElementById('inputRole')


addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            username: addEmail.value,
            password: addPassword.value,
            name: addName.value,
            surname: addSurname.value,
            email: addEmail.value,
            roles: Array.from(document.getElementById("inputRole"))
                .filter(option => option.selected)
                .map(option => option.value)
        })
    }).then(res => res.json())
        .then(data => {
            users = data;
            tableUsers(users);
        })
    $("#nav-home-tab").submit()
})

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}


// Редактирование пользователя
on(document, 'click', '#editButton', e => {
    const userInfo = e.target.parentNode.parentNode
    document.getElementById('eId').value = userInfo.children[0].innerHTML
    document.getElementById('editName').value = userInfo.children[1].innerHTML
    document.getElementById('editSurname').value = userInfo.children[2].innerHTML
    document.getElementById('editEmail').value = userInfo.children[3].innerHTML
    // document.getElementById('editPassword').value = userInfo.children[4].innerHTML
    document.getElementById('editRoleID').value = userInfo.children[4].innerHTML

    $("#modalEdit").modal("show")
})

const editUserForm = document.querySelector('#modalEdit')
editUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(document.getElementById('editRoleID').values)
    console.log(Object.values(document.getElementById('editRoleID')))


    fetch(url, {

        method: 'PUT', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            id: document.getElementById('eId').value,
            username: document.getElementById('editEmail').value,
            name: document.getElementById('editName').value,
            surname: document.getElementById('editSurname').value,
            email: document.getElementById('editEmail').value,
            password: document.getElementById('editPassword').value,
            roles: Array.from(document.getElementById("editRoleID"))
                .filter(option => option.selected)
                .map(option => option.value)

        })
    })
        .then(res => res.json()).then(data => updateUser(data))
        .catch((e) => console.error(e))

    $("#modalEdit").modal("hide")
})

// Удаление пользователя
let currentUserId = null;
const deleteUserForm = document.querySelector('#modalDelete')
deleteUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch('http://localhost:8080/api/admin' + currentUserId, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            removeUser(currentUserId);
            deleteUserForm.removeEventListener('submit', () => {
            });
            $("#modalDelete").modal("hide")
        })
})

on(document, 'click', '#deleteUser', e => {
    const fieldDelete = e.target.parentNode.parentNode
    currentUserId = fieldDelete.children[0].innerHTML

    document.getElementById('userId').value = fieldDelete.children[0].innerHTML
    document.getElementById('dName').value = fieldDelete.children[1].innerHTML
    document.getElementById('dSurname').value = fieldDelete.children[2].innerHTML
    document.getElementById('dEmail').value = fieldDelete.children[3].innerHTML
    document.getElementById('roleID').value = fieldDelete.children[4].innerHTML

    $("#modalDelete").modal("show")
})