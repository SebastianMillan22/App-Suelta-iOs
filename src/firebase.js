import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  initializeAuth, 
  indexedDBLocalPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-cZinxuc4nJpjtqDM2PcvNuj5sTEBnmw",
  authDomain: "gen-lang-client-0636162987.firebaseapp.com",
  projectId: "gen-lang-client-0636162987",
  storageBucket: "gen-lang-client-0636162987.firebasestorage.app",
  messagingSenderId: "706031612034",
  appId: "1:706031612034:web:fb85a0dd27e7ee14dd049b",
};

export const app = initializeApp(firebaseConfig);

// Inicialización resiliente de Auth con soporte para Capacitor iOS y Web
export const auth = (() => {
  if (typeof window !== "undefined") {
    try {
      return initializeAuth(app, {
        persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence]
      });
    } catch (_) {
      return getAuth(app);
    }
  }
  return getAuth(app);
})();
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
}, "ai-studio-appsuelta-c2cae02a-d829-4aa0-879c-a9a2d4264eea");
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
