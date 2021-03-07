import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { selectResults } from "../../store/quizzSlice";

export function Results() {
  const { rounds, correctAnswers /*wrongAnswers*/ } = useSelector(
    selectResults
  );

  const percentScore = Math.round((correctAnswers / rounds) * 100);

  return (
    <Container maxWidth="md" fixed>
      <Typography variant="h3" display="block" align="center">
        You got:
      </Typography>
      <Typography
        color={percentScore > 50 ? "primary" : "error"}
        variant="h1"
        display="block"
        align="center"
      >
        {percentScore}%
      </Typography>
      <Typography variant="h3" display="block" align="center">
        {percentScore > 50 ? `Congratulations!` : `Wow you suck!`}
      </Typography>
      <Typography variant="body1" display="block" align="center">
        {`${correctAnswers} out of ${rounds} answers were correct`}
      </Typography>
      <Box textAlign="center">
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/quizz"
        >
          Try again
        </Button>
      </Box>
    </Container>
  );
}
