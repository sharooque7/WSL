import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  // function handleApiErros(errors) {
  //   if (errors) {
  //     errors?.forEach((error) => {
  //       if (error.includes("password")) {
  //         setError("password", { message: error });
  //       } else if (error.includes("email")) {
  //         setError("email", { message: error });
  //       } else if (error.includes("firstname")) {
  //         setError("firstname", { message: error });
  //       } else if (error.includes("lastname")) {
  //         setError("lastname", { message: error });
  //       } else if (error.includes("gender")) {
  //         setError("gender", { message: error });
  //       } else if (error.includes("phone")) {
  //         setError("phone", { message: error });
  //       }
  //     });
  //   }
  // }

  return (
    <ThemeProvider theme={theme}>
      <Container
        fixed
        component={Paper}
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(async (data) => {
            try {
              const result = await agent.Account.register(data);
              console.log(result);
              if (result) {
                toast.success("Registration successfull! Please login");
                navigate("/login");
              }
            } catch (error) {
              console.log(error);
              //   handleApiErros(error);
            }
          })}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="First Name*"
            autoFocus
            {...register("firstname", {
              required: "Firstname is required",
            })}
            error={!!errors.firstname}
            helperText={errors?.firstname?.message.toString()}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Last Name*"
            {...register("lastname", {
              required: "Lastname is required",
            })}
            error={!!errors.lastname}
            helperText={errors?.lastname?.message.toString()}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Gender*"
            {...register("gender", {
              required: "Gender is required",
            })}
            error={!!errors.gender}
            helperText={errors?.gender?.message.toString()}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Phone*"
            {...register("phone", {
              required: "Phone number is required",
            })}
            error={!!errors.phone}
            helperText={errors?.phonhe?.message.toString()}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                message: "Not a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message: "password does not meet complexity criteria",
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to="/login">{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
