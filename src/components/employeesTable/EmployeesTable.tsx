import React, { useState, useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useAppSelector } from "../../redux/hooks";
import type { Employee } from "../../redux/employeeSlice";
import "./EmployeesTable.scss";

interface Column {
  id: keyof Employee;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

const columns: Column[] = [
  { id: "firstName", label: "First Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    minWidth: 120,
    format: (value: Date) => new Date(value).toLocaleDateString(),
  },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 120,
    format: (value: Date) => new Date(value).toLocaleDateString(),
  },
  { id: "department", label: "Department", minWidth: 100 },
  { id: "street", label: "Street", minWidth: 140 },
  { id: "city", label: "City", minWidth: 140 },
  { id: "state", label: "State", minWidth: 40 },
  {
    id: "zipCode",
    label: "Zip Code",
    minWidth: 40,
    format: (value: number) => value.toString(),
  },
];

const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T): number =>
  b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;

type Order = "asc" | "desc";

const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((a: { [key in Key]: any }, b: { [key in Key]: any }) => number) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

const stableSort = <T,>(array: T[], comparator: (a: T, b: T) => number): T[] =>
  array
    .map((el, index) => [el, index] as [T, number])
    .sort((a, b) => {
      const order = comparator(a[0], b[0]);
      return order !== 0 ? order : a[1] - b[1];
    })
    .map((el) => el[0]);

const EmployeeTable = () => {
  const employees = useAppSelector((state: any) => state.counter as Employee[]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Employee>("firstName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search) return employees;
    const s = search.toLowerCase();
    return employees.filter((e) =>
      [
        e.firstName,
        e.lastName,
        e.department,
        e.city,
        e.state,
        e.zipCode.toString(),
      ]
        .join(" ")
        .toLowerCase()
        .includes(s)
    );
  }, [employees, search]);

  const sortedRows = useMemo(
    () => stableSort(filtered, getComparator(order, orderBy)),
    [filtered, order, orderBy]
  );

  const handleRequestSort = (property: keyof Employee) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", marginTop: 4 }} className="paper">
      <TextField
        placeholder="Search"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, width: 300 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sortable employee table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  style={{ top: 0, minWidth: col.minWidth }}
                  sortDirection={orderBy === col.id ? order : false}
                  className="bold">
                  <TableSortLabel
                    className="bold"
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : "asc"}
                    onClick={() => handleRequestSort(col.id)}>
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <TableRow hover tabIndex={-1} key={idx}>
                  {columns.map((col) => (
                    <TableCell key={col.id} align={col.align}>
                      {col.format
                        ? col.format(row[col.id])
                        : (row[col.id] as any)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default EmployeeTable;
