import axios from "axios";

export const handleFaydaCallback = async (req, res) => {
  const { code } = req.body;

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await axios.post(
      "https://fayda-id.gov.et/auth/realms/fayda/protocol/openid-connect/token",
      new URLSearchParams({
        client_id: process.env.FAYDA_CLIENT_ID,
        client_secret: process.env.FAYDA_CLIENT_SECRET,
        code,
        redirect_uri: process.env.FAYDA_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenResponse.data;

    // Get user info using access token
    const userResponse = await axios.get(
      "https://fayda-id.gov.et/auth/realms/fayda/protocol/openid-connect/userinfo",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const user = userResponse.data;

    // TODO: Save user info to your DB or create session here

    res.json({ token: access_token, user });
  } catch (error) {
    console.error("Error during Fayda login:", error.response?.data || error.message);
    res.status(500).json({ message: "Login failed" });
  }
};
