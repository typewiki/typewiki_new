import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuItem icon="star" text={t('mywatchlist')} />
      <MenuItem icon="cog" text={t('mypreferences')} />
      <MenuDivider />
      <MenuItem icon="log-out" text={t('pt-userlogout')} />
    </Menu>
  );
};

export default UserMenu;
