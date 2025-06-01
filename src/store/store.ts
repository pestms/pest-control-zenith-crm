
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './slices/leadsSlice';
import quotationsReducer from './slices/quotationsSlice';
import dashboardReducer from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    quotations: quotationsReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
