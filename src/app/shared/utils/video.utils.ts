export class VideoUtils {
    static convertYoutubeUrlToEmbed(url: string): string {
        return url.replace('watch?v=', 'embed/');
    }
}
