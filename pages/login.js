import React from 'react';
import AuthForm from '../components/AuthForm/AuthForm';
import styles from './login.module.css';

const Login = () => (
    <div className={styles.loginContainer}>
        <div className={styles.body}>
            <h1 className={styles.title}>Login</h1>
            <AuthForm mode="login" />
        </div>
    </div>
);

export default Login;
