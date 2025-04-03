export function authGuard(silent = false) {
  if (!isLoggedIn()) {
    if (!silent) {
      alert("You must be logged in to view this page");
      window.location.href = "/login.html";
    }
    return false;
  }
  return true;
}

export function isLoggedIn() {
  const token = localStorage.getItem('JWT_TOKEN');
  return token !== null;
}