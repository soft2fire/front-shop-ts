import { ProductItemType } from "../components/types"

export const capitalizeWord = (str: string) => {
    const firstChar = str
        .charAt(0)
        .toLocaleUpperCase()
    const restOfStr = str
        .substring(1)
        .toLocaleLowerCase()
    return `${firstChar}${restOfStr}`
}

export const capitalizeEachWord = (str: string) => {
    return str
        .split(" ")
        .map((word: string) => capitalizeWord(`${word} `))
    // .join(" ")
}

export const maxWord = (str: any, maxChar: number) => {
    var outComingStr = str.split(" ")
    var initialText = " "
    var i;
    for (i = 0, initialText; i < maxChar; i++) {
        initialText += outComingStr[i] + " ";
    }
    return initialText;
}

export function calculateTotal(items: ProductItemType[]) {
    return items.reduce((count: number, item) => count + item.amount * item.price, 0);
}