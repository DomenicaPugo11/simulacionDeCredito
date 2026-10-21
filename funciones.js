//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO

 function calcularDisponible(ingresos,egresos){
    let valorDisponible=ingresos-egresos;
    if (valorDisponible<0){
        return 0;
    }else{
        return valorDisponible;
    }
 }

 function calcularCapacidadPago(montoDisponible){
    let capacidadPago=(montoDisponible*30)/100;
    return capacidadPago;
 }

 function calcularInteresSimple(monto,tasa,plazoAnios){
    let interesSimple=0;
    interesSimple=tasa/100;
    interesSimple=monto*plazoAnios*interesSimple
    return interesSimple;
 }

 function calcularTotalPagar(monto,interes){
    let totalPagar=monto+interes+100;
    return totalPagar;
 }

 function calcularCuotaMensual(total,plazoAnios){
    let cuotaMensual=0;
    cuotaMensual=plazoAnios*12;
    cuotaMensual=total/cuotaMensual;
    return cuotaMensual;
 }

 function aprobarCredito(capacidadPago,cuotaMensual){
    if (capacidadPago>cuotaMensual){
        return true;
    }else {
        return false;
    }

 }