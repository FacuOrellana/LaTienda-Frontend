import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './Table.module.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables(props) {
  const [tableRows, setTableRows] = React.useState([]);
  
  React.useEffect(()=>{
    setTableRows(props.rows.map(() => {
      return {
        selected: false,
      };
    }))
  }, [props.rows]);

  const onRowClick = (row, index)=>{
    const tableRowsAux = tableRows.map((rowAux, indexAux)=>{
      return {
        selected: index === indexAux ? true : false,
      };
    });
    setTableRows(tableRowsAux);
    if(props.onRowClick)
      props.onRowClick(row[props.idColumn])
  }
  return (
    <TableContainer component={Paper} sx={{ maxHeight: props.height, maxWidth: props.width }}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.columns?.map((column, index)=>{
              return !column.hidden ? <StyledTableCell key={index}>{column.headerText}</StyledTableCell> : null
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.rows?.map((row, rowIndex)=>{
              return (
                <StyledTableRow onClick={()=>{onRowClick(row, rowIndex)}} className={tableRows[rowIndex]?.selected ? styles["selected-row"] :styles["styled-row"]} key={rowIndex}>
                  {
                    props.columns?.map((column, cellIndex)=>{
                      return !column.hidden ? (
                        <StyledTableCell key={cellIndex} component="th" scope="row">
                          {row[column.selector]}
                        </StyledTableCell>
                      ) : null
                    })
                  }
                </StyledTableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}