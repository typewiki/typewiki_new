import React, { useEffect } from 'react';
import { info } from 'electron-log';
import { DateRangeInput } from '@blueprintjs/datetime';
import { Revisions } from '../revisions';
import { Button, Tab, Tabs } from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';
import { RecentChangesLinked } from '../recent-changes-linked';
import { LinksHere } from '../links-here';
import PageTabs from './PagesTabs';

const Home = () => {
  useEffect(() => info('Rendering Home component'), []);
  const { t } = useTranslation();
  const [selectedTabId, setSelectedTabId] = React.useState('page.history');
  return (
    <div>


      <PageTabs />
      <Tabs
        id="TabsExample"
        onChange={newTabId => {
          // @ts-ignore
          setSelectedTabId(newTabId);
        }}
        selectedTabId={selectedTabId}
        renderActiveTabPanelOnly
      >
        <Tab id="page.history" title={t('history')} panel={<Revisions />} />
        <Tab
          id="page.recentchangeslinked"
          title={t('recentchangeslinked')}
          panel={<RecentChangesLinked />}
        />
        <Tab id="page.linkshere" title={t('whatlinkshere')} panel={<LinksHere />} />
      </Tabs>
      {/*<DateRangeInput formatDate={() => 'fdfd'} parseDate={() => new Date()} />*/}
    </div>
  );
};

export default Home;
