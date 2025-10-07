import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/search', 'routes/search.tsx'),
    route('/help', 'routes/help.tsx'),
    route('/about', 'routes/about.tsx')
] satisfies RouteConfig;
