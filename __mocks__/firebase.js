// __mocks__/firebase.js

const mockSignInWithEmailAndPassword = jest.fn(() => {
    return Promise.reject(new Error('Invalid credentials'));
  });
  
  const mockCreateUserWithEmailAndPassword = jest.fn(() => {
    return Promise.reject(new Error('User already exists'));
  });
  
  module.exports = {
    auth: {
      signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
      createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    },
    db: {
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve()),
      })),
    },
    firebase: {
      firestore: {
        FieldValue: {
          serverTimestamp: jest.fn(),
        },
      },
    },
  };
  