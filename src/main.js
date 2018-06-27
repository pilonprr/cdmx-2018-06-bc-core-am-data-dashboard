data.getData();




/*Funcion para bajar data y poder manipularla.
const getData = () => {
    let url = 'https://raw.githubusercontent.com/jetzable/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json';     
 
    fetch( url ).then( resp => resp.json() )
        .then(data => {
            sede = Object.getOwnPropertyNames(data);
            generacion = Object.values(data);
            console.log(sede);
            console.log(generacion);

            //Función imprime estudiantes y correo.
            generacion.forEach(element => {
                console.log(element.generacion.cuarta.estudiantes);
                let studentPerGeneration = element.generacion.cuarta.estudiantes;
                studentPerGeneration.forEach(element =>{
                    console.log(element.nombre);
                    let arr = [element.nombre,element.correo];
                    console.log(arr);
                    let parrafoEstudiante = document.createElement("p");
                    let newContent = document.createTextNode(arr);
                    parrafoEstudiante.appendChild(newContent);
                    caja.appendChild(parrafoEstudiante);

                })
            })
        })
    }
getData();  //Lllama a funcion que obtiene data.*/




//---------------------ELEMENTOS DE INTERFAZ----------------------------


//Declaración de variables para llamar los contenedores de la página de acceso
let loginContainer = document.querySelector("#login-container");
let userName = document.querySelector("#user-name");
let pwd = document.querySelector("#pwd");
let selectVenue = document.querySelector("#select-venue");
let loginButton = document.querySelector("#login-button");
console.log(userName);
console.log(pwd);
console.log(selectVenue);
console.log(loginButton);

//Declaración de variables para llamar los contenedores de la página principal del Dashboard
let mainPage = document.querySelector("#main-page");

//Indica que acción realizar al recibir los datos de la forma de login
loginButton.addEventListener("click", function(){
    checkDataLogin(); 
})

//Compara los datos de acceso para validar al usuario
let checkDataLogin = () => {
    let name = userName.value;
    let password = pwd.value;
    let venue = selectVenue.value;
    console.log(name);
    console.log(password);
    console.log(venue);

    if(name === ""  || password === "" || venue === undefined){
        return alert(`Oops...
Debes ingresar todos los datos`);
    }else if(name === "TM" || password === "1234" || venue === "LIMA"){
        loginContainer.style.display = "none";
        mainPage.style.display = "block";
        console.log(name);
        console.log(password);
        console.log(venue);

        //agregamos esta línea para poder llamar los valores después
        return [name,venue];

    }else{
        return alert("Alguno de tus datos es incorrecto");
    }
}



//--------------------FIN DE ELEMENTOS DE INTERFAZ-------------