function registrar() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('contrasena').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
        verificar()
    })
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
    });
}

function ingreso() {
    var email = document.getElementById('email2').value;
    var password = document.getElementById('contrasena2').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
    });
}

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Si existe');
            aparece(user);
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            console.log('**************');
            console.log(emailVerified);
            console.log('**************');
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            console.log('No existe');
            contenido.innerHTML = ``;
            // ...
        }
    });
}

function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
    if(user.emailVerified){
        contenido.innerHTML = `
        <div class="container mt-5">
            <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Bienvenido ${user.email}!</h4>
            <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
            <hr>
            <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
            </div>
            <button onclick="cerrar()" class="btn btn-danger">Cerrar sesión</button>
        </div>
        `;
    }
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('Saliendo...');
    })
    .catch(function(error){
        console.log(error);
    });
}

function verificar(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log('Enviando correo...');
    }).catch(function(error) {
      // An error happened.
      console.log('Error al envíar correo...');
    });
}

observador();