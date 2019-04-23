import React from 'react';

import { ApiContext } from './ApiContext';

export const useApi = () => React.useContext(ApiContext);
