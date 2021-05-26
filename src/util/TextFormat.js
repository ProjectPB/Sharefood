export const TextAreaToArray = (str) => {
    const splitStr = str.split(/\n/g);
    const trimmedStr = splitStr.map((i) => i.trim());
    const filteredStr = trimmedStr.filter((i) => {
        return i != "";
    });
    return filteredStr;
};

export const renderTags = (
    strTitle,
    strIngredients,
    strType,
    strAuthorName
) => {
    let tags = [];
    const titleWords = strTitle.split(" ");
    const titleTags = [];

    const ingredientsNoReturns = strIngredients
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ",")
        .split(/,|\n/);
    const basicArray = [
        strTitle,
        ingredientsNoReturns,
        strType,
        strAuthorName,
    ].join(" ");
    const arrNoCommas = basicArray.replace(/,/g, " ");
    const splitStr = arrNoCommas.split(" ");
    splitStr.push(strAuthorName);
    const trimmedStr = splitStr.map((i) => i.trim());
    const noNumbers = trimmedStr.filter((i) => {
        return !/\d/.test(i) && i != "" && i.length >= 3;
    });
    for (let i = 1; i <= titleWords.length; i++) {
        const wordsSliced = titleWords.slice(0, i);
        const wordsSplit = wordsSliced.toString().split(",");
        const wordsFiltered = wordsSplit.filter((i) => i != "");
        const wordsJoined = wordsFiltered.join(" ");
        titleTags.push(wordsJoined);
    }
    tags.push.apply(noNumbers, titleTags);
    const lowered = noNumbers.map((item) => item.toLowerCase());
    tags = [...new Set(lowered)];
    return tags;
};

export const capitalizeLetter = (str) => {
    const capitalStr = str[0].toUpperCase() + str.substring(1);
    const formatStr = capitalStr.trim(" ");
    return formatStr;
};
