import React from 'react';
import { Button, Classes, Tab, Tabs } from '@blueprintjs/core';
import styles from './PagesTabs.module.scss';

const PageTabs = () => {
  const [selectedTabId, setSelectedTabId] = React.useState('xxxx');
  return (
    <Tabs
      className="page-tabs"
      selectedTabId={selectedTabId}
      animate={false}
      onChange={newTabId => {
        setSelectedTabId(newTabId.toString());
      }}
    >
      <Tab
        id="xxxx"
        className={styles.tab}
        title={
          <Button
            className={styles.button}
            text={<span className={Classes.TEXT_SMALL}>5454</span>}
            outlined
            rightIcon="small-cross"
          />
        }
        panel={<>sdsad</>}
      />
      <Tab
        id="xxxx2"
        className={styles.tab}
        title={
          <Button
            className={styles.button}
            text={<span className={Classes.TEXT_SMALL}>5454</span>}
            outlined
            rightIcon="small-cross"
          />
        }
        panel={<>4444sdsad</>}
      />
    </Tabs>
  );
};

export default PageTabs;
