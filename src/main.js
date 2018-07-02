//Declaración de variables para llamar los contenedores de la página de acceso
let loginContainer = document.querySelector("#login-container");
let userName = document.querySelector("#user-name");
let pwd = document.querySelector("#pwd");
let selectCampus = document.querySelector("#select-campus");
let loginButton = document.querySelector("#login-button");

//Declaración de variables para llamar los contenedores de la página inicial del Dashboard
let mainPage = document.querySelector("#main-page");
let selectCampusDashboard1 = document.querySelector("#select-campus-dashboard-1");
let selectCampusDashboard2 = document.querySelector("#select-campus-dashboard-2");
let selectGenerationDashboard1 = document.querySelector("#select-generation-dashboard-1");
let selectGenerationDashboard2 = document.querySelector("#select-generation-dashboard-2");
let exitButton1 = document.getElementById("exit-button-1");
let exitButton2 = document.getElementById("exit-button-2");

//const json = '../data/laboratoria.json';s
const json = 'https://raw.githubusercontent.com/citlallidmg/cdmx-2018-06-bc-core-am-data-dashboard/master/data/laboratoria.json#'

const getData = () => {
    fetch(json)
    .then( response => response.json() )
    .then((res) => {
        const generations = data.computeGenerationsStats(res);
        const campus = data.obtainCampus(res);
        const generationsData = data.obtainGeneration(res);
        //console.log(generation);
        const users = data.computeStudentsStats(res);
        //console.log(users);
        drawCampus(campus);
        data.drawCampusDashboard(campus);
        data.drawGenerationDashboard(generationsData);
        //console.log(generations);
        //return generations;
        
    })
    .catch((error) => {
        console.log(error);
    });
}

getData();

const drawCampus = (sedes) => {
    //const containerCampus = document.getElementById('campus');
    //console.log(sedes);
    sedes.forEach((sede) => {
        const option = document.createElement('option');
        option.innerHTML = sede.toUpperCase();
        selectCampus.appendChild(option);
    });
};

loginButton.addEventListener('click', data.checkLogin);
selectCampusDashboard1.addEventListener('change', data.drawGenerationDashboard);
//selectCampusDashboard2.addEventListener('change', drawGenerationDashboard);

/*
exitButton1.addEventListener('click', exitFunction);
exitButton2.addEventListener('click', exitFunction);
*/

