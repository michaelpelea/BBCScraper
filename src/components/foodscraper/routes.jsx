import SearchView from './search/SearchView.jsx';

const FoodScraperRoutes = [
    {
        path: '/foodscraper/search',
        component: SearchView
    },
    {
        redirect: true,
        path: '/foodscraper/search',
        from: '/foodscraper'
    }
];

export default FoodScraperRoutes;