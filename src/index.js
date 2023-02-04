// Importamos la librería node-telegram-bot-api
const TelegramBot = require('node-telegram-bot-api');
const Menu = require('./menu');
const Control = require('./control');

// Creamos una constante que guarda el Token de nuestro Bot de Telegram que previamente hemos creado desde el bot @BotFather
const token = '6089035688:AAG9222l_wU0n9JrfFU_UEqUcPWTsiC-3qs';
let chatID = null;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

console.log('Se inicia el bot');
global.puede_elegir = false // ? saber si puede elegir o no las opciones
global.esta_ayunando = false // ? saber si esta con una rutina de ayuno o no

// ⚠️ Después de este comentario es donde ponemos la lógica de nuestro bot donde podemos crear los comandos y eventos para darle funcionalidades a nuestro bot

// Implementación de la primera funcionalidad: Cuando mandamos el mensaje "Hola" reconoce tú nombre y genera un input tipo "Hola Daniel"

// ! si se produce algun error
bot.on('polling_error', function(error){
    console.log(error);
});

// ? capta un mensaje
bot.addListener('message', function(msg){
    chatID = msg.chat.id;
});

// ? comando para iniciar el bot
bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
    console.log('comando start');
    
    bot.sendMessage(chatId, "Hola " + nameUser);
    
    setTimeout(function(){
        bot.sendMessage(chatId, Menu.showMenu());
    }, 500);

    if(global.esta_ayunando == false){
        global.puede_elegir = true
    }else{
        bot.sendMessage(chatId, `Actualmente estas con una rutina de ayuno intermitente activa,
        ve al comanto de "status para tener mas informacion"`);
    }
    
    
});

// ? comando para la descripcion del bot
bot.onText(/^\/descripcion/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    console.log('comando descripcion');
    
    bot.sendMessage(chatId, 
        `
    Este asistente virtual para tus ayunos intermitentes
    su principal funcion es ayudar a recordarte cuando estas
    dentro de tus rangos de horas para poder comer y cuando
    estas dentro de tus rangos para para hacer el ayuno.
    
    Si por ejemplo utilizas un ayuno 16/8 (16 horas de ayuno y 8 para comer)
    te dará 2 alertas, la primera cuando entres en el rango de ayuno,
    y la segunda cuando entres al rango para poder comer

    ¿Como usar?

    ingresar el rango de horas de ayuno. Ejemplo: 16 
    para hacer referencia a 16 horas de ayuno y por ende 8 horas para comer 
    (sumando asi las 24 horas del dia)

    Este bot comienza desde el momento que lo activas con el comando "start"
        `
        );
});


//? recibe los parametros del menu
bot.onText(/^[0-9]$/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    if(global.puede_elegir == true){
        let mensaje = Menu.elegirOpcion(msg.text, nameUser)
        bot.sendMessage(chatId, mensaje);
    }else{
        bot.sendMessage(chatId, 'Primero ejecute el comando "/start"');
    }
});

bot.onText(/^\/status/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    console.log('comando start');
    
    bot.sendMessage(chatId, Control.status());

});

bot.onText(/^\/cancelar/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    console.log('entra a cerrar ');

    console.log('comando start');
    if(global.esta_ayunando == true){
        //lo cancela
        Control.cancelar();
        bot.sendMessage(chatId, 'Cancelaste tu control de ayuno intermitente');
    }else{
        bot.sendMessage(chatId, 'Actualmente no estas llevando control de tu ayuno intermitente');
    }

});

const miliseg = () => {
    const miliseg = 3600000
    const hora =  Control.control.horas_ayuno
    return hora * miliseg
}

// ? LOGICA DE LA APP
setInterval(function(){
    if(chatID != null && global.esta_ayunando == true){
        switch (Control.control.estado_control){
            case "Ayunando":
                bot.sendMessage(chatID, `Estabas modo ${Control.control.estado_control} Ya puedes romper el ayuno, tienes ${Control.control.horas_comida()} Horas para comer`);
                Control.control.estado_control = "Comiendo"
                break;
            case "Comiendo":
                bot.sendMessage(chatID, `Estabas modo ${Control.control.estado_control} Ya empezó el ayuno de ${Control.control.horas_ayuno} Horas`);
                Control.control.estado_control = "Ayunando"
                break;
        }
    }
}, 5000 );




