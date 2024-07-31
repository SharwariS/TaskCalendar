// __mocks__/firebaseConfig.js
import { jest } from '@jest/globals';

export const auth = {
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
};

export const db = {
  collection: jest.fn(() => ({
    add: jest.fn(),
  })),
};

export const firebase = {
  firestore: {
    FieldValue: {
      serverTimestamp: jest.fn(),
    },
  },
};

export const useRouter = () => ({
  push: jest.fn(),
});
