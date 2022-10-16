import { Header } from 'src/app/models/header/header';

export const NAV_ITEMS_LEFT: Header[] = [
    { title: 'Models', route: '/', queryParams: { show: 'models' } },
    { title: 'Profiles', route: '/', queryParams: { show: 'profiles' } },
];

export const NAV_ITEMS_RIGHT: Header[] = [
    { title: 'Create Model', route: 'models/create' },
    { title: 'Deploy Model', route: 'deploy' },
    {
        title: 'Examples',
        route: '',
        isDropdown: true,
        children: [{ title: 'Sentiment Analysis', route: '/showcase/sentiment-analysis' }],
    },
    {
        title: 'More',
        route: '',
        isDropdown: true,
        children: [
            { title: 'Dashboard', route: '/dashboard/summary' },
            { title: 'FAQ', route: '/faq' },
        ],
    },
];

export const NAV_ITEMS_RESPONSIVE: Header[] = [
    { title: 'Models', route: '/', queryParams: { show: 'models' } },
    { title: 'Profiles', route: '/', queryParams: { show: 'profiles' } },
    { title: 'Create Model', route: '/models/create' },
    { title: 'Deploy', route: '/deploy' },
    { title: 'Dashboard', route: '/dashboard/summary' },
    { title: 'FAQ', route: '/faq' },
];
