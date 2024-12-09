const { Telegraf } = require("telegraf");
require("dotenv").config();

// Создание бота
const bot = new Telegraf(process.env.BOT_TOKEN);

// Обработка команды /start
bot.start((ctx) => {
  ctx.reply("Привет! Бот успешно запущен на Render.");
});

// Обработка текстовых сообщений
bot.on("text", (ctx) => {
  ctx.reply(`Вы отправили сообщение: "${ctx.message.text}"`);
});

// Запуск бота
bot.launch();

// Логирование завершения процесса
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
