// Importamos la librería node-telegram-bot-api
const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');

const Menu = require('./menu');
const Control = require('./control');

// Creamos una constante que guarda el Token de nuestro Bot de Telegram que previamente hemos creado desde el bot @BotFather
const token = require('./../config/config');
let chatID = null;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const Formato = 'HH:mm'


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
    Control.control.nombre = msg.from.first_name
});

// ? comando para iniciar el bot
bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
    console.log('comando start');

    if(global.esta_ayunando == false){
        global.puede_elegir = true

        bot.sendMessage(chatId, "Hola " + nameUser);
    
        setTimeout(function(){
            bot.sendMessage(chatId, Menu.showMenu());
        }, 500);
    }else{
        bot.sendMessage(chatId, `Actualmente estas con una rutina de ayuno intermitente activa, ve al comando de */status* para tener mas informacion`,{parse_mode : "Markdown"});
    }
    
    
});

// ? comando para la descripcion del bot
bot.onText(/^\/descripcion/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    console.log('comando descripcion');
    
    bot.sendMessage(chatId, 
        `
    Este _asistente virtual_ para tus *ayunos intermitentes* su principal funcion es ayudar a recordarte cuando estas dentro de tus rangos de horas para poder comer y cuando estas dentro de tus rangos para para hacer el ayuno.
    
    Si por ejemplo utilizas un ayuno 16/8 _(16 horas de ayuno y 8 para comer)_ te dará 2 alertas, la primera cuando entres en el rango de ayuno, y la segunda cuando entres al rango para poder comer

    *¿Como usar?*

    Ingresa la opcion que necesitas en el *Menu* y se te indicará cuantas horas vas a estar en ayuno y cuantas horas serán para poder comer

    Este bot comienza desde el momento que lo activas con el comando *start* y siempre comenzarás en modo de _ayuno_
        `
        ,{parse_mode : "Markdown"});
});


//? recibe los parametros del menu
bot.onText(/^[0-9]$/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    if(global.puede_elegir == true){
        if(global.esta_ayunando == false){
            let mensaje = Menu.elegirOpcion(msg.text, nameUser)

            const now = moment().format(Formato);
            llevarControl(now, Formato)

            bot.sendMessage(chatId, mensaje);
        }else{
            bot.sendMessage(chatId, `Actualmente estas con una rutina de ayuno intermitente activa, ve al comanto de */status* para tener mas informacion`,{parse_mode : "Markdown"});
        }
    }else{
        bot.sendMessage(chatId, 'Primero ejecute el comando */start*',{parse_mode : "Markdown"});
    }
});

bot.onText(/^\/status/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
    bot.sendMessage(chatId, Control.status(),{parse_mode : "Markdown"});

});

bot.onText(/^\/cancelar/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;

    if(global.esta_ayunando == true){
        //lo cancela
        Control.cancelar();
        global.esta_ayunando = false
        bot.sendMessage(chatId, '*Cancelaste tu control de ayuno intermitente*',{parse_mode : "Markdown"});
    }else{
        bot.sendMessage(chatId, '*Actualmente no estas llevando control de tu ayuno intermitente*',{parse_mode : "Markdown"});
    }

});

// ? LOGICA DE LA APP
setInterval(function(){

    const hora_actual = moment().format(Formato);
    console.log('Hora actual: '+hora_actual);
    llevarControl(hora_actual, Formato);
}, 60000);

function llevarControl(now, formato){
    console.log('function::llevarControl');
    if(chatID != null && global.esta_ayunando == true){

        console.log('Hora limite ayuno: '+Control.control.horas_ayuno);
        console.log('Hora limite comida: '+Control.control.horas_comida);

        switch (Control.control.estado_control){
            case "Ayuno":
                if(moment(now, formato).isSame(moment(Control.control.horas_ayuno, formato))){

                    Control.control.estado_control = "Comida"
                    bot.sendMessage(chatID, `*Ya puedes romper el ayuno* ✅`,{parse_mode : "Markdown"});
                } 
                
                break;
            case "Comida":
                if(moment(now, formato).isSame(moment(Control.control.horas_comida, formato))){
                    Control.control.estado_control = "Ayuno"
                    bot.sendMessage(chatID, `*Entraste en Ayuno* ‼️`,{parse_mode : "Markdown"});
                } 
                break;
        }
    }
}




