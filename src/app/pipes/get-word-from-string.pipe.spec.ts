import { GetWordFromStringPipe } from './get-word-from-string.pipe';

describe('GetWordFromStringPipe', () => {
    it('create an instance', () => {
        const pipe = new GetWordFromStringPipe();
        expect(pipe).toBeTruthy();
    });
});
