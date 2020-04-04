import React from 'react';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';
import { Column, useTable } from 'react-table';
import CommentCell from './CommentCell';
import fileSize from 'filesize';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { fetchRevisions } from '../../store/routines';
import RevisionRow from './RevisionRow';

const Revisions: React.FC = () => {
  const { t } = useTranslation();

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: `${t('filehist-comment')}`,
        accessor: 'parsedcomment',
        Cell: CommentCell,
      },
      {
        Header: `${t('listfiles_size')}`,
        accessor: 'size',
        Cell: ({ cell }) => {
          return (
            <span style={{ whiteSpace: 'nowrap', float: 'right' }}>
              {fileSize(cell.value, { locale: 'ru' })}
            </span>
          );
        },
      },
      {
        Header: `${t('filehist-user')}`,
        accessor: 'user',
        Cell: ({ cell }) => {
          return <span style={{ whiteSpace: 'nowrap' }}>{cell.value}</span>;
        },
      },
      {
        Header: `${t('filehist-datetime')}`,
        accessor: 'timestamp',
        Cell: ({ cell }) => {
          return (
            <span style={{ whiteSpace: 'nowrap' }}>
              {DateTime.fromISO(cell.value).toLocaleString(DateTime.DATETIME_SHORT)}
            </span>
          );
        },
      },
    ],
    [t],
  );

  const dispatch = useDispatch();
  // @ts-ignore
  const { data } = useSelector<RootState>(({ revisions }) => revisions);
  React.useEffect(() => {
    dispatch(fetchRevisions());
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
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
        {rows.map((row, i) => {
          prepareRow(row);
          return <RevisionRow key={i} {...row} {...row.getRowProps()} />;
        })}
      </tbody>
    </table>
  );
};

export default Revisions;
