import { Pie } from "react-chartjs-2";
import { useCallback, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { pullUserSkill } from "../../features/skill/skillSlice";
import random_between_stack from "../util/random_rgba_generator";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Starting() {
  const dispatch = useDispatch();
  const { allSkills } = useSelector((state) => state.skill);
  const dataMaker = allSkills?.reduce((acc, curr) => {
    return curr ? [...acc, [curr.language, curr.percentage]] : acc;
  }, []);

  const language = [];
  const percentage = [];
  if (dataMaker) {
    for (let sets of dataMaker) {
      language.push(sets[0]);
      percentage.push(sets[1]);
    }
  }

  const random = [];
  for (let i = 0; i < language.length; i++) {
    random.push(random_between_stack());
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Skill Chart",
      },
    },
  };

  const data = {
    // labels: ["Javascript", "C#", "Java", "Kotlin", "Ruby on Rails", "Python"],
    labels: language,

    datasets: [
      {
        label: "Number of with this skill",
        data: percentage,
        // backgroundColor: [
        //   "rgba(255, 99, 132, 0.9)",
        //   "rgba(54, 162, 235, 0.9)",
        //   "rgba(255, 206, 86, 0.9)",
        //   "rgba(75, 192, 192, 0.9)",
        //   "rgba(153, 102, 255, 0.9)",
        //   "rgba(255, 159, 64, 0.9)",
        // ],
        backgroundColor: [...random],
        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ],
        border: [...random],
      },
    ],
  };

  const fetchSkill = useCallback(async () => {
    try {
      await dispatch(pullUserSkill());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSkill();
  }, [fetchSkill]);
  return (
    <Container
      component={Paper}
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Pie options={options} data={data} />
    </Container>
  );
}

export default Starting;
