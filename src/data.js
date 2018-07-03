window.data = {
  
  
  computeStudentsStats: (laboratoria) => {
  let studentsArray = [];
  let nombreEstudiante;
  let mailEstudiante;
  let porcentajeEstudiante;
  let statusEstudiante;
  let generacionEnSede;
  let topicsEstudiante;
  let porcentajeCompleto;
  for(venue in laboratoria){
    let sede = venue; 
    const generations = Object.keys(laboratoria[venue].generacion); 
    generations.forEach((generationInVenue) => {
      //console.log(generationInVenue); //Me da los nombres de las generaciones para cada sede en string
     generacionEnSede = generationInVenue;
      //console.log(student);
      const students = laboratoria[venue].generacion[generationInVenue].estudiantes;
      //console.log(students);
      students.forEach((student) => {
        nombreEstudiante = student.nombre; //Agregamos nombre de estudiante
        mailEstudiante = student.correo; //Agregamos correo de estudiante
        porcentajeEstudiante = student.progreso.porcentajeCompletado; //Agregamos porcentaje de avance general
        let progress = porcentajeEstudiante;
        if (progress < 60) {
          statusEstudiante = "below"; //Indicamos que esta debajo del 60%
        } else if (progress > 90) {
          statusEstudiante = "over"; //Indicamos que esta sobre el 90%
        } else {
          statusEstudiante = "average"; //Indicamos que esta en la media
        };
        const topics = Object.keys(student.progreso.temas);
        
        for (topic of topics) {
          //La siguiente linea añade los temas como nuevas propiedades del objeto topics y les da como valor que sean un objeto
          let newProperty = Object.defineProperty(student.progreso.temas, topic, { writable: true});
          topicsEstudiante = newProperty;
        };

        studentsArray.push({'name': nombreEstudiante,'email': mailEstudiante, 'campus': sede, 'generation': generacionEnSede, 'stats':{
          'status': statusEstudiante, 'completedPercentage': porcentajeEstudiante, 'topics': topicsEstudiante}});
        
      });
    });
  }
  console.log(studentsArray);
  return studentsArray;
  
},

computeGenerationsStats: (laboratoria) => {

  const generationsArray = [];
  let valueCampus;
  let valueGeneration;
  let valueAverage;
  let valueCount;
  
  let average = 0;
  for (key in laboratoria) {
  
    valueCampus = key;
    //average = 0;
    const generations = Object.keys(laboratoria[key].generacion);
    //console.log(generations);
    generations.forEach((generation) => {
   
      valueGeneration = generation;
      const students = laboratoria[key].generacion[generation].estudiantes;
      //console.log(students);
      
      for (student in students) {
   
        average += students[student].progreso.porcentajeCompletado;
        //average = average / students.length;
        valueAverage = Math.round(average/students.length);
        valueCount = students.length;
        
      };    
      generationsArray.push({'campus': valueCampus, 'generation': valueGeneration, 'average': valueAverage, 'count': valueCount});        
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

checkLogin: (sedes,generaciones,generations,students) => {
  //console.log(generations);
  //console.log(students);
  let name = userName.value;
  let password = pwd.value;
  let venue = selectCampus.value;
  let generation = selectGeneration.value;
  // console.log(name);
  // console.log(password);
  // console.log(venue);
  // console.log(generation);

  if(name === ""  || password === "" || venue === "Sede" || generation === "Generacion"){

    //Regresa una alerta si no se llenan todos los campos
    return alert(`Oops...
Debes ingresar todos los datos`);

  }else if(name === "usuario" && password === "1234" && venue != "Sede" && generation != "Generacion"){
  
    loginContainer.style.display = "none";
    mainPage.style.display = "block";
    //console.log(name);
    //console.log(password);
    //console.log(venue);

    //Llama a la función que despliega el número de estudiantes activas
    data.welcomeDashboard(name,venue,generation,generations,students);
   
    //agregamos esta línea para poder llamar los valores después
    return [name,venue];

  }else{
  
    //Regresa una alerta si algún dato no es correcto
    return alert("Alguno de tus datos es incorrecto");
    
  }
  
},



//Función que despliega los datos a mostrar en la pantalla de inicio del Dashboard después del login
welcomeDashboard : (name,sede,generation,generations,students) =>{
  document.querySelector("#venue").innerHTML = sede;
  document.querySelector("#generation").innerHTML = `${generation} GENERACIÓN`;
  document.querySelector("#user").innerHTML = name.toUpperCase();
  // console.log(name);
  // console.log(venue);
  // console.log(generation);
   console.log(generations);
   console.log(students);
  let venue = sede.toLowerCase();
  //console.log(venue);
  let gen = generation.toLowerCase();
  //console.log(gen);
  let estudiantes;
  //console.log(estudiantes);
  for( let i = 0; i < generations.length; i++){
    let campus = generations[i].campus;
    let generacion = generations[i].generation;
    if(campus === venue && generacion === gen){
      estudiantes = generations[i].count; 
      //console.log(estudiantes);
    }
  }
  const numberStudents = document.createElement('h3');
  numberStudents.innerHTML = estudiantes;
  document.getElementById("lista").appendChild(numberStudents);
  //console.log(estudiantes);
},

drawCampusDashboard : (sedes,generations) => {
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
    option.innerHTML= textOption.toUpperCase();
    // También se puede hacer de esta manera
    //document.getElementById("select-generation-dashboard-1").appendChild(option);
    //document.getElementById("select-generation-dashboard-2").appendChild(option);
    selectGenerationDashboard1.appendChild(option);
  }
  for(let i=0; i< generations.length; i++){
    const option = document.createElement('option');
    const textOption = generations[i];
    //console.log(textOption);
    option.innerHTML= textOption.toUpperCase();
    selectGenerationDashboard2.appendChild(option);
  }  
},


sortStudents : (students, orderBy, orderDirection) =>{

},

filterStudents : (students, search) => {

},  
/*const exitFunction = () => {
  confirm("¿Quieres salir de LAB-Dash?");
  if(true){
      window.location.reload();
  }else{
    alert("OK");
  }
};*/
}
