
import {Client} from "discord.js";
import {tokensConfig} from "@config";

const client = new Client({
    intents: []
});

client.login(tokensConfig.BOT_TOKEN);

console.log("Bot has started...");