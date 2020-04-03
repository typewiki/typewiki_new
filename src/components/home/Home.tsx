import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { info } from 'electron-log';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import axios from 'axios';
import { Column, useTable } from 'react-table';
import { remote, MenuItemConstructorOptions } from 'electron';
import { findDOMNode } from 'react-dom';

const { Menu, MenuItem } = remote;

const Revision: React.FC<any> = ({ row }) => {
  const menuItems: MenuItemConstructorOptions[] = [
    {
      label: 'Copy Revision Number',
      click: () => {
        console.log(432423);
      },
    },
    {
      label: 'Copy Revision SHA-1',
      click: () => {
        console.log(432423);
      },
    },
    {
      type: 'separator',
    },
    {
      label: `Checkout Revision '${row.original.revid}'...`,
      click: () => {
        console.log(432423);
      },
    },
    {
      label: 'Compare with Current',
      click: () => {
        console.log(432423);
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Rollback...',
    },
    {
      label: 'Undo Revision...',
    },
    {
      type: 'separator',
    },
    {
      label: 'Send thanks',
    },
  ];

  const menu = new Menu();
  menuItems.map(options => menu.append(new MenuItem(options)));

  const ref = useRef(null);

  React.useEffect(() => {
    // eslint-disable-next-line react/no-find-dom-node
    const domNode = findDOMNode(ref.current);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const listener = e => {
      e.preventDefault();
      menu.popup();
    };

    if (domNode) {
      domNode.addEventListener('contextmenu', listener);
      return () => {
        domNode.removeEventListener('contextmenu', listener);
      };
    }
  }, [ref]);
  return (
    <tr ref={ref} {...row.getRowProps()}>
      {row.cells.map((cell: any, j: any) => {
        return (
          <td key={j} {...cell.getCellProps()}>
            {cell.render('Cell')}
          </td>
        );
      })}
    </tr>
  );
};

const Home = () => {
  useEffect(() => info('Rendering Home component'), []);
  const { t } = useTranslation();

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'comment',
        accessor: 'comment',
      },
      {
        Header: 'Size',
        accessor: 'size',
        Cell: ({ cell }) => {
          return <span style={{ float: 'right' }}>{cell.value}</span>;
        },
      },
      {
        Header: 'user',
        accessor: 'user',
      },
      // {
      //   Header: 'timestamp',
      //   accessor: 'timestamp',
      //   Cell: ({ cell }) => {
      //     return <>{cell.value}</>;
      //   },
      // },
    ],
    [],
  );

  const [data, setData] = useState([]);
  React.useEffect(() => {
    const api = axios.create({
      baseURL:
        'https://ru.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles=React&rvprop=ids|size|sha1|contentmodel|timestamp|user|comment&formatversion=2&rvlimit=100',
    });
    (async () => {
      const { data } = await api.get('');
      setData(data.query.pages[0].revisions);
    })();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div>
      <p>fdgdfgdf</p>
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
            return <Revision key={i} row={row} {...row.getRowProps()} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
