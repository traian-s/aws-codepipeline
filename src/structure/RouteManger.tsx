import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Quizz from "../features/quizz/Quizz";
import { Results } from "../features/results/Results";

export function RouteManager() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">{`This is the homepage`}</Route>
        <Route path="/quizz">
          <Quizz />
        </Route>
        <Route path="/results">
          <Results />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
