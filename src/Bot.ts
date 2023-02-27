
import { Client } from "discord.js";

import {readyListener, slashListener} from "@listeners";
import {tokensConfig} from "@config";

const client = new Client({
    intents: []
});

readyListener(client);
slashListener(client);

client.login(tokensConfig.BOT_TOKEN);

console.log("Bot has started...");