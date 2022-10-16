import { HandleEmptyPipe } from './handle-empty.pipe';

describe('HandleEmptyPipe', () => {
    it('create an instance', () => {
        const pipe = new HandleEmptyPipe();
        expect(pipe).toBeTruthy();
    });
});
