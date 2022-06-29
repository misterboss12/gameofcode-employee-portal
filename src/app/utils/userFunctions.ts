export function getEmployeeId() {
  return JSON.parse(sessionStorage.getItem('currentUser')).employee.id;
}

export function setUser(loginResponse) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  sessionStorage.setItem('currentUser', JSON.stringify(loginResponse.user));
  sessionStorage.setItem('currentJwt', loginResponse.jwt);
}

export function getCurrentUserObject() {
  return JSON.parse(sessionStorage.getItem('currentUser'));
}
export function getCurrentUser() {
  return sessionStorage.getItem('currentUser');
}
export function getJwt() {
  return sessionStorage.getItem('currentJwt');
}

export function removeUser() {
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentJwt');
}

export function getCurrentUserEmployee() {
  return JSON.parse(sessionStorage.getItem('currentUser')).employee;
}
