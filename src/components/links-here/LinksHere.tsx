import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLinksHere } from '../../store/routines';
import { Column, useTable } from 'react-table';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';

const LinksHere = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: `${t('pagelang-name')}`,
        accessor: 'title',
      },
    ],
    [],
  );
  React.useEffect(() => {
    dispatch(fetchLinksHere());
  }, []);
  // @ts-ignore
  const { data } = useSelector(({ linksHere }) => linksHere);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable({ columns, data });
  return (
    <table
      className={classNames([
        Classes.HTML_TABLE,
        Classes.HTML_TABLE_CONDENSED,
        Classes.HTML_TABLE_STRIPED,
        Classes.HTML_TABLE_BORDERED,
        Classes.INTERACTIVE,
      ])}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, j) => (
              <th key={j} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, i) => {
          prepareRow(row);
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell: any, j: any) => {
                return (
                  <td key={j} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LinksHere;
