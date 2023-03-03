import {
    ActionRowBuilder,
    ApplicationCommandType, Client, CommandInteraction, ComponentType,
    ModalBuilder, ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";

import {Command} from "@types";

export const Creator: Command = {
    name: 'creator',
    description: 'Para criadores de conteúdo...',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {

        const timeout = 300000;

        const ids = {
            contentCreatorKind: 'contentCreatorKind',
            contentCreatorLink: 'contentCreatorLink',
            contentCreatorBio: 'contentCreatorBio',
            contentCreatorModal: 'contentCreatorModal'
        }

        const contentCreatorKindInput = new ActionRowBuilder<TextInputBuilder>()
                .addComponents(
                    new TextInputBuilder()
                        .setCustomId(ids.contentCreatorKind)
                        .setLabel('Que tipo de criador?')
                        .setPlaceholder("Ex.: Twitch, Onlyfans, Youtube, Tiktok, Facebook")
                        .setRequired(true)
                        .setStyle(TextInputStyle.Short)
                );

        const contentCreatorLinkInput = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId(ids.contentCreatorLink)
                    .setLabel("Qual o link do seu conteúdo principal?")
                    .setRequired(true)
                    .setStyle(TextInputStyle.Short)
            );

        const contentCreatorBioInput = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId(ids.contentCreatorBio)
                    .setLabel("Escreva uma pequena biografia sua!")
                    .setPlaceholder("Ex.: Oi gente eu sou a Beah e faço lives há um ano na Twitch. Espero vocês na minha live <3!")
                    .setRequired(false)
                    .setStyle(TextInputStyle.Paragraph)

            )

        const modalContentCreator = new ModalBuilder()
            .setCustomId(ids.contentCreatorModal)
            .setTitle('Se torne um criador de conteúdo parceiro')
            .addComponents(contentCreatorKindInput, contentCreatorLinkInput, contentCreatorBioInput)

        await interaction.showModal(modalContentCreator);

        const modalContentCreatorInteraction =  await interaction.awaitModalSubmit({
            time: timeout,
            filter: (newInteraction: ModalSubmitInteraction) => newInteraction.customId == ids.contentCreatorModal
        });

        //TODO: Register on guild database and check if guild has been configured to set any role to user

    }
}