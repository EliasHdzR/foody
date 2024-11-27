import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
    const {row, columns, collapseColumns, collapseRows, subtitle, tableCellStyle} = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell style={tableCellStyle}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={tableCellStyle}>
                        {row[column.id]}
                    </TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns.length + 1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                {subtitle}
                            </Typography>
                            <Table size="small" aria-label="details">
                                <TableHead>
                                    <TableRow>
                                        {collapseColumns.map((column) => (
                                            <TableCell key={column.id} align={column.align}>
                                                <strong>{column.label}</strong>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {collapseRows.map((collapseRow) => (
                                        <TableRow key={collapseRow.id}>
                                            {collapseColumns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {collapseRow[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            align: PropTypes.string,
        })
    ).isRequired,
    collapseColumns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            align: PropTypes.string,
        })
    ).isRequired,
    collapseRows: PropTypes.arrayOf(PropTypes.object).isRequired,
    subtitle: PropTypes.string.isRequired,
    tableCellStyle: PropTypes.object,
};

export default function CollapsibleTable({
                                             columns,
                                             rows,
                                             collapseColumns,
                                             collapseRows,
                                             subtitle,
                                             tableContainerStyle = {
                                                 maxHeight: '100%',
                                                 borderRadius: '12px',
                                                 boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                                             },
                                             tableCellStyle = {minWidth: 50},
                                             headerCellStyle = {
                                                 backgroundColor: '#3B3B3B',
                                                 color: '#FFF',
                                                 fontWeight: '600',
                                                 fontSize: '15px',
                                                 textTransform: 'uppercase',
                                                 padding: '14px'
                                             },
                                             bodyCellStyle = {
                                                 backgroundColor: '#FFFFFF',
                                                 transition: 'background-color 0.3s'
                                             },
                                             paginationStyle = {width: '100%', height: '100%', overflow: 'hidden'}
                                         }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={headerCellStyle}/>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={headerCellStyle}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <Row
                                key={row.id}
                                row={row}
                                columns={columns}
                                collapseColumns={collapseColumns}
                                subtitle={subtitle}
                                collapseRows={collapseRows.filter(collapseRow => collapseRow.parentId === row.id)}
                                tableCellStyle={tableCellStyle}
                                bodyCellStyle={bodyCellStyle}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

CollapsibleTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            align: PropTypes.string,
        })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    collapseColumns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            align: PropTypes.string,
        })
    ).isRequired,
    collapseRows: PropTypes.arrayOf(PropTypes.object).isRequired,
    subtitle: PropTypes.string.isRequired,
    tableContainerStyle: PropTypes.object,
    tableCellStyle: PropTypes.object,
    headerCellStyle: PropTypes.object,
    bodyCellStyle: PropTypes.object,
    paginationStyle: PropTypes.object,
};
