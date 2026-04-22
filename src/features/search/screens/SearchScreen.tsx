import React from 'react';
import { Screen } from '@src/shared/ui/Screen';
import { SearchResultsV2 } from '../components/SearchResultsV2';

export const SearchScreen: React.FC = () => {
  return (
    <Screen header={{ title: 'Rechercher', showNotificationBell: true }}>
      <SearchResultsV2 />
    </Screen>
  );
};

export default SearchScreen;
