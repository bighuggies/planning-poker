import { Redirect, Router } from '@reach/router';
import React from 'react';

import { Lobby } from './pages/Lobby/Lobby';
import { Name } from './pages/Name/Name';
import { Poker } from './pages/Poker/Poker';
import { Room } from './pages/Room/Room';
import { GlobalStyles } from './patterns/GlobalStyles';
import { PageContainer } from './patterns/PageContainer';
import { PageHeader } from './patterns/PageHeader';
import { PageLayout } from './patterns/PageLayout';

const App: React.FunctionComponent = () => (
  <PageLayout>
    <GlobalStyles />
    <PageHeader />
    <PageContainer>
      <Router>
        <Redirect noThrow={true} from="/" to="/name" />
        <Name path="/name" />
        <Room path="/room" />
        <Lobby path="/room/:roomIdParam" />
        <Poker path="/room/:roomIdParam/poker" />
      </Router>
    </PageContainer>
  </PageLayout>
);

export default App;
