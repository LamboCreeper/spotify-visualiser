const poster = document.querySelector("#poster");
const output = document.querySelector("#output");
const downloadButton = document.querySelector("#poster-download");
const selectPosterBackground = document.querySelector("#poster-background");
const selectPosterText = document.querySelector("#poster-text");
const selectItalicFont = document.querySelector("#poster-font-italic");
const selectUnderlinedFont = document.querySelector("#poster-font-underlined");

const colours = [
    "white",
    "black",
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "pink"
];

selectPosterBackground.addEventListener("change", ({ target }) => {
    const { value } = target;

    colours.forEach((colour) => {
        if (poster.classList.contains(`poster-background-${colour}`)) {
            poster.classList.remove(`poster-background-${colour}`);
        }
    });

    poster.classList.add(`poster-background-${value}`);
});

selectPosterText.addEventListener("change", ({ target }) => {
    const { value } = target;

    colours.forEach((colour) => {
        if (poster.classList.contains(`poster-text-${colour}`)) {
            poster.classList.remove(`poster-text-${colour}`);
        }
    });

    poster.classList.add(`poster-text-${value}`);
});

selectItalicFont.addEventListener("change", ({ target }) => {
    const { checked } = target;

    if (!checked) {
        poster.classList.remove("poster-font-italic");
    } else {
        poster.classList.add("poster-font-italic");
    }
});

selectUnderlinedFont.addEventListener("change", ({ target }) => {
    const { checked } = target;

    if (!checked) {
        poster.classList.remove("poster-font-underlined");
    } else {
        poster.classList.add("poster-font-underlined");
    }
});

downloadButton.addEventListener("click", async () => {
    const canvas = await html2canvas(poster);
    const img = canvas.toDataURL("image/jpeg");

    window.open(img);
});

(async () => output.append(await html2canvas(poster)))();