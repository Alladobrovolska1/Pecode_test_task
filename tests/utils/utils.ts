export class Utils {

    constructor() { }

    isArrayHasAscSorting(array: any): boolean {
        var result = true;
        for (var i = 1; i < array.length; i++) {
            if (!(array[i] >= array[i - 1])) {
                result = false;
                break;
            }
        }
        return result;
    }

    convertPricesToNumbers(prices: string[]): number[] {
        return prices
            .map(e => +e.replace("₴", "").trim().replace(" ", ""))
    }

    arrayElementsSum(array: any): number {
        return array.reduce((sum, current) => sum + current, 0);
    }
}