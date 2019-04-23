import React from 'react';
import styled from 'styled-components';

import { palette } from './palette';

const StyledHeader = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background-color: ${palette.gray(100)};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const PageHeader: React.FunctionComponent = () => (
  <StyledHeader>
    <StyledTitle>Planning Poker</StyledTitle>
  </StyledHeader>
);
