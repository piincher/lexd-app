/**
 * Auth Store Reference
 * Breaks the circular dependency between shared/api/client and app/store/Auth.
 * The app layer registers the auth store at module initialization time.
 */

export interface AuthStoreRef {
  getState: () => {
    token: string;
    refreshToken: string;
    user: any;
    setAuth: (data: any) => void;
  };
}

let authStoreRef: AuthStoreRef | null = null;

export const setAuthStoreRef = (ref: AuthStoreRef): void => {
  authStoreRef = ref;
};

export const getAuthStoreRef = (): AuthStoreRef | null => authStoreRef;
