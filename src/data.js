window.data = {
  
  
  computeStudentsStats: (laboratoria) => {
  let studentsArray = [];
  let nombreEstudiante;
  let mailEstudiante;
  let porcentajeEstudiante;
  let statusEstudiante;
  let generacionEnSede;
  let turnoEstudiante;
  for(venue in laboratoria){
    let sede = venue; 
    const generations = Object.keys(laboratoria[venue].generacion); 
    generations.forEach((generationInVenue) => {
     generacionEnSede = generationInVenue;
      const students = laboratoria[venue].generacion[generationInVenue].estudiantes;
      students.forEach((student) => {
        nombreEstudiante = student.nombre; //Agregamos nombre de estudiante
        mailEstudiante = student.correo; //Agregamos correo de estudiante
        turnoEstudiante = student.turno; //Agregamos turno de estudiante
        porcentajeEstudiante = student.progreso.porcentajeCompletado; //Agregamos porcentaje de avance general
        let progress = porcentajeEstudiante;
        if (progress < 60) {
          statusEstudiante = "below"; //Indicamos que esta debajo del 60%
        } else if (progress > 90) {
          statusEstudiante = "over"; //Indicamos que esta sobre el 90%
        } else {
          statusEstudiante = "average"; //Indicamos que esta en la media
        };
        let subCompletedPercentage
      const topics = Object.values(student.progreso.temas);
      topics.forEach(topic => {
        topic.completedPercentage = topic.porcentajeCompletado;
        topic.percentageDuration = Math.round(((topic.duracionTemaCompletado *100) / topic.duracionTema));
        topic.subtopics = topics.forEach((subtemas) => {
          let nameSubtopic = Object.values(topic.subtemas);
          //let subNames = Object.getOwnPropertyNames();
        //console.log(subNames);
          nameSubtopic.forEach((propiedad) => {
            subCompletedPercentage = propiedad.completado;
            subType = propiedad.tipo;
            subDuration = propiedad.duracionSubtema;
            //console.log(subType);
          })
        }) 
      });
    
      studentsArray.push({'name': nombreEstudiante,'email': mailEstudiante, 'campus': sede, 'generation': generacionEnSede, 'turno': turnoEstudiante, 'stats':{'status': statusEstudiante, 'completedPercentage': porcentajeEstudiante, 'topic': { 'completedPercentage': subCompletedPercentage, 'type': subType, 'duration': subDuration
      }}});
        
      });
    });
  }
  console.log(studentsArray);
  return studentsArray;
  
},

computeGenerationsStats: (laboratoria) => {

  const generationsArray = [];
  const obj = {

    campus: '',
    generation: '',
    average: 0,
    count: 0,

  };
  let valueCampus;
  let valueGeneration;
  let valueAverage;
  let valueCount;
  let average = 0;
  for (key in laboratoria) {
  
    valueCampus = key;
    average = 0;
    const generations = Object.keys(laboratoria[key].generacion);
    //console.log(generations);
    generations.forEach((generation) => {
   
      valueGeneration = generation;
      const students = laboratoria[key].generacion[generation].estudiantes;
      //console.log(students);
      
      for (student in students) {
   
        average += students[student].progreso.porcentajeCompletado;
        valueAverage = Math.round(average / students.length);
        valueCount = students.length;      
      };
      generationsArray.push({'campus':valueCampus,'generation': valueGeneration, 'average': valueAverage, 'count': valueCount});            
    })        
  }
  //console.log(generationsArray);
  return generationsArray;
  
},

obtainCampus: (laboratoria) => {

  const venues = Object.getOwnPropertyNames(laboratoria);
  //console.log(venues); 
  return venues;

},

obtainGeneration: (laboratoria) => {
  //console.log(laboratoria);
  //const generations = Object.getOwnPropertyNames(laboratoriasedes);
  //console.log(generations);
  for (key in laboratoria) {
    const generationOption = Object.keys(laboratoria[key].generacion);
    //console.log(generationOption);
    return generationOption;
  }
},

checkLogin: () => {

  //console.log("Listo");
  let name = userName.value;
  let password = pwd.value;
  let venue = selectCampus.value;
  //console.log(name);
  //console.log(password);
  //console.log(venue);

  if(name === ""  || password === "" || venue === "Sede"){

    //Regresa una alerta si no se llenan todos los campos
    return alert(`Oops...
Debes ingresar todos los datos`);

  }else if(name === "usuario" && password === "1234"){
  
    loginContainer.style.display = "none";
    mainPage.style.display = "block";
    //console.log(name);
    //console.log(password);
    //console.log(venue);

    //Llama a la función que despliega el número de estudiantes activas
    welcomeDashboard(name,venue);

    //agregamos esta línea para poder llamar los valores después
    return [name,venue];

  }else{
  
    //Regresa una alerta si algún dato no es correcto
    return alert("Alguno de tus datos es incorrecto");
    
  }

},

//Función que despliega los datos a mostrar en la pantalla de inicio del Dashboard después del login
welcomeDashboard: (name,venue) =>{
  document.querySelector("#venue").innerHTML = venue;
  document.querySelector("#generation").innerHTML = "5a generación";
  document.querySelector("#user").innerHTML = name.toUpperCase();
  //drawCampusDashboard(sedes);
},

drawCampusDashboard: (sedes) => {
  //const containerCampus = document.getElementById('campus');
  //Crea el dropdown de generaciones en el menú para la versión móvil
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
  //console.log(generations);
  //console.log("entramos");
  for(let i=0; i< generations.length; i++){
    const option = document.createElement('option');
    const textOption = generations[i];
    //console.log(textOption);
    option.innerHTML= textOption;
    // También se puede hacer de esta manera
    //document.getElementById("select-generation-dashboard-1").appendChild(option);
    //document.getElementById("select-generation-dashboard-2").appendChild(option);
    selectGenerationDashboard1.appendChild(option);
  }
  for(let i=0; i< generations.length; i++){
    const option = document.createElement('option');
    const textOption = generations[i];
    //console.log(textOption);
    option.innerHTML= textOption;
    selectGenerationDashboard2.appendChild(option);
  }  
},

//Funcion de turno

getTurno: (venue, generation, generations, students) => {
  let turnoAmCount = 0;
  let turnoPmCount = 0;
  
}



