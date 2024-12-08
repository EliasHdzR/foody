import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "@/theme";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function StickyHeadTable({
    columns,
    rows,
    rowsPerPageCustom,
    tableContainerStyle = {
        maxHeight: "100%",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    },
    tableCellStyle = { minWidth: 50 },
}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const headerCellStyle = {
        backgroundColor: colors.greenAccent[700],
        color: colors.grey[100],
        fontWeight: "600",
        fontSize: "15px",
        textTransform: "uppercase",
        padding: "14px",
    };

    const bodyCellStyle = {
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
        transition: "background-color 0.3s",
    };

    const paginationStyle = {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        color: colors.grey[100],
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageCustom);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={paginationStyle}>
            <TableContainer sx={tableContainerStyle}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {(columns || []).map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ ...tableCellStyle, ...headerCellStyle }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rows || [])
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, rowIndex) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={rowIndex}
                                    style={{
                                        backgroundColor:
                                            rowIndex % 2 === 0
                                                ? colors.primary[500]
                                                : colors.primary[600],
                                    }}
                                >
                                    {(columns || []).map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ ...tableCellStyle, ...bodyCellStyle }}
                                            >
                                                {column.format && typeof value === "number"
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={(rows || []).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
