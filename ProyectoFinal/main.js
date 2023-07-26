// Pegar aquí tu apikey o CDN de firebase
const firebaseConfig = {
  apiKey: "AIzaSyAxWACvsmaTVOFWDRJ1E-nivdPpdClO-K4",
  authDomain: "proyecto2-9aad8.firebaseapp.com",
  projectId: "proyecto2-9aad8",
  storageBucket: "proyecto2-9aad8.appspot.com",
  messagingSenderId: "250671648679",
  appId: "1:250671648679:web:3340a54f7004487e5e3082",
  measurementId: "G-434EF2JL8P"

};

// Initialize Firebase//
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const auth = firebase.auth();
const db = firebase.firestore();



//llamamos al dom o al html//
const btnRegistrar = document.getElementById("btnRegistrar");
const btnIniciarSesion = document.getElementById("btnIniciarSesion");
const Formulario = document.getElementById("Formulario");
let contenidoDeLaWeb = document.getElementById("contenidoDeLaWeb");
const btnCS = document.getElementById("btnCS");
const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");
// const verDatosEnPantalla=document.getElementById("verDatosEnPantalla");




//a los botones se les pone const no cambia de valor//
//funcion registrar//
btnRegistrar.addEventListener("click", () => {
  //le damos funciones y remplamos con =>//
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log("Hola");
  console.log(email);
  console.log(password);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      //iniciamos el sesion//
      // Signed in
      var user = userCredential.user;
      console.log("Inicio de sesion correcto");
      cargarJSON();
      DatosEnPantalla();
      Formulario.classList.replace("mostrar", "ocultar"); //se va ocultar//
      contenidoDeLaWeb.classList.replace("ocultar", "mostrar"); //se va mostrar//
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(errorMessage);
      // ..
    });
});

//funcion de iniciar sesion//
btnIniciarSesion.addEventListener("click", () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Inicio de Sesion");
      cargarJSON();
     DatosEnPantalla();
      Formulario.classList.replace("mostrar", "ocultar");
      contenidoDeLaWeb.classList.replace("ocultar", "mostrar");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error al inicio secion");
      alter(errorMessage);
    });
});

//Cerrar sesion//
btnCS.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("se cerro");
    })
    .catch((error) => {
      // An error happened.
      console.log("error");
    });
});

//funcion estado activo o inactivo//
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    cargarJSON();
    DatosEnPantalla();
    var uid = user.uid;
    Formulario.classList.replace("ocultar", "mostrar");
    contenidoDeLaWeb.classList.replace("mostrar", "ocultar");

    // ...
  } else {
    // User is signed out
    // ...
    Formulario.classList.replace("ocultar", "mostrar");
    contenidoDeLaWeb.classList.replace("mostrar", "ocultar");
  }
});

//funcion de google
btnGoogle.addEventListener("click", () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log("Login con Google correcto");
      cargarJSON();
      DatosEnPantalla();
      var user = result.user;
    })
    .catch((error) => {
      var errorMessage = error.message;
      alert(errorMensaje);
      var email = error.email;
      var credential = error.credential;
      console.log("error al ingresar");
      // ...
    });
});

//funcion jalar datos json
function cargarJSON() {
  fetch("data.json")
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let html = "";
      data.forEach((productos) => {
        html += `
          <div class="producto">
      <p>  ${productos.marca} </p>
      <img src="${productos.img}" width="200px" class="imgProducto">
      <br>
      <strong> S/.${productos.precio} </strong>
      <br>
      <a href="${productos.webpage}"> ver detalles</a>
      </div>
  `;
      });
      document.getElementById("resultado").innerHTML = html;
    });
}
//funcion publicar o agregar  datos 
btnPublicar.addEventListener('click', () => {
  db.collection("comentarios").add({
    Titulo :txtTitulo=document.getElementById('txtTitulo').value,
    Descripcion : txtDescripcion=document.getElementById('txtDescripcion').value,
    
  })
    .then((docRef) => {
      console.log("Se guardo tu comentario correctamente");
      alert("Se guardo tu comentario correctamente");


      //imprimir comentario en pantalla
    })
    .catch((error) => {
      console.error("Error al enviar tu comentario ", error);
    });

})

//funcion leer datos de  firestore mejorado
function DatosEnPantalla() {
db.collection("comentarios").get().then((querySnapshot)=>{
  let html='';
  querySnapshot.forEach((doc)=>{
    console.log(`${doc.data().titulo}`);
    console.log(`${doc.data().descripcion}`);
    var listarDatos=`
    <li class="listarDatos">
    <h5 class="listarDatosH5"> ${doc.data().Titulo}</h5>
      <p> ${doc.data().Descripcion} </p>
      </li>
    
    `;
    html+= listarDatos;
    }); document.getElementById('verDatosEnPantallaTexto').innerHTML=html;
});

}


// funcion Agregar datos de firestore
 btnPublicar.addEventListener('click', () => {
  fs.collection("comentarios").add({
      titulo: txtTitulo = document.getElementById('txtTitulo').value,
      descripcion: txtDescripcion = document.getElementById('txtDescripcion').value,
  })
      .then((docRef) => {
          console.log("Se guardó correctamente");
          DatosEnPantalla();
      })
      .catch((error) => {
          console.error("Error al Guardar");
      });
})

function DatosEnPantalla() {
  db.collection("comentarios").get().then((querySnapshot) => {
      let html = '';
      querySnapshot.forEach((doc) => {
          console.log(`${doc.data().titulo}`);
          console.log(`${doc.data().descripcion}`);
          var listarDatos = `
             <li class="listarDatos"> 
                  <h5 class="listarDatosH5"> ${doc.data().titulo} </h5>
                  <p> ${doc.data().descripcion} </p>
             </li>
          `;
          html += listarDatos;
      }); document.getElementById('verDatosEnPantalla').innerHTML = html;
  });
}
