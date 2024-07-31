import React from 'react';
import AuthForm from '../components/AuthForm/AuthForm';
import styles from './signup.module.css';

const Signup = () => (
    <div className={styles.signupContainer}>
        <div className={styles.body}>
            <h1 className={styles.title}>Signup</h1>
            <AuthForm mode="signup" />
        </div>
    </div>
);

export default Signup;
