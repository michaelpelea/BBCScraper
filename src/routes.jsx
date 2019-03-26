import Connect from './components/connect/ConnectView.jsx';
import FoodScraper from './components/foodscraper/FoodScraperView.jsx';
import MainLoginView from './components/login/Main.jsx';

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
        component: MainLoginView
    },
    {
        redirect: true,
        path: '/login',
        from: '/'
    }
]

export default routes;