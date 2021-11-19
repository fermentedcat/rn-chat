export const validateString = (string) => string.trim().length > 0

export const validatePasswordConfirm = (password, confirmPassword) => {
  return password === confirmPassword
}

export const validateFullName = (string) => {
  return validateString(string) && string.trim().length < 50
}

export const validateUsername = (string) => {
  const regex = /^[a-zA-Z0-9_\-\.]{1,20}$/
  return string.match(regex)
}

export const validatePassword = (string) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  return string.match(regex)
}

export const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regex);
}