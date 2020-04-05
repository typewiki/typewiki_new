import React from 'react';
import { MenuItemConstructorOptions, remote } from 'electron';
import { findDOMNode } from 'react-dom';

const { Menu, MenuItem } = remote;

function useContextMenu(items: MenuItemConstructorOptions[]) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const menu = new Menu();
    items.map(item => menu.append(new MenuItem(item)));

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

  return [ref];
}

export default useContextMenu;
