import React from 'react';

import { StateContext } from './StateContext';

export const useAppState = () => React.useContext(StateContext);
