import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "@commands";
export const slashListener = (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {

        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

async function handleSlashCommand(client: Client, interaction: CommandInteraction) {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    slashCommand.run(client, interaction);
}