import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { authService } from "../../../Services/Auth/auth";

export default function LoginForm({ handleOnClick }) {
  const [customError, setCustomError] = useState("");
  const onSumbit = async (
    values,
    { resetForm, setErrors, setSubmitting, setFieldValue }
  ) => {
    setSubmitting(true);
    try {
      await authService(values);
      handleOnClick(values.username);
      resetForm();
      setCustomError("");
    } catch (err) {
      setCustomError("Incorrect username or password.");
    }
  };

  const initialValues = { username: "", password: "" };
  const theme = useTheme();
  return (
    <Paper variant="outlined" style={{ width: "100%" }}>
      <Formik initialValues={initialValues} onSubmit={onSumbit}>
        {(props) => (
          <Form>
            <Box
              boxSizing="border-box"
              p={2}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography align="center">User Credentials</Typography>
              <Field
                as={TextField}
                margin="dense"
                label="Username"
                name="username"
                required
              />
              <Field
                as={TextField}
                margin="dense"
                name="password"
                label="Password"
                type="password"
                required
              />
              <Box mt={1}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={props.isSubmitting}
                  onClick={props.handleSubmit}
                >
                  Sign In
                </Button>
                <Box
                  height={theme.spacing(3)}
                  display="flex"
                  justifyContent="center"
                  alignItems="flex-end"
                >
                  <Typography color="error" variant="caption">
                    {customError}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
