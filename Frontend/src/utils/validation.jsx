const validateName = (name) => {
    console.log(name)
    const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    if (!name || name.length < 2 || name.length > 15) {
      return "Name must be between 2 and 15 characters.";
    }
    if (!nameRegex.test(name)) {
      return "Name must only contain letters and spaces.";
    }
    return true ;
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required.";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    return true;
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phone) {
      return "Phone number is required.";
    }
    if (!phoneRegex.test(phone)) {
      return "Invalid phone number format.";
    }
    return true;
  };
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      return "Password is required.";
    }
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return true;
  };

  export {
    validateEmail, 
    validatePhone, 
    validatePassword,
    validateName
  }