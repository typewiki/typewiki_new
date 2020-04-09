import React from 'react';
import { Button, Classes, Icon, Tab, Tabs } from '@blueprintjs/core';
import styles from './PagesTabs.module.scss';
import Editor from './Editor';
import { useDispatch, useSelector } from 'react-redux';
import { closeTab, createTab, openTab } from '../../store/actions/revisions';
import tabSchema from '../../store/schemas/tab';
import useDenormalize from '../../use-denormalize';

const PageTabs = () => {
  // @ts-ignore
  const { currentTabId } = useSelector(({ tabs }) => tabs);

  const [data] = useDenormalize(tabSchema, ({ tabs }) => ({
    input: tabs.results,
    entities: tabs.entities,
  }));

  const dispatch = useDispatch();

  const handleChange = React.useCallback(newTabId => {
    if (newTabId) {
      dispatch(openTab(newTabId));
    }
  }, []);

  const handleCreate = React.useCallback(() => dispatch(createTab()), []);
  const handleClose = React.useCallback(tabId => dispatch(closeTab(tabId)), []);

  return (
    <Tabs
      className="page-tabs"
      selectedTabId={currentTabId}
      animate={false}
      onChange={handleChange}
    >
      {data.map((tab: any) => (
        <Tab
          id={tab.id}
          key={`tab_${tab.id}`}
          className={styles.tab}
          title={
            <Button
              className={styles.button}
              text={<span className={Classes.TEXT_SMALL}>{tab.id}</span>}
              outlined
              rightIcon={
                <Icon
                  icon="small-cross"
                  className={styles.close}
                  onClick={e => {
                    e.stopPropagation();
                    handleClose(tab.id);
                  }}
                />
              }
            />
          }
          panel={<Editor />}
        />
      ))}
      <Tab
        title={<Icon icon="small-plus" className={styles.plus} onClick={handleCreate} />}
      />
    </Tabs>
  );
};

export default PageTabs;
