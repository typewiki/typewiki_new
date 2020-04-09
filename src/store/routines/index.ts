import { createRoutine } from 'redux-saga-routines';

export const clientLogin = createRoutine('CLIENT_LOGIN');
export const logout = createRoutine('LOGOUT');

export const fetchRevisions = createRoutine('FETCH_REVISIONS');
export const fetchLinksHere = createRoutine('FETCH_LINKS_HERE');
export const fetchRevisionInfo = createRoutine('FETCH_REVISION_INFO');

export const fetchPageContent = createRoutine('FETCH_PAGE_CONTENT');
export const fetchUserInfo = createRoutine('FETCH_USER_INFO');
