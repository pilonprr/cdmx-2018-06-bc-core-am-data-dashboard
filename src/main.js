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
//let barText = document.getElementById("bar-text");

//const json = '../data/laboratoria.json';s
const json = 'https://raw.githubusercontent.com/citlallidmg/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json#'

const getData = () => {
    fetch(json)
        .then(response => response.json())
        .then((res) => {

            const campus = data.obtainCampus(res);
            const generationsData = data.obtainGeneration(res);

            const generations = data.computeGenerationsStats(res);
            //console.log(generations);
            const students = data.computeStudentsStats(res);
            drawCampus(campus, generationsData, generations, students);

            //console.log(students);

            data.drawCampusDashboard(campus);
            data.drawGenerationDashboard(generationsData);
            //drawDataDashboard(generations,students);
            //console.log(generations);
            //return generations;

        })
        .catch((error) => {
            console.log(error);
        });
}

getData();

const drawCampus = (sedes, generaciones, generations, students) => {
    //const containerCampus = document.getElementById('campus');
    //console.log(sedes);
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