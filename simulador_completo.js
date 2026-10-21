
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  // Recupera el componente
  let componente = document.getElementById("parametros");
  // Recupera la lista de clases del componente
  let listaClass = componente.classList;
  // Agrega o elimina la clase
  listaClass.add("activa");//agrega
  listaClass.remove("activa");//elimina
  //Forma mas compacta:
  //document.getElementById("parametros").classList.add("activa");
  //document.getElementById("parametros").classList.remove("activa");
  
  //Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

  function ocultarSecciones(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
  }

  function mostrarSeccion(idComponte){
    ocultarSecciones();
    document.getElementById(idComponte).classList.add("activa");

  }

  function guardarTasa(){
    let cmptasaIntereses=document.getElementById("tasaInteres");
    let tasaIntereses=parseInt(cmptasaIntereses.value);
    
    if (tasaIntereses>=10 && tasaIntereses<=20){
      mostrarTexto("mensajeTasa","Tasa configurada correctamente:"+ tasaIntereses);
    }else{
      mostrarTexto("mensajeTasa","La tasa debe estar entre 10% y 20%")
    }

  }