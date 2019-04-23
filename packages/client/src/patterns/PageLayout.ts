import styled from 'styled-components';

export const PageLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  & > header {
    flex: 0 0 auto;
    z-index: 1;
  }

  & > main {
    flex: 1 1 auto;
  }
`;
