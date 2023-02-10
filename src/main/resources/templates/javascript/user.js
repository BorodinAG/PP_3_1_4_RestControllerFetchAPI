const url = 'http://localhost:8080/api/user'
const header = document.querySelector('#head')
const user = document.querySelector('#User')

fetch("/api/user")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        header.innerHTML = `<strong><span class="navbar-text-xl text-white text-start" >${data.username}</span></strong>
        <span class="navbar-text-xl text-white text-start">&nbsp with roles: &nbsp</span>
        <span class="navbar-text-xl text-white text-start" >${data.roles.map(role => role.name === 'ROLE_ADMIN' ? 'ADMIN' : 'USER')} </span>`;
        user.innerHTML = `
              <td>${data.id}</td>
              <td>${data.name}</td>
              <td>${data.surname}</td>
              <td>${data.username}</td>
              <td>${data.roles.map(role => role.name= 'ROLE_ADMIN' ? 'ADMIN' : 'USER')}</td>
                                  `
    })