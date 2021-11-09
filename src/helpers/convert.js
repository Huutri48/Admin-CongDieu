export function convertLinkYoutubeToEmbed(url) {
	// https://www.youtube.com/embed/
	let yt = "https://www.youtube.com/embed/";
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);
	return (match && match[2].length === 11) ? yt += match[2] : null;
}