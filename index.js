const { Telegraf } = require("telegraf");
const express = require("express");
require("dotenv").config();

// Инициализация бота и сервера
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Обработка команды /start
bot.start((ctx) => ctx.reply("Привет! Бот успешно запущен через Webhook."));

// Обработка текстовых сообщений
bot.on("text", (ctx) => ctx.reply(`Вы сказали: ${ctx.message.text}`));

// Обработка webhook
app.use(bot.webhookCallback("/webhook"));

// Маршрут для проверки
app.get("/", (req, res) => {
  res.send("Бот работает!");
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  try {
    await bot.telegram.setWebhook(`${process.env.RENDER_URL}/webhook`);
    console.log("Webhook успешно установлен!");
  } catch (error) {
    console.error("Ошибка установки Webhook:", error);
  }
});