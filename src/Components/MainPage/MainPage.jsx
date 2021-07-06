import { Box, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";

import getEmbeddedToken from "../../Services/EmbeddedToken/embeddedToken";
import DisplayValueTable from "./LeftPanel/DisplayValueTable";
import LoginForm from "./LeftPanel/LoginForm";
import TokenForm from "./LeftPanel/TokenForm";

import PowerBiContainer from "./RightPanel/PowerBiContainer";

const MasterLayout = (props) => {
  const [username, setUserName] = useState("");
  const [azureAdToken, setazureAdToken] = useState("");
  const [embeddedToken, setEmbeddedToken] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (username == null || azureAdToken == null) return;

      try {
        const result = await getEmbeddedToken(username, azureAdToken);
        setEmbeddedToken(result.data.token);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [username, azureAdToken]);

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ width: "400px", backgroundColor: "" }}>
          <props.LeftPanel
            {...{
              username,
              azureAdToken,
              embeddedToken,
              setUserName,
              setazureAdToken,
              setEmbeddedToken,
            }}
          />
        </div>
        <div style={{ flexGrow: 1, backgroundColor: "", overflowX: "auto" }}>
          <props.RightPanel {...{ embeddedToken }} />
        </div>
      </div>
    </div>
  );
};

const LeftPanel = (props) => {
  const {
    username,
    azureAdToken,
    embeddedToken,
    setUserName,
    setazureAdToken,
  } = props;

  const handleUserClick = (username) => {
    setUserName(username);
  };

  const handleTokenClick = (azureAdToken) => {
    setazureAdToken(azureAdToken);
  };

  return (
    <Box>
      <Box
        px={2}
        py={1}
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <LoginForm handleOnClick={handleUserClick} />
      </Box>
      <Box
        px={2}
        py={1}
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <TokenForm username={username} handleOnClick={handleTokenClick} />
      </Box>
      <Box
        px={2}
        py={1}
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        <DisplayValueTable {...{ username, azureAdToken, embeddedToken }} />
      </Box>
    </Box>
  );
};

const RightPanel = ({ embeddedToken }) => (
  <Box
    px={4}
    py={4}
    justifyContent="center"
    display="flex"
    alignItems="center"
    height="100%"
    boxSizing="border-box"
  >
    <Paper
      variant="outlined"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PowerBiContainer key={embeddedToken} {...{ embeddedToken }} />
    </Paper>
  </Box>
);

export default function MainPage() {
  return (
    <div>
      <MasterLayout LeftPanel={LeftPanel} RightPanel={RightPanel} />
    </div>
  );
}
