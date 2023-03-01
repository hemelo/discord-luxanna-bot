import {expect, describe, it} from "@jest/globals";

import {StreamRegex} from "@constants";

describe('Twitch TV Link Regex', () => {
    const twitchRegex = StreamRegex.TWITCH_URL;

    it('should match a valid Twitch TV link with https and www', () => {
        const link = 'https://www.twitch.tv/mychannel';
        expect(twitchRegex.test(link)).toBe(true);
    });

    it('should match a valid Twitch TV link with https and no www', () => {
        const link = 'https://twitch.tv/mychannel';
        expect(twitchRegex.test(link)).toBe(true);
    });

    it('should match a valid Twitch TV link with http and no www', () => {
        const link = 'http://twitch.tv/mychannel';
        expect(twitchRegex.test(link)).toBe(true);
    });

    it('should match a valid Twitch TV link with no protocol and no www', () => {
        const link = 'twitch.tv/mychannel';
        expect(twitchRegex.test(link)).toBe(true);
    });

    it('should not match a Twitch TV link with an invalid channel name', () => {
        const link = 'https://www.twitch.tv/my_channel_123456789012345678901';
        expect(twitchRegex.test(link)).toBe(false);
    });

    it('should not match a Twitch TV link with an invalid subdomain', () => {
        const link = 'https://clips.twitch.tv/myclip';
        expect(twitchRegex.test(link)).toBe(false);
    });

    it('should not match a Twitch TV link with an invalid path', () => {
        const link = 'https://www.twitch.tv/mychannel/videos/all';
        expect(twitchRegex.test(link)).toBe(false);
    });
});

/**
 * Each test should test every youtube regex
 */
describe('YouTube Link Multiple Regex Tests', () => {
    const youtubeLiveRegex = StreamRegex.YOUTUBE_URL_LIVE;
    const youtubeNonLiveRegex = StreamRegex.YOUTUBE_URL_NON_LIVE;
    const youtubeProfileRegex = StreamRegex.YOUTUBE_URL_PROFILE;

    it('video link with https and www', () => {
        const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        expect(youtubeNonLiveRegex.test(link)).toBe(true);
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(false);
    });

    it('video link with https and no www', () => {
        const link = 'https://youtube.com/watch?v=dQw4w9WgXcQ';
        expect(youtubeNonLiveRegex.test(link)).toBe(true);
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(false);
    });

    it('video link with http and no www', () => {
        const link = 'http://youtube.com/watch?v=dQw4w9WgXcQ';
        expect(youtubeNonLiveRegex.test(link)).toBe(true);
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(false);
    });

    it('short video link with https and www', () => {
        const link = 'https://youtu.be/dQw4w9WgXcQ';
        expect(youtubeNonLiveRegex.test(link)).toBe(true);
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(false);
    });

    it('short video link with https and no www', () => {
        const link = 'https://youtu.be/dQw4w9WgXcQ';
        expect(youtubeNonLiveRegex.test(link)).toBe(true);
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(false);
    });

    it('video link with additional query parameters', () => {
        const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=5s';
        expect(youtubeNonLiveRegex.test(link)).toBe(true);
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(false);
    });

    it('channel live stream link', () => {
        const link = 'https://www.youtube.com/channel/UC1234567890/live';
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
        expect(youtubeLiveRegex.test(link)).toBe(true);
        expect(youtubeProfileRegex.test(link)).toBe(true);
    });

    it('channel videos link', () => {
        const link = 'https://www.youtube.com/channel/UC1234567890/videos';
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(true);
    });

    it('user link', () => {
        const link = 'https://www.youtube.com/user/myusername';
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(true);
    });

    it('link with the word "live" in the path', () => {
        const link = 'https://www.youtube.com/watch/live';
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
        expect(youtubeLiveRegex.test(link)).toBe(true);
        expect(youtubeProfileRegex.test(link)).toBe(false);
    });

    it('channel live stream link with https and www', () => {
        const link = 'https://www.youtube.com/channel/UC1234567890/live';
        expect(youtubeLiveRegex.test(link)).toBe(true);
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(true);
    });

    it('channel live stream link with https and no www', () => {
        const link = 'https://youtube.com/channel/UC1234567890/live';
        expect(youtubeLiveRegex.test(link)).toBe(true);
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
    });

    it('channel live stream link with http and no www', () => {
        const link = 'http://youtube.com/channel/UC1234567890/live';
        expect(youtubeLiveRegex.test(link)).toBe(true);
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(true);
    });

    it('username live stream link with a user ID instead of channel ID', () => {
        const link = 'https://www.youtube.com/user/myusername/live';
        expect(youtubeLiveRegex.test(link)).toBe(true);
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(true);
    });

    it('channel live stream link without the /live path', () => {
        const link = 'https://www.youtube.com/channel/UC1234567890';
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(true);
    });

    it('channel link with /videos', () => {
        const link = 'https://www.youtube.com/channel/UC1234567890/videos';
        expect(youtubeLiveRegex.test(link)).toBe(false);
        expect(youtubeNonLiveRegex.test(link)).toBe(false);
        expect(youtubeProfileRegex.test(link)).toBe(true);
    });
});

describe('Facebook live video regex', () => {
    
    const regex = StreamRegex.FACEBOOK_URL;
    
    it('Matches a basic live video URL', () => {
        const url = 'https://www.facebook.com/username/live/123456789012345';
        expect(regex.test(url)).toBe(true);
    });

    it('Matches a live video URL with an "events" subdirectory', () => {
        const url = 'https://www.facebook.com/username/live/events/123456789012345';
        expect(regex.test(url)).toBe(true);
    });

    it('Matches a video URL', () => {
        const url = 'https://www.facebook.com/video/video.php?v=123456789012345';
        expect(regex.test(url)).toBe(true);
    });

    it('Matches a live video URL with a subpath', () => {
        const url = 'https://www.facebook.com/username/live/123456789012345?foo=bar';
        expect(regex.test(url)).toBe(true);
    });

    it('Does not match a non-Facebook URL', () => {
        const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        expect(regex.test(url)).toBe(false);
    });

    it('Does not match an invalid profile URL', () => {
        const url = 'https://www.facebook.com/profile.php?id=1234567890';
        expect(regex.test(url)).toBe(false);
    });

    it('Matches a user profile URL', () => {
        const url = 'https://www.facebook.com/username/profile';
        expect(regex.test(url)).toBe(true);
    });
});

describe('OnlyFans link regex', () => {

    const regex = StreamRegex.ONLYFANS_URL;

    it('Matches a basic OnlyFans link', () => {
        const url = 'https://onlyfans.com/username';
        expect(regex.test(url)).toBe(true);
    });

    it('Matches a link with "www." subdomain', () => {
        const url = 'https://www.onlyfans.com/username';
        expect(regex.test(url)).toBe(true);
    });

    it('Matches a link with "http://" protocol', () => {
        const url = 'http://onlyfans.com/username';
        expect(regex.test(url)).toBe(true);
    });

    it('Matches a link with uppercase characters in username', () => {
        const url = 'https://onlyfans.com/USERNAME';
        expect(regex.test(url)).toBe(true);
    });

    it('Matches a link with numbers in username', () => {
        const url = 'https://onlyfans.com/user1234';
        expect(regex.test(url)).toBe(true);
    });

    it('Matches a link with underscores in username', () => {
        const url = 'https://onlyfans.com/user_name';
        expect(regex.test(url)).toBe(true);
    });

    it('Does not match a non-OnlyFans link', () => {
        const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        expect(regex.test(url)).toBe(false);
    });

    it('Match a link with a path after username', () => {
        const url = 'https://onlyfans.com/username/photos';
        expect(regex.test(url)).toBe(true);
    });

    it('Match a link with invalid characters in username', () => {
        const url = 'https://onlyfans.com/user@name';
        expect(regex.test(url)).toBe(true);
    });
});