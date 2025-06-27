export type Order = "asc" | "desc";

export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T): number =>
  b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((a: { [key in Key]: any }, b: { [key in Key]: any }) => number) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

export const stableSort = <T>(
  array: T[],
  comparator: (a: T, b: T) => number
): T[] =>
  array
    .map((el, index) => [el, index] as [T, number])
    .sort((a, b) => {
      const order = comparator(a[0], b[0]);
      return order !== 0 ? order : a[1] - b[1];
    })
    .map((el) => el[0]);
