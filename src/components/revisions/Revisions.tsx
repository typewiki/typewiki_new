import React from 'react';
import classNames from 'classnames';
import { Button, ButtonGroup, Classes, FormGroup, Tag } from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';
import { Column, useTable, useExpanded } from 'react-table';
import CommentCell from './CommentCell';
import fileSize from 'filesize';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { fetchRevisions } from '../../store/routines';
import RevisionRow from './RevisionRow';
import { IconNames } from '@blueprintjs/icons';
import { denormalize } from 'normalizr';
import pageSchema from '../../store/schemas/page';
import { selectRevision } from '../../store/actions/revisions';

const Revisions: React.FC = () => {
  const { t } = useTranslation();

  const columns: Column[] = React.useMemo(
    () => [
      {
        // Build our expander column
        id: 'expander', // Make sure it has an ID
        // @ts-ignore
        Cell: ({ row }: any) => (
          <span
            {...row.getToggleRowExpandedProps({
              style: {
                // We can even use the row.depth property
                // and paddingLeft to indicate the depth
                // of the row
                paddingLeft: `${row.depth * 2}rem`,
              },
            })}
          >
            {row.isExpanded ? '👇' : '👉'}
          </span>
        ),
      },
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
  const { pages, revisions } = useSelector<RootState>(({ revisions, pages }) => ({
    pages,
    revisions,
  }));

  React.useEffect(() => {
    dispatch(fetchRevisions());
  }, []);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const data_ = denormalize(pages.data['7456690'], pageSchema, {
      revisions: revisions.data,
    });
    if (data_ && data_.revisions) {
      setData(data_.revisions);
    }
  }, [pages.data['7456690'], revisions.data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
    },
    useExpanded,
  );
  const handleSelect = (row: any) => {
    dispatch(selectRevision(row.revid));
  };
  return (
    <>
      <pre>
        <code>{JSON.stringify({ expanded }, null, 2)}</code>
      </pre>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <ButtonGroup minimal={true}>
            <Button icon={IconNames.REFRESH} />
            <Button icon={IconNames.SORT_DESC} />
            <Button icon={IconNames.COG} rightIcon={IconNames.CARET_DOWN} />
          </ButtonGroup>
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
                  <>
                    <RevisionRow
                      handleSelect={handleSelect}
                      {...row}
                      {...row.getRowProps()}
                    />
                    {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                    {row.isExpanded ? (
                      <tr>
                        <td colSpan={visibleColumns.length}>
                          {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                          gfgdfgfdg
                        </td>
                      </tr>
                    ) : null}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        {revisions.ui.selected && (
          <div style={{ minWidth: 500 }}>
            <ButtonGroup minimal={true}>
              <Button icon={IconNames.COMPARISON} title={t('editundo')} />
              <Button icon={IconNames.UNDO} title={t('editundo')} />
            </ButtonGroup>
            <div style={{ padding: 10 }}>
              <FormGroup
                helperText={
                  <>
                    {!revisions.data[revisions.ui.selected].comment &&
                      t('trackingcategories-nodesc')}
                    {revisions.data[revisions.ui.selected].minor &&
                      ` ${t('recentchanges-label-minor')}`}
                  </>
                }
              >
                <span
                  className={classNames(Classes.RUNNING_TEXT)}
                  dangerouslySetInnerHTML={{
                    __html: revisions.data[revisions.ui.selected].parsedcomment,
                  }}
                />
              </FormGroup>
              <FormGroup>
                {DateTime.fromISO(
                  revisions.data[revisions.ui.selected].timestamp,
                ).toLocaleString(DateTime.DATETIME_MED)}
              </FormGroup>
              {!!revisions.data[revisions.ui.selected].tags.length && (
                <FormGroup
                  label={<span className={Classes.TEXT_SMALL}>{t('tags')}:</span>}
                >
                  {revisions.data[revisions.ui.selected].tags.map(
                    (tag: string, key: number) => (
                      <Tag key={key} minimal interactive icon={IconNames.TAG} large>
                        {tag}
                      </Tag>
                    ),
                  )}
                </FormGroup>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Revisions;
