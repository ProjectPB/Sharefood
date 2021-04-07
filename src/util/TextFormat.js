export const stringToArray = (string) => {
    const splittedString = string.split(/,|\n/);

    const trimmedString = splittedString.map((i) => i.trim());

    const filteredString = trimmedString.filter((i) => {
        return i != "";
    });

    return filteredString;
};
