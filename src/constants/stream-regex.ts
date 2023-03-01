export class StreamRegex {
    static FACEBOOK_URL = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:video\/video\.php\?v=\d+|[^\/]+\/(?:live|profile)(?:\/(?:\d+|videos))?)(?:\/\S*)?/;
    static TWITCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:twitch\.tv\/)([a-zA-Z0-9_]{4,25})$/;

// ending in /live
    static YOUTUBE_URL_LIVE = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:channel\/|user\/)?[\w]+\/live)$/i;

    static YOUTUBE_URL_NON_LIVE = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;

    static YOUTUBE_URL_PROFILE = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:channel\/|user\/)|youtube\.com\/c\/)([a-zA-Z0-9_-]+)(?:\/.*)?$/;

    static ONLYFANS_URL =/https?:\/\/(?:www\.)?onlyfans\.com\/([a-zA-Z0-9_]{3,20})(?!\/)(?![^<>]*>)/;
}