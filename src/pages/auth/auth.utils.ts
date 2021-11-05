export const statics = {
  login: {
    title: "Login",
    path: "/sign-up",
    toTitle: "Sign Up",
    preFixOfText: "Don't",
  },
  signUp: {
    title: "Sign Up",
    path: "/login",
    toTitle: "Login",
    preFixOfText: "Already",
  },
};

export const injectAccessTokenTOLocalStorage = (token: string): void => {
  localStorage.setItem("accessToken", token);
};
