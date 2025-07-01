import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/backend/internal';
          declare module 'h3' {
            type AuthObjectHandler = (SignedInAuthObject | SignedOutAuthObject) & {
              (): SignedInAuthObject | SignedOutAuthObject;
            }

            interface H3EventContext {
              auth: AuthObjectHandler;
            }
          }
        