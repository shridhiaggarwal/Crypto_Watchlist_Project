import React from "react";
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
import CryptoGraph from "../CryptoGraph";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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

export interface IHistoricicalData {
  timestamp: string;
  price: number;
  change: number;
}
export interface ICoinProps {
  rank: number;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change: number;
  volume24h: number;
  mktCap: number;
  last7days?: Array<IHistoricicalData>;
}

interface ICryptoTableProps {
  rows: Array<ICoinProps>;
  showLast7Days: boolean;
  watchlistCoinsSet?: Set<string>;
  showAddButton?: boolean;
  addCryptoCoin?: (addCoinData: ICoinProps) => void;
  showRemoveButton?: boolean;
  removeCryptoCoin?: (removeCoinSymbol: ICoinProps) => void;
}

const StyledVisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0px;
  position: absolute;
  top: 20px;
  width: 1px;
`;

const StyledTableHead = styled(TableCell)`
  font-weight: bolder;
`;

const StyledAlignedCell = styled(Box)`
  display: flex;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const StyledButton = styled(Button)<{
  backgroundColor: string;
  color: string;
}>`
  text-transform: none;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  &:hover {
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};
  }
`;

const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  margin-right: 8px;
`;

const StyledTypography = styled(Typography)<{
  fontColor?: string;
  margin?: string;
  component?: string;
}>`
  color: ${(props) => props.fontColor};
  margin: ${(props) => props.margin};
`;

const generateTableHeadCells = (
  showLast7Days: boolean,
  showAddButton?: boolean,
  showRemoveButton?: boolean
) => {
  let tableHeadCells: ITableHeadCells[] = [
    { id: "rank", align: "left", disablePadding: true, label: "#" },
    { id: "coinNameIcon", align: "left", disablePadding: false, label: "Name" },
    { id: "price", align: "left", disablePadding: false, label: "Price" },
    { id: "change", align: "left", disablePadding: false, label: "Change" },
    {
      id: "volume24h",
      align: "left",
      disablePadding: false,
      label: "24h Volume",
    },
    { id: "mktCap", align: "left", disablePadding: false, label: "Mkt Cap" },
  ];

  if (showLast7Days) {
    tableHeadCells.push({
      id: "last7Days",
      align: "left",
      disablePadding: false,
      label: "Last 7 Days",
    });
  }

  if (showAddButton || showRemoveButton) {
    tableHeadCells.push({
      id: "action",
      align: "left",
      disablePadding: false,
      label: "",
    });
  }

  return tableHeadCells;
};

const CryptoTableHead = (props: ITableHeadProps) => {
  const { headCells, order, orderBy, onRequestSort } = props;

  const createSortHandler = (headCellId: string) => (event: any) => {
    onRequestSort(event, headCellId);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell: ITableHeadCells) => (
          <StyledTableHead
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : TableOrder.ASC}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <StyledVisuallyHidden>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </StyledVisuallyHidden>
              ) : null}
            </TableSortLabel>
          </StyledTableHead>
        ))}
      </TableRow>
    </TableHead>
  );
};

const CryptoTable = (props: ICryptoTableProps) => {
  const {
    rows,
    watchlistCoinsSet,
    showLast7Days,
    showAddButton,
    addCryptoCoin,
    showRemoveButton,
    removeCryptoCoin,
  } = props;
  const [order, setOrder] = React.useState<TableOrder>(TableOrder.ASC);
  const [orderBy, setOrderBy] = React.useState("rank");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const descendingComparator = (a: any, b: any, orderBy: any) => {
    if (orderBy === "coinNameIcon") {
      // Sort by coin name
      if (b.name < a.name) {
        return -1;
      }
      if (b.name > a.name) {
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

  const stableSort = (array: Array<ICoinProps>, comparator: any) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    let result = stabilizedThis.map((el) => el[0]);
    return result;
  };

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

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <>
      {/* crypto table container */}
      <TableContainer>
        <Table>
          {/* crypto table header */}
          <CryptoTableHead
            headCells={generateTableHeadCells(
              showLast7Days,
              showAddButton,
              showRemoveButton
            )}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          {/* crypto table body */}
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => {
                const labelId = `crypto-table-${index}`;
                const isWatchlistHasCoin =
                  watchlistCoinsSet && watchlistCoinsSet.has(row.symbol);

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
                    <TableCell align="left">
                      <StyledAlignedCell>
                        <StyledImage src={row.image} />
                        {row.name}
                        <StyledTypography
                          margin="0 0 0 8px"
                          fontColor="#808a9d"
                        >
                          {row.symbol}
                        </StyledTypography>
                      </StyledAlignedCell>
                    </TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.change}</TableCell>
                    <TableCell align="left">{row.volume24h}</TableCell>
                    <TableCell align="left">{row.mktCap}</TableCell>
                    {row.last7Days && (
                      <TableCell align="left">
                        <CryptoGraph graphData={row.last7Days} />
                      </TableCell>
                    )}
                    {showAddButton && addCryptoCoin && (
                      <TableCell align="left">
                        <StyledButton
                          variant="contained"
                          backgroundColor={
                            isWatchlistHasCoin ? "default" : "#4eaf0a"
                          }
                          color="white"
                          onClick={() => addCryptoCoin(row)}
                        >
                          {isWatchlistHasCoin ? (
                            <>
                              <StyledCheckCircleIcon /> Added
                            </>
                          ) : (
                            <>Add</>
                          )}
                        </StyledButton>
                      </TableCell>
                    )}
                    {showRemoveButton && removeCryptoCoin && (
                      <TableCell align="left">
                        <StyledButton
                          variant="contained"
                          backgroundColor="#DC143C"
                          color="white"
                          onClick={() => removeCryptoCoin(row)}
                        >
                          Remove
                        </StyledButton>
                      </TableCell>
                    )}
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

      {/* crypto table pagination */}
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
