import { request } from "undici";
import { Book } from "@api/dto";
export class BookApi {
    
    async fetchBooksFromName(name: string) {
        const result = await request("https://www.googleapis.com/books/v1/volumes?q=" + name);
        const books: Book[] | null | undefined = (await result.body.json())?.items;
        return books;
    }
}