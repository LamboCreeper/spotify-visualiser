const poster = document.querySelector("#poster");
const output = document.querySelector("#output");
const downloadButton = document.querySelector("#poster-download");

downloadButton.addEventListener("click", async () => {
    const canvas = await html2canvas(poster);
    const img = canvas.toDataURL("image/jpeg");

    window.open(img);
});
(async () => output.append(await html2canvas(poster)))();