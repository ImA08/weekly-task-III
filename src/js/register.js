import { checkDuplikat, validateEmail, validatePwd } from "./utils.js";

const formRegister = document.querySelector("form");

const invalidEmail = () =>
  (document.querySelector(".register form .invalid-email").style.visibility =
    "visible");

const invalidPwd = () =>
  (document.querySelector(".register form .invalid-pwd").style.visibility =
    "visible");

const unChecked = () =>
  (document.querySelector(".register form .not-checked").style.visibility =
    "visible");

formRegister.addEventListener("submit", onSubmitHandler);

async function onSubmitHandler(e) {
  e.preventDefault();
  const email = e.target["email"].value;
  const pwdInput = e.target["password"].value;
  const checkStatus = e.target["term-conditions"].checked;

  if (!checkStatus) {
    unChecked();
    return;
  }
  if (validateEmail(email) === false) {
    invalidEmail();
    return;
  }
  if (validatePwd(pwdInput) === false) {
    invalidPwd();
    return;
  }

  if (!checkDuplikat(email)) {
    popUpMenu();
    return;
  }

  const UserData = {
    email,
    pwdInput,
  };

  localStorage.setItem("signUpData", JSON.stringify(UserData));

  window.location.href = "../pages/signIn.html";
}

const popUp = document.querySelector("section.pop-up");
const closeBtn = document.querySelector("section.pop-up button");

const popUpMenu = () => {
  popUp.style.display = "block";
};

const closeFunct = () => {
  popUp.style.display = "none"
};

closeBtn.addEventListener("click", closeFunct);

