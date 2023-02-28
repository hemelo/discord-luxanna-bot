import {Configuration, OpenAIApi} from "openai";

export class OpenAiApi {
    static async askGpt(prompt: string, model: 'gpt-3.5-turbo'): Promise<string> {
        if (!this._api) throw Error();

        try {
            const response = await OpenAiApi._api?.createChatCompletion({
                model, messages: [{ role: "user", content: prompt }]
            });

            return response?.data?.choices[0]?.message?.content ?? "Triste... Não pude entender o que me enviou :(";
        } catch (error: any) {

            if (error.response) {
                console.error(error.response.data.error.message);
            }

            return "Eita... Parece que não estou funcionando muito bem no momento :/";
        }
    }

    private static _api?: OpenAIApi;

    static connect(config: Configuration) {
        OpenAiApi._api = new OpenAIApi(config);
    }


}