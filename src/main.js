//Declaración de variables para llamar los contenedores de la página de acceso
let loginContainer = document.querySelector("#login-container");
let userName = document.querySelector("#user-name");
let pwd = document.querySelector("#pwd");
let selectCampus = document.querySelector("#select-campus");
let selectGeneration = document.querySelector("#select-generation")
let loginButton = document.querySelector("#login-button");

//Declaración de variables para llamar los contenedores de la página inicial del Dashboard
let mainPage = document.querySelector("#main-page");
let selectCampusDashboard1 = document.querySelector("#select-campus-dashboard-1");
let selectCampusDashboard2 = document.querySelector("#select-campus-dashboard-2");
let selectGenerationDashboard1 = document.querySelector("#select-generation-dashboard-1");
let selectGenerationDashboard2 = document.querySelector("#select-generation-dashboard-2");
let exitButton1 = document.getElementById("exit-button-1");
let exitButton2 = document.getElementById("exit-button-2");
const progressBarBelow = document.getElementById("progress-bar-below");
const progressBarAverage = document.getElementById("progress-bar-average");
const progressBarAbove = document.getElementById("progress-bar-above");
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search");
let cajaDatosFiltrados = document.getElementById("data-section");
const changeData = document.getElementById("select2");



//Constante que guarda archivo json.
const json = 'https://raw.githubusercontent.com/citlallidmg/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json#'


//Función que obtiene data del archivo y pasa los datos a otras funciones.
const getData = () => {
    fetch(json)
        .then(response => response.json())
        .then((res) => {

            const campus = data.obtainCampus(res);
            const generationsData = data.obtainGeneration(res);
            const generations = data.computeGenerationsStats(res);
            const students = data.computeStudentsStats(res);
            drawCampus(campus, generationsData, generations, students);
            data.drawCampusDashboard(campus);
            data.drawGenerationDashboard(generationsData);
            getSearch(students);
            changeDashboard(generations, students);

        })
        .catch((error) => {
            console.log(error);
        });
}


//Llamada a funcion para obtener data.
getData();

//Función que desplega opciones de campus y generaciones.
const drawCampus = (sedes, generaciones, generations, students) => {
    sedes.forEach((sede) => {
        const option = document.createElement('option');
        option.innerHTML = sede.toUpperCase();
        selectCampus.appendChild(option);
        selectCampus.addEventListener('change', quitDisabled);
    });

    generaciones.forEach((generacion) => {

        const option = document.createElement('option');
        option.innerHTML = generacion.toUpperCase();
        selectGeneration.appendChild(option);
    })

    loginButton.addEventListener('click', () => data.checkLogin(sedes, generaciones, generations, students)); //No es la mejor opción
};

const quitDisabled = () => {
    selectGeneration.disabled = false;
};


//Función que obtiene dato de búsqueda.
const getSearch = (students) => {
    let searchString = "";
    searchButton.addEventListener('click', (event) => {
        searchString = searchText.value;
        data.filterStudents(students, searchString);
    });
};


//Función que imprime datos del arreglo resultante de la búsqueda.
const printFilterStudent = (arrFilterStudent) => {
    let campus = selectCampus.value.toLowerCase();
    let generation = selectGeneration.value.toLowerCase();
    console.log(arrFilterStudent);

    cajaDatosFiltrados.innerHTML = "";
    let studentMatch = " ";

    for (i = 0; i < arrFilterStudent.length; i++) {
        if (campus === arrFilterStudent[i].campus && generation === arrFilterStudent[i].generation) {
            console.log(arrFilterStudent[i]);
            studentMatch += `<div class="well" id="card">
                                <div class="info">
                                    <h3 id="name">Nombre: ${arrFilterStudent[i].name}</h3>
                                    <p>Correo: ${arrFilterStudent[i].email}</p>
                                    <p>Turno: ${arrFilterStudent[i].turn}</p>
                                    <p>Status: ${arrFilterStudent[i].stats["status"]}</p>
                                    <p>Porcentaje Completado: ${arrFilterStudent[i].stats.completedPercentage}</p>
                            </div>
                        </div>`
        }

        if (studentMatch == " ") {
            cajaDatosFiltrados.innerHTML = `<div class="well" id="card">
                                                <div class="info">
                                                    <h1>No hay coincidencias</h1>
                                                </div>
                                            </div>`
        }
        else {
            cajaDatosFiltrados.innerHTML = studentMatch;
        };
    };


    const changeDashboard = (generations, students) => {

        changeData.addEventListener('click', () => {
            let newCampus = (selectCampusDashboard2.value).toLowerCase();
            let newGeneration = (selectGenerationDashboard2.value).toLowerCase();
            document.querySelector("#venue").innerHTML = newCampus.toUpperCase();
            document.querySelector("#generation").innerHTML = `${newGeneration.toUpperCase()} GENERACIÓN`;
            let estudiantes;
            for (let i = 0; i < generations.length; i++) {
                let campus = generations[i].campus;
                let generacion = generations[i].generation;
                if (campus === newCampus && generacion === newGeneration) {
                    estudiantes = generations[i].count;
                }
            }
            let numberStudents = document.getElementById('student-first-count');
            numberStudents.innerHTML = " ";
            numberStudents.innerHTML = estudiantes;
            data.getTurno(newCampus, newGeneration, students);
            data.getProgress(newCampus, newGeneration, students, estudiantes);
            return estudiantes;
        });
    }
}