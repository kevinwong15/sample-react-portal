import axios from "axios";

export default function getEmbeddedToken(username, azureAdToken) {
  const url = "https://api.powerbi.com/v1.0/myorg/GenerateToken";
  const bearerToken = azureAdToken;

  // const username = "a0005";
  const dataSetId = "2ea0d2de-d93b-4232-863d-e7d285d6e8bb";
  const reportId = "fc7a2666-8b6e-4594-a29b-577e45b9eb02";

  const dataBody = {
    datasets: [
      {
        id: dataSetId,
      },
    ],
    reports: [
      {
        id: reportId,
      },
    ],
  };

  const identityBody = {
    identities: [
      {
        username: username,
        roles: ["adviser"],
        datasets: [dataSetId],
      },
    ],
  };

  let data = "";

  if (username === "advisers") {
    data = { ...dataBody };
  } else {
    data = { ...dataBody, ...identityBody };
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + bearerToken,
  };

  let res = axios.post(url, data, { headers });
  return res;
}
