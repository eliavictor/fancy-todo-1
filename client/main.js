const baseUrl = 'http://localhost:3000'


$(document).ready(function() {
    if (localStorage.token) {
        isLogin()
    } else {
        $('#signout').hide()
        $('#main').hide()
        $('#signupForm').hide()
        $('#signinForm').hide()
        $('#addTodo').hide()
        $('#name').hide()
        $('#page-title').hide()
        $('#addForm').hide()
        $('#editForm').hide()
    }

    $('#editCancel').click(function() {
        event.preventDefault()
        isLogin()
    })

    $('#editSubmit').click(function() {
        let id = localStorage.getItem('idTodo')
        console.log(id)
        let titleItem = $('#titleEdit').val()
        let descItem = $('#descriptionEdit').val()
        let statusItem = $('#sel2').val()
        let dateItem = $('#datepickerEdit').val()
        $.ajax({
            url: `${baseUrl}/todos/${id}`,
            type: 'put',
            data: {
                title: titleItem,
                description: descItem,
                status: statusItem,
                duedate: dateItem
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(data => {
            console.log('SUKSES MENGEDIT DATA')
            isLogin()
        })
        .fail(error => {
            console.log(error)
        })
    })

    $('#addSubmit').click(function() {
        event.preventDefault()
        let titleItem = $('#titleAdd').val()
        let descItem = $('#descriptionAdd').val()
        let statusItem = $('#sel1').val()
        let dateItem = $('#datepickerAdd').val()
        $.ajax({
            url: `${baseUrl}/todos`,
            type: 'post',
            data: {
                title: titleItem,
                description: descItem,
                status: statusItem,
                duedate: dateItem,
                token: localStorage.getItem('token')
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done(data => {
            console.log('SUKSES MENAMBAHKAN TO-DO')
            event.preventDefault()
            isLogin()
        })
        .fail(error => {
            console.log(error)
        })   
    })

    $('#addTodo').click(function() {
        event.preventDefault()
        addTo()
    })

    $('#signinBtn').click(function() {
        event.preventDefault()
        $('#title').hide()
        $('#signupForm').hide()
        $('#signinForm').show()
        $('#homeBeforeLogin').hide()
    })

    $('#signupBtn').click(function() {
        event.preventDefault()
        $('#title').hide()
        $('#signinForm').hide()
        $('#signupForm').show()
        $('#homeBeforeLogin').hide()
    })

    $('#signinSubmit').click(function() {
        event.preventDefault()
        let emailItem = $('#emailSignin').val()
        let passwordItem = $('#passwordSignin').val()
        // console.log(emailItem, passwordItem, 'AAAAAAAAA')
        $.ajax({
            url: `${baseUrl}/users/signin`,
            type: 'post',
            data: {
                email: emailItem,
                password: passwordItem
            }
        })
        .done(data => {
            localStorage.setItem(`id`, data.userId)
            localStorage.setItem(`token`, data.token)
            localStorage.setItem(`name`, data.name)
            isLogin()
        })
        .fail(error => {
            console.log(error)
        })
    })

    $('#gsignin').click(function() {
        event.preventDefault()
        isLogin()   
    })

    $('#signout').click(function() {
        event.preventDefault()
        $('#signupForm').hide()
        $('#signinForm').hide()
        $('#signupBtn').show()
        $('#signinBtn').show()
        $('#homeBeforeLogin').show()
        $('#main').hide()
        $('#signout').hide()
        $('#name').hide()
        $('#gsignin').show()
        $('#page-title').hide()
        $('#title').show()
        $('#addTodo').hide()
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        signOut()        
    })

    $('#signupSubmit').click(function() {
        event.preventDefault()
        $('#signout').hide()
        $('#main').hide()
        $('#signupForm').hide()
        $('#signinForm').show()
        $('#addTodo').hide()
        $('#name').hide()
        $('#page-title').hide()
        let nameItem = $('#nameSignup').val()
        let emailItem = $('#emailSignup').val()
        let passwordItem = $('#passwordSignup').val()
        // console.log(email, password, 'AAAAAAAAA')
        $.ajax({
            url: `${baseUrl}/users/signup`,
            type: 'post',
            data: {
                name: nameItem,
                email: emailItem,
                password: passwordItem
            }
        })
        .done(data => {
            console.log('SUKSES REGISTER')
        })
        .fail(error => {
            console.log(error)
        })
    })

    $('#addCancel').click(function() {
        event.preventDefault()
        isLogin()
    })
})

function addTo() {
    loginClear()
    $('#addForm').show()
}

function deleteTodo(id) {
    // console.log('MASUK FUNCTION DELETE')
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        type: 'delete',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(data => {
        console.log('SUKSES MENGHAPUS DATA')
        loginClear()
        isLogin()
    })
    .fail(error => {
        console.log(error)
    })
}

function editTodo(id) {
    $.ajax({
        url: `${baseUrl}/todos/${id}`,
        type: 'get',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(data => {
        $('#titleEdit').val(`${data.title}`)
        $('#descriptionEdit').val(`${data.description}`)
        $('#sel2').val(`${data.status}`)
        $('#datepickerEdit').val(`${data.duedate}`) 
        loginClear()
        localStorage.setItem(`idTodo`, data._id)
        $('#editForm').show()
    })
    .fail(error => {
        console.log(error)
    })
}

function retrieveTodo() {
    $.ajax({
        url: `${baseUrl}/todos`,
        type: 'get',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done(data => {
        document.getElementById("name").innerHTML = localStorage.name;
        // $('#main').show()
        $.each(data, function(i, todos) {
        $('#main').append(`
            <div class="card bg-light text-dark col-10">
                <div class="row">
                    <div class="card-body col-12" style="font-weight: bold; font-size: 20px;"><i class='fas fa-dot-circle'></i> ${todos.title}</div>
                    <div class="card-body col-3" style="font-weight: bold; font-size: 14px; margin-top: -2.5%; margin-left: 1.7%;">Description: ${todos.description}</div>
                    <div class="card-body col-3" style="font-weight: bold; font-size: 14px; margin-top: -2.5%;">Status : ${todos.status}</div>
                    <div class="card-body col-3" style="font-weight: bold; font-size: 14px; margin-top: -2.5%;">Due Date : ${todos.duedate}</div>
                    <button onclick="editTodo('${todos._id}')" class="card-body col-1 btn btn-link" style="font-weight: bold; font-size: 20px; margin-top: -5%; text-align:right; color:black;"><i class='fas fa-edit'></i></button>
                    <button onclick="deleteTodo('${todos._id}')" class="card-body col-1 btn btn-link" style="font-weight: bold; font-size: 20px; margin-top: -5%; text-align:right; color:black;"><i class='fas fa-trash'></i></button>
                </div>
            </div>
            <br>
        `)
        })
    })
    .fail(error => {
        console.log(error)
    })
}

function onSignIn(googleUser) {
    const idToken= googleUser.getAuthResponse().id_token
    $.ajax({
        url: `${baseUrl}/users/gsignin`,
        type: 'post',
        data: {
           idToken
        }
    })
    .done(function(data){
        localStorage.setItem('id', data.id)
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        isLogin()
    })
    .fail(function(err){
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function isLogin() {
    $('#main').empty()
    $('#main').show()
    retrieveTodo()
    $('#title').hide()
    $('#editForm').hide()
    $('#signup').hide()
    $('#signin').hide()
    $('#signinBtn').hide()
    $('#signupBtn').hide()
    $('#signupForm').hide()
    $('#signinForm').hide()
    $('#homeBeforeLogin').hide()
    $('#addTodo').show()
    $('#signout').show()
    $('#addForm').hide()
    $('#page-title').show()
    $('#name').show()
}

function loginClear() {
    $('#editForm').hide()
    $('#addForm').hide()
    $('#signup').hide()
    $('#signin').hide()
    $('#signinBtn').hide()
    $('#signupBtn').hide()
    $('#signupForm').hide()
    $('#signinForm').hide()
    $('#homeBeforeLogin').hide()
    $('#gsignin').hide()
    $('#main').hide()
    $('#signout').show()
    $('#addTodo').hide()
    $('#name').show()
    $('#page-title').hide()
}