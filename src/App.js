import React from 'react';
import './App.css';

// import components
import GameController from './components/gameController';
import StartScreen from './components/startScreen';
import NotFoundPage from './components/notFoundPage';
import Showcase from './components/showcase';
import {useRoutes} from 'hookrouter';


const routes = {
  '/': () => <StartScreen />,
  '/draw': () => <GameController />,
  '/showcase/:gameId': ({gameId}) => <Showcase gameId={gameId} />,
};

/**
 * @Anna
 * We should be using functional react components for everything in this project.
 * Recent release of react added hooks, which make functional components equal and
 * better than Class based components. I can explain more if you want.
 * 
 * But if any tutorials you are doing have something like
 * class [NewComponent] extends Component ...
 * just ignore it, and use functional components. Its basically the same but better
 * and makes for much cleaner code.
 * 
 * :)
 */
function App() {
  const routeResult = useRoutes(routes);
  return routeResult || <NotFoundPage />;
}

export default App;
