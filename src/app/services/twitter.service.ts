import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TwitterService {
    constructor() {}

    /**
     * Gets random tweet from mock data
     *
     * @returns string containing tweet
     */
    getRandomTweet(): Observable<string> {
        const tweets: string[] = [
            'To be clear, I strongly believe in crypto, but it can’t drive a massive increase in fossil fuel use, especially coal',
            'To the moon!',
            'It is high time there was a carbon tax!',
            'Make humanity a multiplanet species!',
            'Public support for life on Mars is critical to making it happen',
            'Cybertruck prototype in New York this weekend',
            'I love Art Deco',
            'Happy Earth Day',
            'Mars 2024',
            'If we make life multiplanetary, there may come a day when some plants & animals die out on Earth, but are still alive on Mars',
            'The most entertaining outcome is the most likely',
        ];

        return of(tweets[Math.floor(Math.random() * tweets.length)]);
    }
}
