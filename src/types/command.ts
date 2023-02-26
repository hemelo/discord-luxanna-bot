import {CommandInteraction, ChatInputApplicationCommandData, Client, ChatInputCommandInteraction} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {

    run(client: Client, interaction: CommandInteraction | ChatInputCommandInteraction): void;

}

