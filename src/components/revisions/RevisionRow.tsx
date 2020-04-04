import React from 'react';
import { remote, MenuItemConstructorOptions } from 'electron';
import { findDOMNode } from 'react-dom';
import { Row } from 'react-table';

const { Menu, MenuItem } = remote;

const RevisionRow: React.FC<Row<any>> = ({ original, getRowProps, cells }) => {
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
      label: `Checkout Revision '${original.revid}'...`,
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

  const ref = React.useRef(null);

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
    <tr ref={ref} {...getRowProps()}>
      {cells.map((cell: any, j: any) => {
        return (
          <td key={j} {...cell.getCellProps()}>
            {cell.render('Cell')}
          </td>
        );
      })}
    </tr>
  );
};

export default RevisionRow;
