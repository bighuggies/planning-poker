import { Router } from '@reach/router';
import React from 'react';

import { GlobalStyles } from '../../../patterns/GlobalStyles';
import { PageContainer } from '../../../patterns/PageContainer';
import { PageHeader } from '../../../patterns/PageHeader';
import { PageLayout } from '../../../patterns/PageLayout';
import { Lobby } from '../Lobby/Lobby';
import { Name } from '../Name/Name';
import { Poker } from '../Poker/Poker';
import { Start } from '../Start/Start';

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
