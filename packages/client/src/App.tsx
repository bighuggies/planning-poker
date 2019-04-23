import { Router } from '@reach/router';
import React from 'react';

import { Lobby } from './pages/Lobby/Lobby';
import { Name } from './pages/Name/Name';
import { Poker } from './pages/Poker/Poker';
import { Start } from './pages/Start/Start';
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
        <Start path="/" />
        <Name path="/name" />
        <Lobby path="/lobby" />
        <Poker path="/poker" />
      </Router>
    </PageContainer>
  </PageLayout>
);

export default App;
