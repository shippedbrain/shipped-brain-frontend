import { ParseUrlFriendlyTextPipe } from './parse-url-friendly-text.pipe';

describe('ParseUrlFriendlyTextPipe', () => {
    it('create an instance', () => {
        const pipe = new ParseUrlFriendlyTextPipe();
        expect(pipe).toBeTruthy();
    });
});
