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

  function guardarCliente(){
    let cedula=recuperaraTexto("txtCedula");
    let nombre=recuperaraTexto("txtNombre");
    let apellido=recuperaraTexto("txtApellido");
    let ingresos=recuperarFloat("txtIngresos");
    let egresos=recuperarFloat("txtEgresos");
    let cliente = {};
    cliente.cedula=cedula;
    cliente.nombre=nombre;
    cliente.apellido=apellido;
    cliente.ingresos=ingresos;
    cliente.egresos=egresos;
    clientes.push(cliente);
    pintarClientes();
  }

  function pintarClientes(){
    let cmpTabla=document.getElementById("tablaClientes");
    let elementoCliente;
    let contenidoTabla="<table>";
    for (let i=0;i<clientes.length;i++){
      elementoCliente=clientes[i];
      contenidoTabla+="<tr>";
      contenidoTabla+="<td>"+ elementoCliente.cedula + "</td>";
      contenidoTabla+="<td>"+ elementoCliente.nombre + "</td>";
      contenidoTabla+="<td>"+ elementoCliente.apellido + "</td>";
      contenidoTabla+="<td>"+ elementoCliente.ingresos + "</td>";
      contenidoTabla+="<td>"+ elementoCliente.egresos + "</td>";
      contenidoTabla+="<td> <button>ACTUALIZAR</button> </td>"; 
      contenidoTabla+="<td> <button>ELIMINAR</button> </td>"; 
      contenidoTabla+="</tr>"
    }
    contenidoTabla+="</table>"
    cmpTabla.innerHTML=contenidoTabla;
  }