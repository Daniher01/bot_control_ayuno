/*
* aqui va a estar la logica para llevar el control del ayuno intermitente
*/
const moment = require('moment');

let control = {
    nombre : '',
    horas_ayuno: 0,
    horas_comida : 0,
    estado_control: "Comida",
    hora_inicio: 0
}

const activar = (horas_ayuno, horas_comida, usuario) => {
    control.nombre = usuario;
    control.hora_inicio = moment().format("HH:mm");
    control.horas_ayuno = moment().add(horas_ayuno,'h').format('HH:mm');
    control.horas_comida = moment().format('HH:mm');
}

const cancelar = () => {
    control.nombre = ''
    control.horas_ayuno = 0
    control.estado_control = "Comida"
}

const status = () =>{
    let msg = control.estado_control == 'Ayuno' ? `El ayuno es hasta las ${control.horas_ayuno} `: `La hora de comida es hasta las ${control.horas_comida}`

    return `
    Usuario : ${control.nombre}

    Comenzaste tu ayuno a las ${control.hora_inicio}

    ${msg}

    Actualmente estas en modo: *${control.estado_control}*

    Si deseas cancelar tu rutina o cambiar de horas, escribe "/cancelar"
    `;
}


module.exports = {control, status, activar, cancelar};