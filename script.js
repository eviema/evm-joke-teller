const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMe(joke) {
  VoiceRSS.speech({
    // TODO Hide key in a server (free API so it's ok for now...)
    key: "077b717b8d884e8dacbf04476927eea3",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJoke() {
  toggleButton();
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    joke = data.joke || `${data.setup} ... ${data.delivery}`;
  } catch (error) {
    alert(
      "Whoops, the joke pool is currently unavailable. Please retry later."
    );
    toggleButton();
  }
  tellMe(joke);
}

button.addEventListener("click", getJoke);
audio.addEventListener("ended", toggleButton);
