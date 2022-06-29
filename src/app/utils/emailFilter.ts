const emailRegExp = /^([a-z])+@capeannenterprises.com$/;

export default function (email) {
  return emailRegExp.test(email);
}
