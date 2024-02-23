const passInput = document.querySelector("#userPassword");
const passConfirmInput = document.querySelector("#userPasswordConfirm");
// const format = document.querySelector("#format");
const inputFields = document.querySelectorAll("input");
const infoPromptTextElements = document.querySelectorAll(".infoPrompt");

let pass;
let passConfirm;

inputFields.forEach(function (input) {
  let timeoutId;

  input.addEventListener("focus", function () {
    // Clear any existing timeout for this input field
    clearTimeout(timeoutId);

    // Remove the 'show' class from all format text elements
    infoPromptTextElements.forEach(function (formatText) {
      formatText.classList.remove("show");
    });

    // Start a new timeout for this input field
    timeoutId = setTimeout(function () {
      if (input.value.trim() === "") {
        console.log("focus ran");
        showFormatText(input);
      }
    }, 4000);
  });

  input.addEventListener("input", function () {
    const isValid = this.checkValidity();
    // Remove the 'show' class when the user starts typing
    infoPromptTextElements.forEach(function (formatText) {
      formatText.classList.remove("show");
    });

    if (!isValid) {
      //Remove the 'active' class when user empties the input field
      if(input.value === "" || input.value === null){
        removeFormatText(input);
      }
      else{
        showFormatTextOnInvalid(input);
      }
    }
    else{
      removeFormatText(input);
    }

    // Clear the timeout when the user starts typing
    clearTimeout(timeoutId);
  });

  input.addEventListener("blur", function () {
    // Clear the timeout when the input loses focus
    clearTimeout(timeoutId);
  });
});

function showFormatText(input) {
  // Find the corresponding format text for the input
  const formatText = input
    .closest(".formControlWrapper")
    .querySelector(".infoPrompt");
  // Add the 'show' class to display the format text
  formatText.classList.add("show");
}

function showFormatTextOnInvalid(input) {
  const formatText = input
    .closest(".formControlWrapper")
    .querySelector(".infoPrompt");
  formatText.classList.add("active");
}

function removeFormatText(input) {
  const formatText = input.closest(".formControlWrapper").querySelector(".infoPrompt");
  formatText.classList.remove("active");
}

passInput.addEventListener("keyup", (e) => {
  pass = e.target.value;
})

passConfirmInput.addEventListener("keyup", (e) => {
  passConfirm = e.target.value;
  if (pass === undefined || pass === "" || passConfirm === "") {
    passConfirmInput.style.border = "1px solid red";
    const formatText = passConfirmInput.closest(".formControlWrapper").querySelector(".infoPrompt .format");
    formatText.textContent = "Please enter a password to confirm";
    const formatTextElement = passConfirmInput.closest(".formControlWrapper").querySelector(".infoPrompt");
    formatTextElement.classList.add("active");
  } else {
    confirmPassword();
  }
});

function confirmPassword() {
  if (pass === passConfirm) {
    passConfirmInput.style.border = "1px solid green";
  } else {
    const formatTextElement = passConfirmInput.closest(".formControlWrapper").querySelector(".infoPrompt");
    const formatText = passConfirmInput.closest(".formControlWrapper").querySelector(".infoPrompt .format");
    formatText.textContent = "Password does not match";
    passConfirmInput.style.border = "1px solid red";
    formatTextElement.classList.add("active");
  }
}
