const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  const createError = (message) => {
    const error = new Error(message);
    error.statusCode = 400;
    return error;
  };

  if (!/^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/.test(firstName.trim())) {
    throw createError("First name is not valid!");
  } else if (!/^[a-zA-Z]+(?:[ '-][a-zA-Z]+)*$/.test(lastName.trim())) {
    throw createError("Last name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw createError("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw createError("Please enter a strong password!");
  }
};

module.exports = {
  validateSignUpData,
};
