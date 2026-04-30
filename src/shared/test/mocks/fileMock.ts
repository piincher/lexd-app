/**
 * File mock for handling static asset imports in tests
 */

import type { ReactNode } from 'react';

export const ReactComponent = ({ children }: { children?: ReactNode }) => children;

const fileMock = 'test-file-stub';

export default fileMock;

if (typeof module !== 'undefined') {
  module.exports = {
    __esModule: true,
    default: fileMock,
    ReactComponent,
  };
};
