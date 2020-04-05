import React from 'react';
import { MenuItemConstructorOptions } from 'electron';
import { Row } from 'react-table';
import useContextMenu from '../use-context-menu';

const RevisionRow: React.FC<Row<any>> = ({
  original,
  getRowProps,
  cells,
  // @ts-ignore
  handleSelect,
}) => {
  const items: MenuItemConstructorOptions[] = React.useMemo(
    () => [
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
    ],
    [],
  );

  const [ref] = useContextMenu(items);

  return (
    <tr ref={ref} onClick={() => handleSelect(original)} {...getRowProps()}>
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

export default React.memo(RevisionRow);
