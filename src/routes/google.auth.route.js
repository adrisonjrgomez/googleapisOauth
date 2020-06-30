const route = require("express").Router();
const { getRoute, getToken, getUserData } = require("../auth/google.auth");

route.get("/google/oauth", (req, res) => {
  const url = getRoute();
  res.redirect(url);
});

route.get("/google/oauth/callback", async (req, res) => {
  const code = req.query.code;
  console.log(code);
  if (!code) return res.redirect("/fail");
  try {
    const tokens = await getToken(code);
    const userData = await getUserData();
    res.json(userData);
  } catch (error) {
    console.log(error.response.data);
    return res.redirect("http://localhost:4000/fail");
  }
});

module.exports = route;
