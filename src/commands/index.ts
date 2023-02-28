import { Command } from "@types";
import { Book } from "./book.command";
import { AskGpt } from "./gpt.command";

export { Book } from "./book.command";
export { AskGpt } from "./gpt.command";

export const Commands: Command[] = [Book, AskGpt];