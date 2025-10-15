let flipInterval;

function displayPoem(response) {
  console.log("poem generated");
  clearInterval(flipInterval);
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generatePoem(event) {
  event.preventDefault();
  let promptInput = document.querySelector("#user-prompt");
  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  let apiKey = "tfo33b89af42954f2d60430a801e1b3c";
  let context =
    "You are a romantic Poem expert and love to write short poems. Your mission is to generate a four line poem in basic HTML, and make sure to separate each line with <br />. Make sure to follow the user instructions. Sign the poem with 'SheCodes AI` inside a <strong> element. Do not include ```html or ```";
  let prompt = `User Instructions: Generate a french poem about ${promptInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let flip = true;
  poemElement.innerHTML = `<span id="loading" class="flip">⏳</span> Generating a poem about ${promptInput.value}`;
  flipInterval = setInterval(() => {
    poemElement.innerHTML = `${flip ? "⌛️" : "⏳"} Generating a poem about ${
      promptInput.value
    }`;
    flip = !flip;
  }, 500);

  console.log("Generating poem");
  console.log(`Prompt: ${prompt}`);
  console.log(`Context ${context}`);

  axios.get(apiURL).then(displayPoem);
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
