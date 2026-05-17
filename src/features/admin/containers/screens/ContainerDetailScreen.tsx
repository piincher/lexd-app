import React from 'react';
import { withErrorBoundary } from '@src/shared/lib/sentry';
import { ContainerDetailScreenInner } from './components/ContainerDetailScreenInner';
import { ErrorState } from './components/ErrorState';

export const ContainerDetailScreen = withErrorBoundary(ContainerDetailScreenInner, {
  fallback: <ErrorState onBack={() => {}} />,
  onError: (error, info) => {
    console.error('ContainerDetailScreen crashed:', error, info);
  },
});

export default ContainerDetailScreen;
