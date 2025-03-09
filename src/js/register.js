import { validateEmail } from "./utils.js";

const formRegister = document.querySelector("form");

const invalidEmail = () => document.querySelector(".register form .invalid-email").style.visibility ="visible";

const invalidPwd = () => document.querySelector(".register form .invalid-pwd").style.visibility ="visible";

const notChecked = () => document.querySelector(".register form .not-checked").style.visibility ="visible";

formRegister.addEventListener("submit", onSubmitHandler);

async function onSubmitHandler(e) {
  e.preventDefault();
  const emailInput = e.target["email"].value;
  const pwdInput = e.target["password"].value;
  const checkStatus = e.target["term-conditions"].checked;
  

  validateEmail(emailInput,invalidEmail);
  if(!checkStatus){
        notChecked();    
    return;
  }

  window.location.href= "../pages/signIn.html"
}
