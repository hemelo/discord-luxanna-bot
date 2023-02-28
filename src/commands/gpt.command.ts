import {Command} from "@types";
import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    Client,
    CommandInteraction,
    EmbedBuilder,
    Message
} from "discord.js";
import {OpenAiApi} from "@api";

export const AskGpt: Command = {
    name: 'askgpt',
    description: 'Chat GPT v3.5',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "prompt",
            description: "Pergunte alguma coisa",
            type: ApplicationCommandOptionType.String,
            minLength: 5,
            required: true,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {

        await interaction.deferReply();

        const prompt = interaction.options.get('prompt', true)?.value as string;
        const response = await OpenAiApi.askGpt(prompt, 'gpt-3.5-turbo');

        const embed = new EmbedBuilder()
            .setTitle("Chat GPT")
            .setColor("Blue")
            .setDescription(`${prompt}\n\`\`\`\n${response}\`\`\``);

        await interaction.followUp({
            embeds: [embed]
        })
    }
}