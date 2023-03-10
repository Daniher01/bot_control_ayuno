const Control = require('./control');

let horas = {
    1:{
        opcion: '1️⃣',
        ayuno: '12',
        comida: '12',
    },
    2:{
        opcion: '2️⃣',
        ayuno: '14',
        comida: '10',
      },
     3: {
        opcion: '3️⃣',
        ayuno: '16',
        comida: '8',
      }
}

// ? muestra el menu del bot
const showMenu = () => {

    const Menu = 
    `
    Selecciona la cantidad de horas que vas a ayunar:

    ${horas[1].opcion}. ${horas[1].ayuno} horas

    ${horas[2].opcion}. ${horas[2].ayuno} horas

    ${horas[3].opcion}. ${horas[3].ayuno} horas

    0️⃣. Salir
    `;

    return Menu
}

const elegirOpcion = (opcion, usuario) =>{
    const mensaje = (ayuno) => {
        return `Elegiste la opcion de ${ayuno} horas de ayuno y ${24 - ayuno} horas para poder alimentarte`;
    }

    let msg
    switch (opcion){
        case '1':
           msg = mensaje(horas[parseInt(opcion)].ayuno)
           Control.activar(horas[parseInt(opcion)].ayuno, usuario)
           global.esta_ayunando = true
           break
        case '2':
           msg =  mensaje(horas[parseInt(opcion)].ayuno)
           Control.activar(horas[parseInt(opcion)].ayuno, usuario)
           global.esta_ayunando = true
           break
        case '3': 
           msg = mensaje(horas[parseInt(opcion)].ayuno)
           Control.activar(horas[parseInt(opcion)].ayuno, usuario)
           global.esta_ayunando = true
            break
        case '9': 
            msg = mensaje(1)
            console.log('antes');
            Control.activar_test(1,2, usuario)
            console.log('despues');
            global.esta_ayunando = true
            break    
        case '0':
            msg = `No elegiste ninguna opcion, para poder elegir otra opcion, ejecute el comando "/start"`     
            global.puede_elegir = false       
            break          
        default:
            msg = 'Elige una opcion correcta'              
    }

    return msg
}

module.exports = {showMenu, elegirOpcion};