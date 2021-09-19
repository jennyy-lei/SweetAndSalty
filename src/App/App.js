import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RecipeDisplay from '../RecipeDisplay/recipeDisplay';
import Home from '../Home/Home';
import RecipeFinder from '../RecipeFinder/RecipeFinder';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/flow">
          <RecipeFinder />
        </Route>
        <Route path="/recipes">
          <RecipeDisplay />
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
