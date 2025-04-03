export function authGuard() {
  if (!localStorage.getItem('JWT_TOKEN')) {
      alert("You must be logged in to view this page");
      window.location.href = "/auth/login/index.html";
  }
}

export function checkLoginState() {
  const token = localStorage.getItem('JWT_TOKEN');
  return token !== null;
}