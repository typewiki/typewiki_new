import { createAction } from '@reduxjs/toolkit';

export const selectRevision = createAction<number>('SELECT_REVISION');
