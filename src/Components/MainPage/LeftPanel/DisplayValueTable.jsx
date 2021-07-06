import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";

export default function DisplayValueTable({
  username,
  azureAdToken,
  embeddedToken,
}) {
  const MyRow = ({ row }) => {
    const [collapse, setCollapse] = useState(true);

    return (
      <TableRow>
        <TableCell component="th" scope="row" width="40%">
          {row.name}
        </TableCell>
        <TableCell
          align="right"
          width="60%"
          onClick={() => setCollapse(!collapse)}
          style={
            collapse
              ? {
                  maxWidth: "0",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }
              : { wordWrap: "anywhere" }
          }
        >
          {row.value}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Paper variant="outlined" style={{ width: "100%" }}>
      <TableContainer>
        <Table aria-label="simple table" size="medium">
          <TableHead>
            <TableRow>
              <TableCell width="40%">Variable</TableCell>
              <TableCell align="right" width="60%">
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <MyRow row={{ name: "Username", value: username }} />
            <MyRow row={{ name: "Azure AD Token", value: azureAdToken }} />
            <MyRow row={{ name: "Embedded Token", value: embeddedToken }} />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
