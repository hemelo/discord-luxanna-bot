
import { Client } from "discord.js";

import { readyListener, slashListener} from "@listeners";
import {tokensConfig, openAiConfig} from "@config";
import {OpenAiApi} from "@api/openai.api";

const client = new Client({
    intents: []
});

OpenAiApi.connect(openAiConfig);

readyListener(client);
slashListener(client);

client.login(tokensConfig.BOT_TOKEN);

console.log("Bot has started...");