/*
* aqui va a estar la logica para llevar el control del ayuno intermitente
*/
const moment = require('moment');

let control = {
    nombre : '',
    horas_ayuno: 0,
    horas_comida : function(){
        return 24 - control.horas_ayuno
    },
    estado_control: "Comida",
    hora_inicio: 0
}

const activar = (horas_ayuno, usuario) => {
    control.nombre = usuario;
    control.horas_ayuno = moment().add(horas_ayuno,'h').format('HH:mm');
}

const cancelar = () => {
    control.nombre = ''
    control.horas_ayuno = 0
}

const status = () =>{
    return `
    Usuario : ${control.nombre}
    Rango de horas de ayuno: ${control.horas_ayuno}
    Rango de horas para comer: ${control.horas_comida()}

    Actualmente estas en modo: *${control.estado_control}*

    Si deseas cancelar tu rutina o cambiar de horas, escribe "/cancelar"
    `;
}


module.exports = {control, status, activar, cancelar};