const passwordOptions = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/",
};

const getPasswordOptions = () => {
  const checkboxes = document.querySelectorAll(
    "input[name=password-options]:checked"
  );

  let options = "";

  for (checkbox of checkboxes) {
    options += passwordOptions[checkbox.value];
  }

  return options;
};

const getPasswordLength = () => {
  return document.querySelector(".password-length").value;
};

const generatePasswordArray = (length) => {
  const passwordArray = new Uint8Array(length);

  return crypto.getRandomValues(passwordArray);
};

const generatePassword = () => {
  const length = getPasswordLength();
  const passwordArray = generatePasswordArray(length);
  const passwordOptions = getPasswordOptions();

  let password = "";

  for (index of passwordArray) {
    password += generateChar(index, passwordOptions);
  }

  setPassword(password);

  return password;
};

const generateChar = (index, passwordOptions) => {
  charIdx = Math.floor((index / 256) * passwordOptions.length);

  return passwordOptions[charIdx];
};

const setPassword = (password) => {
  document.querySelector(".password").value = password;

  return password;
};

const passwordGenerator = document.querySelector(".password-generator");

passwordGenerator.addEventListener("input", () => {
  setPassword(generatePassword());
});

const rangeSelector = document.querySelector(".password-length");

rangeSelector.addEventListener("wheel", (e) => {
  e.preventDefault();

  const { deltaY } = e;

  if (deltaY > 0) {
    rangeSelector.value += 1;
  } else {
    rangeSelector.value -= 1;
  }

  const event = new Event("input");
  passwordGenerator.dispatchEvent(event);
});

const generatePasswordBtn = document.querySelector("button");

generatePasswordBtn.addEventListener("click", (e) => {
  generatePassword();
});

const checkboxes = document.querySelector(".checkboxes");

checkboxes.addEventListener("change", (e) => {
  const checkItems = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  if (checkItems.length === 0) {
    e.target.checked = true;
  }
});

generatePassword();
