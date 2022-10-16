import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getWordFromString',
})
export class GetWordFromStringPipe implements PipeTransform {
    /**
     * Returns single word from text. String is split into array by whitespaces to determine what word to return.
     *
     * If requested word index doesn't exist, the first word is returned.
     *
     * @param text Full text
     * @param indexToReturn Index to return
     * @returns Requested word index from full string, otherwise first word is returned
     */
    transform(text: string, indexToReturn: number = 0): string {
        const wordList = text.split(' ');

        return wordList[indexToReturn] ? wordList[indexToReturn] : wordList[0];
    }
}
