import { createAction } from '@reduxjs/toolkit';

export const selectRevision = createAction<number>('SELECT_REVISION');

export const createTab = createAction('CREATE_TAB');
export const openTab = createAction<string>('OPEN_TAB');
export const closeTab = createAction<string>('CLOSE_TAB');
