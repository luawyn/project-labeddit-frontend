export const goToHomePage = (navigate) => {
  navigate("/");
};

export const goToSignupPage = (navigate) => {
  navigate("/signup");
};

export const goToLoginPage = (navigate) => {
  navigate("/login");
};

export const goToCommentPage = (navigate, id) => {
  navigate(`/posts/comment/${id}`);
};
