import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addUserSkill, updateUserSkill } from "./skillSlice";
import { setOpen, setUpdate } from "../../app/model/formSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

export default function Tech() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { skill } = useSelector((state) => state?.skill);
  const { user } = useSelector((state) => state?.account);
  const { _id, update } = useSelector((state) => state?.modal);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  let needToUpdate =
    update && skill && _id !== ""
      ? skill?.filter((value) => value?._id === _id)
      : null;

  async function submitForm(data) {
    try {
      if (update) {
        const user_input_skill = { ...data, user: user && user?._id, _id };

        await dispatch(updateUserSkill(user_input_skill));
        await dispatch(setOpen(false));
      } else {
        const user_input_skill = { ...data, user: user && user?._id };
        await dispatch(addUserSkill(user_input_skill));
        await dispatch(setOpen(false));
      }
      await dispatch(setUpdate({ res: false, _id: "" }));

      navigate(location.state?.from || "/Skill");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component={Paper}
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Typography component="h1" variant="h5">
          {update ? "Upate Skill" : "Add Skill"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Language"
            autoFocus
            {...register("language", {
              required: "Language is required",
            })}
            defaultValue={needToUpdate && needToUpdate[0]?.language}
            error={!!errors.language}
            helperText={errors?.language?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Level"
            placeholder="Beginner | Intermediate"
            {...register("level", {
              required: "Level is required",
            })}
            defaultValue={needToUpdate && needToUpdate[0]?.level}
            error={!!errors.level}
            helperText={errors?.level?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Percentage"
            {...register("percentage", {
              required: "Percentage is required",
            })}
            defaultValue={needToUpdate && needToUpdate[0]?.percentage}
            type="number"
            onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
            error={!!errors.percentage}
            helperText={errors?.percentage?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Experience"
            {...register("experience", {
              required: "Experience is required",
            })}
            defaultValue={needToUpdate && needToUpdate[0]?.experience}
            type="number"
            onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
            error={!!errors.experience}
            helperText={errors?.experience?.message}
          />

          <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {update ? "Upate Skill" : "Add Skill"}
          </LoadingButton>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
