const btn = document.querySelector("form > button");
console.log(btn)


const login = () => {
  const savedData = localStorage.getItem("signUpData");
    console.log(savedData)
  if (!savedData) {
    alert("Belum ada akun yang terdaftar!");
    return;
  }

  const userData = JSON.parse(savedData);
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === userData.email && password === userData.pwdInput) {
    alert("Login berhasil! Selamat datang, ");
    window.location.href = "../../index.html";
  } else if(email==="" || password ===""){
    alert("Isi Inputan!")
  } else {
    alert("Email atau password salah!");
    return;
  }
}

btn.addEventListener("click", login);