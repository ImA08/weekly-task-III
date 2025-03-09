// FUNGSI VALIDASI EMAIL

export const validateEmail = (inputEmail, err) => {
    let email  = inputEmail.trim(); // Hilangkan spasi di awal & akhir
    const atIndex = email.indexOf("@");
    const lastAtIndex = email.lastIndexOf("@");
    const lastDotIndex = email.lastIndexOf(".");
  
    // Cek apakah '@' ada dan tidak di awal atau akhir
    if (atIndex <= 0 || lastAtIndex > lastDotIndex ) {
      err();
      return;
    }
  
    // Cek apakah ada '.' setelah '@'
    if (lastDotIndex <= atIndex + 1 || lastDotIndex === email.length - 1) {
      err();
      return;
    }
  
    // Cek apakah email tidak diawali atau diakhiri dengan '.'
    if (email.startsWith(".") || email.endsWith(".")) {
      err();
      return;
    }
  
    // Cek apakah ada dua titik berturut-turut
    if (email.includes("..")) {
      err();
      return;
    }
  
    console.log("berhasil");
  };
