//Función que obtiene el arreglo de estudiantes y sus estadisticas correspondientes.
window.computeStudentsStats = (laboratoria) => {
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
};

//Función que genera arreglo por generaciones.
window.computeGenerationsStats = (laboratoria) => {
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
};

//Función que filtra estudiantes por nombre.
window.filterStudents = (students, search) => {
  const arrFilterStudent = [];
  students.forEach(student => {
    if (student.name.toLowerCase().indexOf(search.toLowerCase()) != -1) {
      arrFilterStudent.push(student);
    }
  })
  printFilterStudent(arrFilterStudent);
};

window.sortStudents = (students, orderBy, orderDirection) => {

};


window.data = {
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
      let studentsInVenue = welcomeDashboard(name, venue, generation, generations, students);

      getTurno(venue, generation, students);
      getProgress(venue, generation, students, studentsInVenue);
      return [name, venue];

    } else {
      //Regresa una alerta si algún dato no es correcto
      return alert("Alguno de tus datos es incorrecto");
    }
  },
}