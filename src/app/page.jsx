// app/page.js - Página principal de autenticação
"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/loginForm";
import styles from "./page.module.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <h1 className={styles.logo}>
              <span className={styles.gameText}>Pedido de </span>
              <span className={styles.retroText}>Gás</span>
            </h1>
            <div className={styles.arcade}></div>
          </div>

          <p className={styles.slogan}>
            Entre para mandar o pedido de gás!
          </p>
        </div>

        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

        </div>

        <div className={styles.formWrapper}>
          
            <LoginForm />

        </div>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.pixelOverlay}></div>
      </div>
    </div>
  );
}