export const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
    return sortedData;
};