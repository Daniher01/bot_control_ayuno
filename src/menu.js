const Control = require('./control');

// ? muestra el menu del bot
const showMenu = () => {

    const Menu = 
    `
    Selecciona la opcion deseada:

    1. 12 horas
    2. 14 horas
    3. 16 horas
    0. Salir
    `;

    return Menu
}

const elegirOpcion = (opcion, usuario) =>{
    const mensaje = (ayuno) => {
        return `Elegiste la opcion de ${ayuno} horas de ayuno y ${24 - ayuno} horas para poder alimentarte`;
    }

    let msg
    let horas = {
        1:{
            ayuno: '12',
            comida: '12',
        },
        2:{
            ayuno: '14',
            comida: '10',
          },
         3: {
            ayuno: '16',
            comida: '8',
          }
    }
    switch (opcion){
        case '1':
           msg = mensaje(horas[1].ayuno)
           Control.activar(horas[1].ayuno, usuario)
           global.esta_ayunando = true
           break
        case '2':
           msg =  mensaje(horas[2].ayuno)
           Control.activar(horas[2].ayuno, usuario)
           global.esta_ayunando = true
           break
        case '3': 
           msg = mensaje(horas[3].ayuno)
           Control.activar(horas[3].ayuno, usuario)
           global.esta_ayunando = true
           break
            horas : {
                ayuno: '12';
                comida: '12';
              }
            // funcion             
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