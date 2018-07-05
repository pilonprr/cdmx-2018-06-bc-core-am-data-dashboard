# Preámbulo
En Laboratoria, las Training Managers (TMs) hacen un gran trabajo al analizar la mayor cantidad de datos posibles respecto al progreso de las estudiantes para apoyarlas en su aprendizaje.
La principal medida de progreso de una estudiante en Laboratoria es su avance completando los proyectos de la Ruta de Aprendizaje y su desempeño en función a la Rúbrica de Niveles Esperados. Sin embargo, para completar estos proyectos, las estudiantes acceden a contenidos de aprendizaje (lecturas, videos, ejercicios y quizzes) en un sistema que llamamos LMS (Learning Management System). El LMS acumula data sobre quién leyó qué, qué ejercicios se han completado, los resultados de los quizzes, etc.
A pesar de que la data de progreso del LMS (ej. lecturas leídas, ejercicios completados, nota en quizzes, etc.) no impacta directamente en la evaluación de una estudiante, sí es una pieza de información relevante que las TMs quisieran visualizar para tener un mejor entendimiento de cómo va cada estudiante en su proceso de aprendizaje.
Actualmente, el equipo de Laboratoria cuenta con un Google Drive, en donde se generan diversos archivos (SpreadSheets, Docs, etc.) compartidos, en los cuales se guarda y manipula dicha información de cada alumna. Esta información es consultada frecuentemente por el equipo, con diversos fines como consultar el avance de cada alumna, así como los resultados de las evaluaciones, asistencia y datos generales. Esta información es consultada tanto por las TMs como por los Coaches, quienes también evalúan y monitorean el avance y desarrollo de las alumnas.
Aunque Google Drive les ha ofrecido hasta el momento funcionalidad y practicidad, el equipo busca tener una herramienta (Dashboard) con el cual puedan visualizar la información de manera más ordenada y accesible; por lo cual se propone la siguiente herramienta.
# Objetivos
De acuerdo al contexto establecido, el objetivo de este proyecto será la creación de un Dashboard con el cual, el equipo de Formación de Laboratoria, será capaz de visualizar la información sobre el avance y desarrollo de las estudiantes de manera dinámica.


## Proto-Persona:
Nuestro usuario (proto-persona) ha sido definido (de acuerdo al contexto planteado) como TM o Coach del equipo de Laboratoria, con una personalidad paciente, alegre, positiva, analítica, además de tener conocimientos (básicos o avanzados) en tecnología. Su edad ronda de 25 a 35 años y ha sido definida como principalmente de género femenino; aun cuando la aplicación será pensada para ambos géneros. Se considera al usuario como una persona ocupada ya que tiene diversas actividades y responsabilidades dentro del Bootcamp.
Nuestro usuario se comunica constantemente a través de medios digitales (email, redes sociales, etc.), algunas veces trabaja remotamente (incluso desde un dispositivo móvil); de manera personal, le gustan los animales y tomar descansos breves para no sobrecargarse y poder rendir en todo momento al 100%. Las necesidades principales de nuestra proto- persona son pasar menos tiempo buscando los datos que necesita para poder ocupar ese tiempo visualizándolos y analizándolos, lo cual nos indica la necesidad de ser capaz de hacer búsquedas puntuales en una interfaz que le facilite también el análisis.
## Requerimientos UX:
* Responsive Web Design: La aplicación será pensada y estructurada para funcionar en diferentes dispositivos de manera ágil y amigable para el usuario ya que trabaja remotamente, desde su móvil.
* Funcionalidad: El usuario será capaz de crear filtros de la información que requiera, basado en la base de datos creada con la información sobre las alumnas de Laboratoria.
* La interfaz debe permitir al usuario:

o	Listar y poder seleccionar sede.
o	Dentro de cada sede:
	Listar y poder seleccionar generaciones
o	Para cada generación:
	Listar y poder seleccionar estudiantes mostrando porcentaje general de completitud de cada estudiante
o	Seleccionar estudiantes mostrando reporte de progreso:
o	Mostrar porcentaje de completitud de todos los temas
o	Calcular porcentaje de tiempo completado de cada tema
o	Listar subtemas de cada tema
o	Poder filtrar subtemas completados y no-completados de cada tema
o	Poder filtrar subtemas por tipos (ejercicios, lecturas y quizzes)

* En la vista de cada generación mostrar reporte de:
o	Promedio de la generación
o	Generar status para identificar estudiantes debajo del 60 en su porcentaje de completitud
o	Generar status para identificar estudiantes con 90 o más en su porcentaje de completitud
o	Poder filtrar estudiantes por estos dos status
o	Filtrar y poder buscar estudiantes por nombre
o	Poder ordenar de manera ascendente y descendente a las estudiantes según porcentaje de completitud

## Investigación de Referentes
Según un estudio de IBM, el 90% de la data que existe hoy ha sido creada en los últimos dos años. Cada día generamos 2.5 trillones de bytes de datos, una cifra sin precedentes.
Sin embargo, los datos por sí solos son de poca utilidad. Para transformar datos en información necesitamos procesarlos y entenderlos. Una manera muy sencilla de hacerlo es creando visualizaciones. Las empresas líderes de hoy generan visualizaciones dinámicas de su data que les permiten entender mejor su negocio y tomar decisiones apropiadas.
Si pensamos en un dashboard podemos pensar en el tablero de control de un auto o el de un avión. Un espacio desde el cual un usuario puede tener acceso a la información y controles más relevantes, en este caso, del vehículo que está utilizando. El dashboard de un auto le permite a quien conduce saber a qué velocidad está yendo, qué cambio/velocidad está utilizando, cuánto combustible tiene disponible, cuál es la temperatura del motor, cuántas revoluciones por minuto dan las ruedas, cuánta distancia ha recorrido, etc.
## Aplicaciones en el mundo real
En el mundo de la web es muy común el uso de dashboards. De hecho, wikipedia nos dice que un dashboard puede ser un resumen gráfico de varias piezas de información importante, generalmente utilizadas para dar una visión general de una empresa o de un servicio.
Un ejemplo de esto (más acercado a la realidad de nuestro demográfico) es el Dashboard que usa la DGAE (Direccion General de Administracion Escolar, Servicios Escolares, UNAM), con el cual sus estudiantes pueden visualizar su curricula, información sobre cada clase, así como su trayectoria escolar y sus calificaciones.
(img)
Así mismo, se toman en cuenta algunos Dashboards que han sido estructurados con funcionalidad parecida a la que necesita nuestro usuario.
(img)




## UX Research
Al ser una aplicación web con un propósito delimitado, con un usuario fácilmente identificable, se decidió implementar una metodología de investigación más directa, utilizando recursos como entrevistas personales y encuestas, a través de las cuales se identificaron diversas características de la interfaz actual, su funcionalidad, practicidad, accesibilidad, etc., además de identificar los puntos de quiebre, las áreas de oportunidad y el flujo de trabajo del usuario, para así poder plantearnos una plataforma adaptada a esas necesidades sin perder los puntos fuertes de la herramienta actual.
Las entrevistas se realizaron de manera presencial, indicando una situación hipotética en el cual el usuario debía utilizar la herramienta actual (documentando en todo momento el flujo de trabajo) y de manera simultánea, comentar los pros y contras de su interacción con la herramienta usada.
Las encuestas fueron realizadas al personal de Formación de Laboratoria CDMX, a través de un cuestionario formulado en Google Forms a través de la siguiente liga: https://goo.gl/forms/GZF7PsBis9ksYWr63 
	En esta encuesta se buscaba identificar, la frecuencia de uso de la herramienta, los datos más relevantes, así como la forma y el objetivo de uso.


# Conclusiones
Sketch
Al analizar los resultados de la investigación previa, se concluyó lo siguiente:
* El usuario deberá ingresar su nombre y el nombre de la sede de la que forma parte; de esta manera, el Dashboard desplegara como elemento principal (de manera directa) información relacionada con la sede de la que forma parte ya que es la que más probablemente quiera consultar.
* La estructuración del Dashboard será una estructura simple.
* Al ingresar a la plataforma, se solicita el nombre y sede del usuario
* Si no ingresa los dos datos se manda un mensaje de error 
* Si se registraron correctamente los datos se despliegan en la pantalla dos secciones:
o	Sección principal
En esta sección se muestra la información “esencial” de la generación actual de la sede del usuario:
	Promedio
	Número de estudiantes con un avance mayor a 90% en el LMS
	Número de estudiantes con un avance menor al 60% en el LMS
o	Barra lateral
En esta sección se muestran una lista con los filtros disponibles para elegir los datos a mostrar en pantalla y un botón para aplicarlos
* Si el usuario selecciona alguno de los filtros y da click al botón “aplicar”, se refresca la sección principal y se muestra la información que selecciono el usuario 
