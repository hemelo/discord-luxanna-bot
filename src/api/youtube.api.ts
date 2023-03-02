import {request} from "undici";
import {YoutubeVideoList} from "@api/dto";
import {tokensConfig} from "@config";

export default class YoutubeApi {

    public static apiRequests = 0;

    private API_KEY: string | undefined;

    constructor() {
        this.API_KEY = tokensConfig.YOUTUBE_API_TOKEN;
    }

    async isStreaming(url: string) {

        // TODO: Parse ID
        const id = url;

        // TODO: Make api count extern through some service or db
        // TODO: Validate requestsCount, it should not be higher than the free limit
        YoutubeApi.apiRequests++;

        const result = await request(`https://www.youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${id}&key=${this.API_KEY}`);
        const data: YoutubeVideoList | null | undefined = (await result.body.json());

        if (data?.items == null || data.items.length == 0)
            throw Error("Video could not be found.");

        return data.items.at(0)?.liveStreamingDetails?.concurrentViewers != undefined;
    }
}