// Purpose: Verify the JWT token of the user.
import useJwtStore from "./jwtStore";

async function JwtVerify() {
  const { jwt } = useJwtStore.getState();

  if (!jwt) {
    console.error("No JWT token found");
    return false;
  }

  //console.log(jwt);
  //console.log(typeof jwt);

  const response = await fetch(import.meta.env.VITE_API_URL + "auth/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ token: jwt }),
  });
  //console.log(response);

  const data = await response.json();
  //console.log(data);

  if (data.verified) {
    return true;
  } else {
    return false;
  }
}

export default JwtVerify;
