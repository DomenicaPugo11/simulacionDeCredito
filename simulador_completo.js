  let clientes = [
    {cedula:"1712345678", nombre:"Juan",apellido:"Perez", ingresos:1200, egresos:"500"},
    {cedula:"1723456789", nombre:"Maria", apellido:"Gomez", ingresos:1500, egresos:"600"},
    {cedula:"1734567890", nombre:"Carlos",apellido:"Ramirez", ingresos:900, egresos:"350"}
  ];
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
    tasaInteres=parseInt(cmptasaIntereses.value);
    
    if (tasaInteres>=10 && tasaInteres<=20){
      mostrarTexto("mensajeTasa","Tasa configurada correctamente:"+ tasaInteres);
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
 
    let cliente=buscarCliente(cedula);
    if (cliente==null){
      let cliente = {};
      cliente.cedula=cedula;
      cliente.nombre=nombre;
      cliente.apellido=apellido;
      cliente.ingresos=ingresos;
      cliente.egresos=egresos;
      clientes.push(cliente);
    }else{
      cliente.nombre=nombre;
      cliente.apellido=apellido;
      cliente.ingresos=ingresos;
      cliente.egresos=egresos;
    }
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
      contenidoTabla+="<td>"+
      "<button onclick='seleccionarCliente("+elementoCliente.cedula+")'>ACTUALIZAR</button> <button>ELIMINAR</button> </td>"; 
      contenidoTabla+="</tr>"
    }
    contenidoTabla+="</table>"
    cmpTabla.innerHTML=contenidoTabla;

  }

  function buscarCliente(cedula){
    let elementoCliente;
    let clienteEncontrado=null;
    for (let i=0;i<clientes.length;i++){
        elementoCliente=clientes[i];
        if (elementoCliente.cedula==cedula){
            clienteEncontrado=elementoCliente;
            break
        }
    }
    return clienteEncontrado;
}

function seleccionarCliente(cedula){
  clienteSeleccionado=buscarCliente(cedula);
  if (clienteSeleccionado!=null){
    let cmpCedula=document.getElementById("txtCedula");
    cmpCedula.value=clienteSeleccionado.cedula;
    let cmpNombre=document.getElementById("txtNombre");
    cmpNombre.value=clienteSeleccionado.nombre;
    let cmpApellido=document.getElementById("txtApellido");
    cmpApellido.value=clienteSeleccionado.apellido;
    let cmpIngresos=document.getElementById("txtIngresos");
    cmpIngresos.value=clienteSeleccionado.ingresos;
    let cmpEgresos=document.getElementById("txtEgresos");
    cmpEgresos.value=clienteSeleccionado.egresos;
  }
}

function limpiar(){
    let cedula=document.getElementById("txtCedula")
    cedula.value="";
    let nombre=document.getElementById("txtNombre")
    nombre.value="";
    let apellido=document.getElementById("txtApellido")
    apellido.value="";
    let ingreso=document.getElementById("txtIngresos")
    ingreso.value="";
    let egreso=document.getElementById("txtEgresos")
    egreso.value="";

    clienteSeleccionado=null;
}

function buscarClienteCredito(){
  let cmpTabla=document.getElementById("datosClienteCredito");
  let cedula=recuperaraTexto("buscarCedulaCredito");
  let existenciaCliente=buscarCliente(cedula);
  let elementoTabla="";
  if (existenciaCliente==null){
    alert("Cliente no encontrado");
  }else{
    elementoTabla+="<h3>Datos del Cliente</h3>";
    elementoTabla+="<p><strong>Cédula:</strong>"+existenciaCliente.cedula+"</p>";
    elementoTabla+="<p><strong>Nombre:</strong>"+existenciaCliente.nombre+"</p>";
    elementoTabla+="<p><strong>Apellido:</strong>"+existenciaCliente.apellido+"</p>";
    elementoTabla+="<p><strong>Ingresos:</strong>"+existenciaCliente.ingresos+"</p>";
    elementoTabla+="<p><strong>Egresos:</strong>"+existenciaCliente.egresos+"</p>";
  }
  cmpTabla.innerHTML=elementoTabla;
}

function calcularCredito(){
  let monto=recuperarFloat("montoCredito");
  let plazo=recuperarFloat("plazoCredito");
  let cedula=recuperaraTexto("buscarCedulaCredito");
  let existenciaCliente=buscarCliente(cedula);

  if (existenciaCliente==null){
    alert("Cliente no encontrado");
  }else{
    let montoDisponible=calcularDisponible(existenciaCliente.ingresos,existenciaCliente.egresos);
    let capacidadPago=calcularCapacidadPago(montoDisponible);
    let interes=calcularInteresSimple(monto,tasaInteres,plazo);
    let totalPagar=calcularTotalPagar(monto,interes);
    let cuotaMensual=calcularCuotaMensual(totalPagar,plazo);
    creditoAprobado=aprobarCredito(capacidadPago,cuotaMensual);

    let cmpResultado=document.getElementById("resultadoCredito");

    cmpResultado.innerHTML=
      "Capacidad de pago:"+capacidadPago+"<br>"+
      "Total a pagar:"+totalPagar+"<br>"+
      "Cuota mensual:"+cuotaMensual+"<br>";

    if (creditoAprobado){
      cmpResultado.innerHTML+="RESULTADO: APROBADO";
      cmpResultado.className="aprobado";
    }else{
      cmpResultado.innerHTML+="RESULTADO: RECHAZADO";
      cmpResultado.className="rechazado";
    }
  }
}




    




