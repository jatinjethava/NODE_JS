// load .env variables if present (npm install dotenv and create .env file)
require('dotenv').config();

const express = require("express");
const app = express();
const OpenAI = require("openai");

const { Client, GatewayIntentBits } = require("discord.js");
const discord = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// read env vars once, after dotenv
let DISCORD_TOKEN = process.env.DISCORD_TOKEN;
// the OPENAI API key should come from the environment as well –
// never hard‑code it in source.  set OPENAI_API_KEY in your .env file
// or export it before running the bot.
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.PORT || 8100;

// verify that credentials are available
if (!OPENAI_API_KEY || !DISCORD_TOKEN) {
    console.error("⚠️ Missing OPENAI_API_KEY or DISCORD_TOKEN environment variable.");
    console.error("OPENAI_API_KEY =", OPENAI_API_KEY ? "<set>" : "<not set>");
    console.error("DISCORD_TOKEN =", DISCORD_TOKEN ? "<set>" : "<not set>");
    process.exit(1);
}

// show token length for debugging; don't print actual token
console.log("Discord token length:", DISCORD_TOKEN.length);
// trim whitespace which sometimes creeps in from .env
DISCORD_TOKEN = DISCORD_TOKEN.trim();

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const conversationHistory = new Map();
const MAX_HISTORY = 20;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function askChatGPT(userId, userMessage) {
    // Initialise history for new users
    if (!conversationHistory.has(userId)) {
        conversationHistory.set(userId, [
            {
                role: "system",
                content:
                    "You are a helpful, friendly assistant living inside a Discord server. " +
                    "Keep your answers concise and conversational.",
            },
        ]);
    }

    const history = conversationHistory.get(userId);
    history.push({ role: "user", content: userMessage });

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",   // swap to "gpt-4o" or "gpt-3.5-turbo" if preferred
        messages: history,
        max_tokens: 1000,
        temperature: 0.7,
    });

    const reply = response.choices[0].message.content;
    history.push({ role: "assistant", content: reply });

    // Trim oldest non-system messages when history grows too large
    if (history.length > MAX_HISTORY + 1) {
        history.splice(1, history.length - MAX_HISTORY - 1);
    }

    return reply;
}

discord.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;                 // ignore other bots
    if (!msg.mentions.has(discord.user)) return; // only respond when @mentioned

    // Strip the @mention from the message to get the clean prompt
    const prompt = msg.content.replace(/<@!?\d+>/g, "").trim();

    if (!prompt) {
        return msg.reply("Hey! Ask me anything 😊");
    }

    // Show a typing indicator while waiting for OpenAI
    await msg.channel.sendTyping();

    try {
        const answer = await askChatGPT(msg.author.id, prompt);

        // Discord messages max out at 2000 chars – split if needed
        if (answer.length <= 2000) {
            await msg.reply(answer);
        } else {
            const chunks = answer.match(/[\s\S]{1,1990}/g);
            for (const chunk of chunks) {
                await msg.channel.send(chunk);
            }
        }
    } catch (err) {
        console.error("OpenAI error:", err);
        await msg.reply("⚠️ Sorry, I couldn't reach ChatGPT right now. Try again in a moment.");
    }
});

discord.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ask") {
        const prompt = interaction.options.getString("prompt");

        await interaction.deferReply(); // gives us 15 min to respond

        try {
            const answer = await askChatGPT(interaction.user.id, prompt);
            await interaction.editReply(answer.slice(0, 2000)); // Discord limit
        } catch (err) {
            console.error("OpenAI error:", err);
            await interaction.editReply("⚠️ ChatGPT returned an error. Please try again.");
        }
    }

    // Add more slash commands here as needed
});

discord.once("ready", () => {
    console.log(`✅ Logged in as ${discord.user.tag}`);
});

discord.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    msg.reply({
        content: "Hi ! From Bot."
    })
});

discord.on('interactionCreate', (msg) => {
    msg.reply("I Am You Dad !")
});

// login with the token from environment (trimmed earlier)
discord.login(DISCORD_TOKEN).catch(err => {
    console.error("Discord login failed:", err);
    process.exit(1);
});
app.get("/", (_req, res) => res.json({ status: "ok", bot: discord.user?.tag }));

app.listen(PORT, () => console.log(`🚀 Express running on port ${PORT}`));