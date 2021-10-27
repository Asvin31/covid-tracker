import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";


export default function CovidTable({ tableData }) {
    return (
        <TableContainer sx={{ height: '60vh', overflow: 'scroll' }}>
            <Table>
                <TableBody>
                    {tableData.map(({ country, cases }) => (
                        <TableRow
                            key={country}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:nth-of-type(odd)': { backgroundColor: '#f3f2f8' }
                            }}
                        >
                            <TableCell align="left">{country}</TableCell>
                            <TableCell align="right"><strong>{cases}</strong></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

};
