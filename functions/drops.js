const axios = require("axios");
const cheerio = require("cheerio");

const scrapeUrl = "https://deekaykwon.com/letswalk";

exports.handler = async (event, context) => {
	const { data: html } = await axios.get(scrapeUrl);
	const $ = cheerio.load(html);
	const images = [];

	$(".image-block-wrapper img").each((i, image) => {
		const src = $(image).attr("data-image");
		const alt = $(image).attr("alt");
		const [name, number] = alt.split(" #");

		if (alt) images.push({ src, alt, name, number });
	});

	return {
		statusCode: 200,
		body: JSON.stringify(images),
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	};
};
