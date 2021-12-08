const passwordLength = document.querySelector(".password-length");

passwordLength.addEventListener("input", ({ target }) => {
  const length = target.value;

  setPassword(generatePassword(length));
});

const generatePassword = (length) => {
  return Math.floor(Math.random() * 10 ** length);
};

const setPassword = (password) => {
  document.querySelector(".password").value = password;

  return password;
};

setPassword(generatePassword(passwordLength.value));
