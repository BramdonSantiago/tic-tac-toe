import MenuPage from '../features/menu/MenuPage';
import GamePage from '../features/game/GamePage';
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <MenuPage />,
    },
    {
        path: "/menu",
        element: <MenuPage />,
    },
    {
        path: "/game",
        element: <GamePage />,
    },

], {
    basename: "/tic-tac-toe",
});