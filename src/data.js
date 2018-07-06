window.data = {

//Función que obtiene el arreglo de estudiantes y sus estadisticas correspondientes.
  computeStudentsStats: (laboratoria) => {
    let studentsArray = [];
    let nombreEstudiante;
    let mailEstudiante;
    let porcentajeEstudiante;
    let statusEstudiante;
    let generacionEnSede;
    let topicsEstudiante;
    let turnoEstudiante;
    for (venue in laboratoria) {
      let sede = venue;
      const generations = Object.keys(laboratoria[venue].generacion);
      generations.forEach((generationInVenue) => {
        generacionEnSede = generationInVenue;
        const students = laboratoria[venue].generacion[generationInVenue].estudiantes;
        students.forEach((student) => {
          nombreEstudiante = student.nombre; //Agregamos nombre de estudiante
          mailEstudiante = student.correo; //Agregamos correo de estudiante
          turnoEstudiante = student.turno;
          porcentajeEstudiante = student.progreso.porcentajeCompletado; //Agregamos porcentaje de avance general
          if (porcentajeEstudiante < 60) {
            statusEstudiante = "below"; //Indicamos que esta debajo del 60%
          } else if (porcentajeEstudiante > 90) {
            statusEstudiante = "over"; //Indicamos que esta sobre el 90%
          } else {
            statusEstudiante = "average"; //Indicamos que esta en la media
          };
          const topics = Object.keys(student.progreso.temas);
          for (topic of topics) {
            //La siguiente linea añade los temas como nuevas propiedades del objeto topics y les da como valor que sean un objeto
            let newProperty = Object.defineProperty(student.progreso.temas, topic, { writable: true });
            topicsEstudiante = newProperty;
            valuesTopicsEstudiante = Object.values(topicsEstudiante);
            for (i = 0; i < valuesTopicsEstudiante.length; i++) {
              valuesTopicsEstudiante[i].completedPercentage = valuesTopicsEstudiante[i].porcentajeCompletado;
              let topicProgress = (valuesTopicsEstudiante[i].duracionTemaCompletado * 100) / valuesTopicsEstudiante[i].duracionTema;
              valuesTopicsEstudiante[i].percentageDuration = Math.round(topicProgress);
            };
          };
          studentsArray.push({
            'name': nombreEstudiante, 'email': mailEstudiante, 'campus': sede, 'generation': generacionEnSede, 'turn': turnoEstudiante, 'stats': {
              'status': statusEstudiante, 'completedPercentage': porcentajeEstudiante, 'topics': topicsEstudiante
            }
          });

        });
      });
    }

    return studentsArray;
  },

  
  //Función que genera arreglo por generaciones.
  computeGenerationsStats: (laboratoria) => {
    const generationsArray = [];
    let valueCampus;
    let valueGeneration;
    let valueAverage;
    let valueCount;
    let average;

    for (key in laboratoria) {

      valueCampus = key;
      const generations = Object.keys(laboratoria[key].generacion);
      generations.forEach((generation) => {
        valueGeneration = generation;
        const students = laboratoria[key].generacion[generation].estudiantes;
        average = 0;
        for (student in students) {
          average += students[student].progreso.porcentajeCompletado;
          valueAverage = Math.round(average / students.length);
          valueCount = students.length;
        };
        generationsArray.push({ 'campus': valueCampus, 'generation': valueGeneration, 'average': valueAverage, 'count': valueCount });
      })
    }
    return generationsArray;
  },

  //Función que obtiene los valores de las generaciones.
  obtainCampus: (laboratoria) => {

    const venues = Object.getOwnPropertyNames(laboratoria);
    return venues;
  },


  //Función que obtiene las generaciones.
  obtainGeneration: (laboratoria) => {
    for (key in laboratoria) {
      const generationOption = Object.keys(laboratoria[key].generacion);
      return generationOption;
    }
  },

  //Función para login.
  checkLogin: (sedes, generaciones, generations, students) => {
    let name = userName.value;
    let password = pwd.value;
    let venue = selectCampus.value;
    let generation = selectGeneration.value;

    if (name === "" || password === "" || venue === "Sede" || generation === "Generacion") {

      //Regresa una alerta si no se llenan todos los campos
      return alert(`Oops...
Debes ingresar todos los datos`);

    } else if (name === "usuario" && password === "1234" && venue != "Sede" && generation != "Generacion") {

      loginContainer.style.display = "none";
      mainPage.style.display = "block";

      //Llama a la función que despliega el número de estudiantes activas
      let studentsInVenue = data.welcomeDashboard(name, venue, generation, generations, students);

      data.getTurno(venue,generation,students);
      data.getProgress(venue, generation, students, studentsInVenue);
      return [name, venue];

    } else {
     //Regresa una alerta si algún dato no es correcto
      return alert("Alguno de tus datos es incorrecto");
    }
  },



  //Función que despliega los datos a mostrar en la pantalla de inicio del Dashboard después del login
  welcomeDashboard: (name, sede, generation, generations, students) => {
    document.querySelector("#venue").innerHTML = sede;
    document.querySelector("#generation").innerHTML = `${generation} GENERACIÓN`;
    document.querySelector("#user-1").innerHTML = name.toUpperCase();
    document.querySelector("#user-2").innerHTML = name.toUpperCase();
    let venue = sede.toLowerCase();
    let gen = generation.toLowerCase();
    let estudiantes;
    for (let i = 0; i < generations.length; i++) {
      let campus = generations[i].campus;
      let generacion = generations[i].generation;
      if (campus === venue && generacion === gen) {
        estudiantes = generations[i].count;
      }
    }
    const numberStudents = document.createElement('h3');
    numberStudents.setAttribute('id','student-first-count');
    numberStudents.innerHTML = estudiantes;
    document.getElementById("lista").appendChild(numberStudents);
    return estudiantes;
  },

  //Función que determina el progreso de cada estudiante.
  getProgress: (venue, generation, students, studentsInVenue) => {
    let progressAbove = 0;
    let progressBelow = 0;
    let progressAverage = 0;
    let studentsBelow = [];
    let studentsAverage = [];
    let studentsAbove = [];
    let resultBelow = '';
    let resultAverage = '';
    let resultAbove = '';

    for (let i = 0; i < students.length; i++) {
      if (students[i].campus === venue.toLowerCase() && students[i].generation === generation.toLowerCase() && students[i].stats.status === "below") {
        progressBelow++;
        studentsBelow.push(students[i]);
      } else if (students[i].campus === venue.toLowerCase() && students[i].generation === generation.toLowerCase() && students[i].stats.status === "average") {
        progressAverage++;
        studentsAverage.push(students[i]);
      } else if (students[i].campus === venue.toLowerCase() && students[i].generation === generation.toLowerCase() && students[i].stats.status === "over") {
        progressAbove++;
        studentsAbove.push(students[i]);
      }
    }
    resultBelow = `<div class="progress-bar" id="below-bar" role="progressbar" aria-valuenow="${progressBelow}" aria-valuemin="0" aria-valuemax="${studentsInVenue}" style="width:${(progressBelow * 100) / studentsInVenue}%">
                <p class="bar-text">${progressBelow}/${studentsInVenue}</p>          
              </div>`
    progressBarBelow.innerHTML = resultBelow;
    resultAverage = `<div class="progress-bar" id="average-bar" role="progressbar" aria-valuenow="${progressAverage}" aria-valuemin="0" aria-valuemax="${studentsInVenue}" style="width:${(progressAverage * 100) / studentsInVenue}%">
                <p class="bar-text">${progressAverage}/${studentsInVenue}</p>          
              </div>`
    progressBarAverage.innerHTML = resultAverage;
    resultAbove = `<div class="progress-bar" id="above-bar" role="progressbar" aria-valuenow="${progressAbove}" aria-valuemin="0" aria-valuemax="${studentsInVenue}" style="width:${(progressAbove * 100) / studentsInVenue}%">
                <p class="bar-text">${progressAbove}/${studentsInVenue}</p>          
              </div>`
    progressBarAbove.innerHTML = resultAbove;
  },

  drawCampusDashboard: (sedes, generations) => {
    sedes.forEach((sede) => {
      const option = document.createElement('option');
      option.innerHTML = sede.toUpperCase();
      selectCampusDashboard1.appendChild(option);
    });
    //Crea el dropdown de generaciones en el menú para la versión desktop
    sedes.forEach((sede) => {
      const option = document.createElement('option');
      option.innerHTML = sede.toUpperCase();
      selectCampusDashboard2.appendChild(option);
    });
  },

  drawGenerationDashboard: (generations) => {
    for (let i = 0; i < generations.length; i++) {
      const option = document.createElement('option');
      const textOption = generations[i];
      option.innerHTML = textOption.toUpperCase();
      selectGenerationDashboard1.appendChild(option);
    }
    for (let i = 0; i < generations.length; i++) {
      const option = document.createElement('option');
      const textOption = generations[i];
      option.innerHTML = textOption.toUpperCase();
      selectGenerationDashboard2.appendChild(option);
    }
  },


  sortStudents: (students, orderBy, orderDirection) => {

  },

  filterStudents: (students, search) => {
    const arrFilterStudent = [];
    students.forEach(student => {
      if(student.name.indexOf(search) != -1){
        arrFilterStudent.push(student);
      }
    })
    printFilterStudent(arrFilterStudent);
  },

  //Funcion para comparar turno de estudiante, retorna conteo y arreglo
  getTurno: (venue, generation, students) => {
    let valores = Object.values(students);
    let arrPM = [];
    let arrAM = [];
    let turnoAM = 0;
    let turnoPM = 0;
    for (turn of valores) {
      let minusculasVenue = venue.toLowerCase();
      let minusculasGeneration = generation.toLowerCase();
      if (minusculasVenue === turn.campus) {
        if (turn.generation === minusculasGeneration) {
          if (turn.turn === "PM") {
            arrPM.push({ 'name': turn.name, 'email': turn.email });
            turnoPM++;
          }
          else {
            arrAM.push({ 'name': turn.name, 'email': turn.email })
            turnoAM++;
          }
        }
      };
    }
    let turnoAmBox = document.getElementById("turnoCountAM");
    let turnoPmBox = document.getElementById("turnoCountPM");
    turnoAmBox.innerHTML = turnoAM;
    turnoPmBox.innerHTML = turnoPM;
  }

}