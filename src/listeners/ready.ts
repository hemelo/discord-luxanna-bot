import { ActivityType, Client } from "discord.js";
import { Commands } from "@commands";

export const readyListener = (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);
        
        await client.user.setPresence({
            activities: [ {
                name: "/helpp",
                type: ActivityType.Watching,
            }]
        })

        console.log(`${client.user.username} is Online`);
    });
};
