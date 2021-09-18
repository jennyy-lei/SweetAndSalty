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
      {/* <nav>
        <ul>
          <li>
            <Link to="/flow">Flow</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav> */}

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
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
