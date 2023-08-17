export const isValueEmpty = (value: any) => {
    if (value === undefined || value === null) {
        return true;
    }
    try {
        return value.toString().trim().length === 0;
    } catch (e) {
        return false;
    }
}