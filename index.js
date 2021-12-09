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

const generatePassword = (length) => {
  const passwordArray = generatePasswordArray(length);
  const passwordOptions = getPasswordOptions();

  let password = "";

  for (index of passwordArray) {
    password += generateChar(index, passwordOptions);
  }

  return password;
};

const generateChar = (index, passwordOptions) => {
  charIdx = Math.floor((index / 255) * passwordOptions.length) - 1;

  return passwordOptions[charIdx];
};

const setPassword = (password) => {
  document.querySelector(".password").value = password;

  return password;
};

const passwordGenerator = document.querySelector(".password-generator");

passwordGenerator.addEventListener("change", ({ target }) => {
  const length = getPasswordLength();

  setPassword(generatePassword(length));
});

setPassword(generatePassword(getPasswordLength()));
