export default function convertYoutubeLink(url: string) {
    if (!url) return "";

    // Case 1: Short link youtu.be
    if (url.includes("youtu.be")) {
        const videoId = url.split("youtu.be/")[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    // Case 2: Normal YouTube watch link
    if (url.includes("watch?v=")) {
        const videoId = url.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }

    // Case 3: Embed already
    if (url.includes("embed")) {
        return url;
    }

    return url;
}