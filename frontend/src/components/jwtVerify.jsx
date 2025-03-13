// Purpose: Verify the JWT token of the user.
import useJwtStore from "./jwtStore";

async function JwtVerify() {
  const { jwt } = useJwtStore.getState();

  if (!jwt) {
    console.error("No JWT token found");
    return false;
  }

  const response = await fetch(import.meta.env.VITE_API_URL + "auth/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ token: jwt }),
  });

  const data = await response.json();

  return data.verified;
}

export default JwtVerify;
