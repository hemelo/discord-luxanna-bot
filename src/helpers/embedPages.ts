import { 
    ActionRowBuilder, 
    ButtonBuilder,
    ButtonStyle, 
    ButtonInteraction, 
    EmbedBuilder, 
    CollectorFilter, 
    CacheType, 
    User,
    CommandInteraction,
    ComponentType
} from 'discord.js';


export class EmbedUtils {
    static notFoundResponse (): EmbedBuilder {
        return new EmbedBuilder()
            .setTitle("Whops...")
            .setDescription("Parece que não encontrei nada... Tente novamente.")
            .setColor('DarkRed')
    }
    
    static setUserFooter(embed: EmbedBuilder, user: User) {
        return embed.setFooter({ text: user.username, iconURL: user.defaultAvatarURL })
    }
}

export class EmbedWithPages {

    static PreviewButtonID = 'prev_embed';
    static NextButtonID = 'next_embed';

    private currentEmbedIndex: number;

    constructor(
        private embeds: EmbedBuilder[],  
        private filter: CollectorFilter<[ButtonInteraction<CacheType>]>, 
        private interaction: CommandInteraction
    ) {
        
        this.currentEmbedIndex = 0;
        this.embeds = embeds;
        this.interaction = interaction;
        this.filter = filter;

        this.afterInit();
    }

    private async afterInit() {
        
        const message = await this.interaction.followUp({
            ephemeral: true,
            embeds: [this.embeds[this.currentEmbedIndex]],
            components: [this.getButtons()]
        });

        const collector = message.createMessageComponentCollector({ filter: this.filter,  componentType: ComponentType.Button, time: 300000 });

        collector.on('collect', (element) => {
            if (!element || ![EmbedWithPages.PreviewButtonID, EmbedWithPages.NextButtonID].includes(element?.customId)) return;
    
            element.deferUpdate();
            
            let nextEmbed = null;
    
            switch (element.customId) {
                case EmbedWithPages.PreviewButtonID:
                    
                    if (this.currentEmbedIndex > 0) {
                        nextEmbed = this.embeds[--this.currentEmbedIndex];
                    }
    
                    break;
                case EmbedWithPages.NextButtonID:
                    
                    if (this.currentEmbedIndex < this.embeds.length - 1) {
                        nextEmbed = this.embeds[++this.currentEmbedIndex];
                    }

                    break;
                default:
                    nextEmbed = this.embeds[this.currentEmbedIndex];
            }

            this.onPageChange(nextEmbed!);
        })
    }

    static getButtons(index: number, last: number) {
        return new ActionRowBuilder<ButtonBuilder>()
            .addComponents([
                    new ButtonBuilder()
                        .setCustomId(EmbedWithPages.PreviewButtonID)
                        .setDisabled(index == 0)
                        .setEmoji('⬅️')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(EmbedWithPages.NextButtonID)
                        .setDisabled(index == last)
                        .setEmoji('➡️')
                        .setStyle(ButtonStyle.Secondary)

                ]
            );
    }

    private getButtons () {
        return EmbedWithPages.getButtons(this.currentEmbedIndex, this.embeds.length - 1);
    }

    private onPageChange(embed: EmbedBuilder) {
        this.interaction.editReply({
            embeds: [embed],
            components: [this.getButtons()]
        })
    }
}

