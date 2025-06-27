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
} from "@mui/material";
import type { Order } from "../../utils/sorting";
import { getComparator, stableSort } from "../../utils/sorting";
import { useAppSelector } from "../../redux/hooks";
import type { Employee } from "../../redux/employeeSlice";
import "./EmployeesTable.scss";
import SearchInput from "../SearchInput/SearchInput";

interface Column {
  id: keyof Employee;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

const columns: Column[] = [
  { id: "firstName", label: "First Name", minWidth: 140 },
  { id: "lastName", label: "Last Name", minWidth: 140 },
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

const EmployeeTable = () => {
  const employees = useAppSelector(
    (state: any) => state.employees as Employee[]
  );
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
        e.street,
        e.startDate,
        e.dateOfBirth,
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
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, width: 300 }}
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
