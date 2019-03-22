import Connect from './components/connect/ConnectView.jsx';
import FoodScraper from './components/foodscraper/FoodScraperView.jsx';
import Login from './components/login/LoginView.jsx';

const routes = [
    {
        path: "/connect",
        component: Connect,
    },
    {
        path: "/foodscraper",
        component: FoodScraper,
    },
    {
        path: "/login",
        component: Login
    },
    {
        redirect: true,
        path: '/login',
        from: '/'
    }
]

export default routes;