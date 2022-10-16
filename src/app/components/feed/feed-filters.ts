import { Filter } from 'src/app/models/filter/filter';

export const RECENT_FEED_FILTER = { key: 'recent', value: 'Most Recent' };
export const POPULAR_FEED_FILTER = { key: 'popular', value: 'Most Popular' };
export const RECENTLY_USED_FEED_FILTER = { key: 'recently_used', value: 'Recently Used' };

export const FEED_FILTERS: Filter[] = [
    RECENT_FEED_FILTER,
    POPULAR_FEED_FILTER,
    RECENTLY_USED_FEED_FILTER,
];
