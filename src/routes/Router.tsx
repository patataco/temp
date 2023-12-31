import { Navigate, Outlet, useRoutes } from 'react-router';

import { IssueProvider, IssuelistProvider } from '@/context';

import { ROUTES_PATH } from '@/constants/routes';

import IssueList from '@/pages/IssueList';
import Issue from '@/pages/Issue';

import IssueFetcher from '@/fetcher/IssueFetcher';
import IssueListFetcher from '@/fetcher/IssueListFetcher';

import Header from '@/components/Header';
import ApiErrorBoundary from '@/boundary/ApiErrorBoundary';
import ErrorCard from '@/components/ErrorCard';
import { GlobalErrorBoundary } from '@/boundary/GlobalErrorBoundary';

const Router = () => {
  const routes = useRoutes([
    { path: ROUTES_PATH.HOME, element: <Navigate to={ROUTES_PATH.ISSUE_LIST} replace /> },
    {
      path: ROUTES_PATH.HOME,
      element: (
        <>
          <Header />
          <Outlet />
        </>
      ),
      children: [
        {
          path: ROUTES_PATH.ISSUE_LIST,
          element: (
            <IssuelistProvider>
              <ApiErrorBoundary fallback={({ error }) => <ErrorCard message={error.message} />}>
                <IssueListFetcher>
                  <IssueList />
                </IssueListFetcher>
              </ApiErrorBoundary>
            </IssuelistProvider>
          ),
        },
        {
          path: `${ROUTES_PATH.ISSUE_LIST}/:issueNumber`,
          element: (
            <IssueProvider>
              <IssueFetcher>
                <Issue />
              </IssueFetcher>
            </IssueProvider>
          ),
        },
      ],
    },
    { path: '*', element: <ErrorCard /> },
  ]);
  return (
    <GlobalErrorBoundary renderFallback={({ error }) => <ErrorCard message={error.message} />}>
      {routes}
    </GlobalErrorBoundary>
  );
};

export default Router;
