import { GetFriendlyUrlPipe } from './get-friendly-url.pipe';

describe('GetFriendlyUrlPipe', () => {
    it('create an instance', () => {
        const pipe = new GetFriendlyUrlPipe();
        expect(pipe).toBeTruthy();
    });
});
