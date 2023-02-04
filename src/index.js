// Importamos la librería node-telegram-bot-api
const TelegramBot = require('node-telegram-bot-api');

// Creamos una constante que guarda el Token de nuestro Bot de Telegram que previamente hemos creado desde el bot @BotFather
const token = '6089035688:AAHY_FQnZRS90HdVSjpr_Q4tRIzWCAsWgSg';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// ⚠️ Después de este comentario es donde ponemos la lógica de nuestro bot donde podemos crear los comandos y eventos para darle funcionalidades a nuestro bot

// Implementación de la primera funcionalidad: Cuando mandamos el mensaje "Hola" reconoce tú nombre y genera un input tipo "Hola Daniel"

bot.on('polling_error', function(error){
    console.log(error);
});

bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
    bot.sendMessage(chatId, "Hola " + nameUser);
});

bot.onText(/^\/descripcion/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    
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