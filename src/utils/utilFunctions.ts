


export const getMonthsCovered = (createdAt?:Date) => {
    if (!createdAt) return 0;
    const startingDate = new Date(createdAt);
    const currentDate = new Date();

    const yearDiff = currentDate.getFullYear() - startingDate.getFullYear();
    const monthDiff = currentDate.getMonth() - startingDate.getMonth();

    return yearDiff*12+monthDiff+1;
}