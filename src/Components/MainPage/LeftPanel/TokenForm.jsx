import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";

export default function TokenForm(props) {
  console.log(props);
  const { handleOnClick } = props;

  const theme = useTheme();
  return (
    <Box width="100%">
      <Paper variant="outlined">
        <Formik
          initialValues={{ azureAdToken: "" }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            setSubmitting(false);
            handleOnClick(values.azureAdToken);
            resetForm();
          }}
        >
          {(props) => (
            <Form>
              <Box
                boxSizing="border-box"
                p={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography align="center">Azure AD Credentials</Typography>
                <Field
                  as={TextField}
                  required
                  margin="normal"
                  label="Azure AD Token"
                  name="azureAdToken"
                  autoComplete="off"
                />
                <Box mt={1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={props.isSubmitting}
                  >
                    Refresh
                  </Button>
                  <Box
                    height={theme.spacing(3)}
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    <Typography color="error" variant="caption">
                      {props.errors.response}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
