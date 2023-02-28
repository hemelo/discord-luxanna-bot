import { 
    CommandInteraction,
    Client, 
    ApplicationCommandType, 
    EmbedBuilder, 
    ButtonInteraction, 
    ApplicationCommandOptionType 
} from "discord.js";

import { Book as BookDto } from '@api/dto';
import { Command } from "@types";
import { BookApi } from "@api";
import { StringUtils, EmbedUtils, EmbedWithPages } from "@helpers";

const api = new BookApi();

export const Book: Command = {
    name: "book",
    description: "Procurar livros online",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "titulo",
            description: "Título para buscar",
            type: ApplicationCommandOptionType.String,
            minLength: 3,
            required: true,
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {

        await interaction.deferReply();

        let books = await api.fetchBooksFromName(interaction.options.get("titulo")?.value?.toString()!);

        // Remove books where important fields could not be find
        books = books?.filter(book => book.volumeInfo?.description ||  book.volumeInfo?.imageLinks?.smallThumbnail || book.volumeInfo?.imageLinks?.thumbnail);

        if (!books || !books.length) {

            await interaction.followUp({
                embeds: [EmbedUtils.notFoundResponse()],
            });

        } else if (books.length == 1) {

            await interaction.followUp({
                embeds: [bookToDetailedEmbed(books[0])],
            });

        } else {
            const embeds = books?.map(bookToSimpleEmbed);
            const filter = (newInteraction: ButtonInteraction) => newInteraction.user.id === interaction.user.id; 
            new EmbedWithPages(embeds, filter, interaction);
        }
    }
};

function bookToSimpleEmbed(book: BookDto): EmbedBuilder {

    const categoria = book.volumeInfo?.categories?.map(StringUtils.titleCase).join(', ');
    const autor = book.volumeInfo?.authors?.map(StringUtils.titleCase).slice(0, 3).join(', ');
    const dataPublicacao =  book.volumeInfo?.publishedDate;
    const descricao = book.volumeInfo?.description;
    const thumbnail = book.volumeInfo?.imageLinks?.smallThumbnail || book.volumeInfo?.imageLinks?.thumbnail;
    const titulo = StringUtils.titleCase(book.volumeInfo?.title);
    const editora = book.volumeInfo?.publisher;
    
    const embed = new EmbedBuilder()
        .setTitle(titulo);
    
    switch(book.volumeInfo.maturityRating) {
        case "MATURE":
            embed.setColor('Red');
            break;
        case "NOT_MATURE":
            embed.setColor('Purple');
            break;
        case "MAX_ALLOWED_MATURITY_RATING_UNDEFINED":
            embed.setColor('DarkButNotBlack');
            break;
        default:
            embed.setColor('Grey');
    }

    if (thumbnail) {
        embed.setThumbnail(thumbnail);
    }

    if (descricao) {
        embed.setDescription(descricao);
    }

    if (categoria) {
        embed.setFooter({ text: categoria });
    }
    if (autor) {
        embed.setAuthor({ name: autor });
    }
    if (dataPublicacao) {
        embed.addFields({ name: 'Publicado em', value: dataPublicacao, inline: true });
    }
    if (editora) {
        embed.addFields({ name: 'Publicado por', value: editora, inline: true });
    }

    return embed;
}

function bookToDetailedEmbed(book: BookDto): EmbedBuilder {
    return bookToSimpleEmbed(book);
}