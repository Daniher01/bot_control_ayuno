/*
* aqui va a estar la logica para llevar el control del ayuno intermitente
*/

let control = {
    nombre : '',
    horas_ayuno: 0,
    horas_comida : function(){
        return 24 - control.horas_ayuno
    },
    estado_control: "Comiendo"
}

const activar = (horas_ayuno, usuario) => {
    control.nombre = usuario;
    control.horas_ayuno = horas_ayuno;
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

    Si deseas cancelar tu ayuno o camibiar de horas, escribe "/cancelar"
    `;
}


module.exports = {control, status, activar, cancelar};