// @ts-check
const { google } = require("googleapis");
const oauth2 = google.oauth2("v2");

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  "http://localhost:4000/auth/google/oauth/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

exports.getRoute = () =>
  auth.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

exports.getToken = async (code) => {
  const { tokens } = await auth.getToken(code);
  auth.setCredentials(tokens);

  google.options({
    auth: auth,
  });
  return tokens;
};

exports.getUserData = async () => {
  const response = await oauth2.userinfo.get();
  return response.data;
};
