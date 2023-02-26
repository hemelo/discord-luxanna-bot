
import { Client } from "discord.js";

import {readyListener} from "@listeners";
import {tokensConfig} from "@config";

const client = new Client({
    intents: []
});

readyListener(client);

client.login(tokensConfig.BOT_TOKEN);

console.log("Bot has started...");