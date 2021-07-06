import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "./PowerBiContainer.css";
import { report } from "../../../Helpers/constant";

const embedConfig = {
  type: "report", // Supported types: report, dashboard, tile, visual and qna
  id: report.id,
  embedUrl: report.embedUrl,
  accessToken: "",
  tokenType: models.TokenType.Embed,
  settings: {
    panes: {
      filters: {
        expanded: true,
        visible: false,
      },
      pageNavigation: {
        visible: false,
      },
    },
    background: models.BackgroundType.Transparent,
  },
};

const eventHandlers = new Map([
  [
    "loaded",
    function () {
      console.log("Report loaded");
    },
  ],
  [
    "rendered",
    function () {
      console.log("Report rendered");
    },
  ],
  [
    "error",
    function (event) {
      console.log(event.detail);
    },
  ],
]);

export default function PowerBiContainer({ embeddedToken }) {

  return (
    <>
      {/* {console.log({ ...embedConfig, accessToken: embeddedToken })} */}
      <PowerBIEmbed
        embedConfig={{ ...embedConfig, accessToken: embeddedToken }}
        eventHandlers={eventHandlers}
        cssClassName={"Embedded-container"}
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </>
  );
}
