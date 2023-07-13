import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { TableOrder } from "../../Utils/common";
import styled from "styled-components";

interface ITableHeadCells {
  id: string;
  align: "left" | "right" | "center";
  disablePadding: boolean;
  label: string;
}

interface ITableHeadProps {
  headCells: Array<ITableHeadCells>;
  order: TableOrder;
  orderBy: string;
  onRequestSort: (event: any, headCellId: string) => void;
}

interface ITableRowProps {
  rank: number;
  coinSymbol: string;
  coinImage: any;
  coinName: string;
  price: number;
  volume24h: number;
  mktCap: number;
  last7Days?: any;
}

interface ICryptoTableProps {
  rows: Array<ITableRowProps>;
}

const useStyles = makeStyles((theme) => ({
  tableHead: {
    fontWeight: "bolder",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));


const StyledTableCell = styled(TableCell)`
  display: flex;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const tableHeadCells: ITableHeadCells[] = [
  { id: "rank", align: "left", disablePadding: true, label: "#" },
  { id: "coinNameIcon", align: "left", disablePadding: false, label: "Coin" },
  { id: "price", align: "left", disablePadding: false, label: "Price" },
  {
    id: "Volume24h",
    align: "left",
    disablePadding: false,
    label: "24h Volume",
  },
  { id: "mktCap", align: "left", disablePadding: false, label: "Mkt Cap" },
  {
    id: "last7Days",
    align: "left",
    disablePadding: false,
    label: "Last 7 Days",
  },
];

const descendingComparator = (a: any, b: any, orderBy: any) => {
  if (orderBy === "coinNameIcon") {
    // Sort by coin name
    if (b.coinName < a.coinName) {
      return -1;
    }
    if (b.coinName > a.coinName) {
      return 1;
    }
    return 0;
  } else {
    // Sort by other columns
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
};


const getComparator = (order: TableOrder, orderBy: any) => {
  return order === TableOrder.DESC
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array: Array<ITableRowProps>, comparator: any) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  let result = stabilizedThis.map((el) => el[0]);
  console.log(result);
  return result;
};

const CryptoTableHead = (props: ITableHeadProps) => {
  const { headCells, order, orderBy, onRequestSort } = props;
  const classes = useStyles();

  const createSortHandler = (headCellId: string) => (event: any) => {
    onRequestSort(event, headCellId);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell: ITableHeadCells) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.tableHead}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : TableOrder.ASC}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const CryptoTable = (props: ICryptoTableProps) => {
  const { rows } = props;
  const [order, setOrder] = React.useState<TableOrder>(TableOrder.ASC);
  const [orderBy, setOrderBy] = React.useState("rank");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  console.log("rendering CryptoTable");

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === TableOrder.ASC;
    setOrder(isAsc ? TableOrder.DESC : TableOrder.ASC);
    setOrderBy(property);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <>
      <TableContainer>
        <Table>
          <CryptoTableHead
            headCells={tableHeadCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                const labelId = `crypto-table-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.rank}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.rank}
                    </TableCell>
                    <StyledTableCell align="left">
                      <StyledImage src={row.coinImage} />
                      {row.coinName}
                    </StyledTableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.volume24h}</TableCell>
                    <TableCell align="left">{row.mktCap}</TableCell>
                    {row.last7Days && <TableCell align="left">{row.last7Days}</TableCell>}
                  </TableRow>
                );
              })}
            {/* {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CryptoTable;
