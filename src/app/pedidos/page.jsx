"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import styles from './pedidos.module.css';

export default function PedidoGasPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        gasTipo: '',
        userName: '',
        gasPrecisa: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Token decodificado:', decoded);

                if (decoded.userName) {
                    setFormData(prev => ({
                        ...prev,
                        userName: decoded.userName
                    }));
                } else {
                    setMessage({
                        text: 'Token inválido. Faça login novamente.',
                        type: 'error'
                    });
                    setTimeout(() => router.push('/'), 2000);
                }
            } catch (error) {
                console.error('Erro ao decodificar token:', error);
                setMessage({
                    text: 'Erro no token. Faça login novamente.',
                    type: 'error'
                });
                setTimeout(() => router.push('/'), 2000);
            }
        } else {
            setMessage({
                text: 'Você precisa estar logado para fazer um pedido.',
                type: 'error'
            });
            setTimeout(() => router.push('/'), 2000);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ text: '', type: '' });

        const token = Cookies.get('token');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // 🔥 ENVIA O TOKEN AQUI
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar pedido de gás');
            }

            setMessage({
                text: 'Pedido de gás criado com sucesso!',
                type: 'success'
            });

            setFormData(prev => ({
                gasTipo: '',
                userName: prev.userName,
                gasPrecisa: false
            }));

            setTimeout(() => {
                router.refresh();
            }, 2000);

        } catch (error) {
            setMessage({
                text: error.message,
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Novo Pedido de Gás</h1>
                    <p className={styles.subtitle}>Preencha os dados abaixo para solicitar seu gás.</p>
                </div>

                {message.text && (
                    <div className={`${styles.statusMessage} ${message.type === 'success' ? styles.success : styles.error}`}>
                        {message.text}
                    </div>
                )}

                {formData.userName && (
                    <div className={styles.infoUser}>
                        <p>Fazendo pedido como: <strong>{formData.userName}</strong></p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={`${styles.form} ${styles.fadeIn}`}>
                    <div>
                        <label htmlFor="gasTipo" className={styles.label}>Tipo de Gás</label>
                        <select
                            id="gasTipo"
                            name="gasTipo"
                            value={formData.gasTipo}
                            onChange={handleChange}
                            required
                            className={styles.select}
                        >
                            <option value="">Selecione</option>
                            <option value="P13">P13 (13kg)</option>
                            <option value="P45">P45 (45kg)</option>
                        </select>
                    </div>

                    <div>
                        <label className={styles.label}>Precisa de gás?</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="gasPrecisa"
                                    value={true}
                                    checked={formData.gasPrecisa === true}
                                    onChange={() => setFormData({ ...formData, gasPrecisa: true })}
                                    className={styles.radioInput}
                                />
                                Sim
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="gasPrecisa"
                                    value={false}
                                    checked={formData.gasPrecisa === false}
                                    onChange={() => setFormData({ ...formData, gasPrecisa: false })}
                                    className={styles.radioInput}
                                />
                                Não
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !formData.userName || !formData.gasTipo}
                        className={styles.button}
                    >
                        {isLoading ? 'Enviando...' : 'Criar Pedido'}
                    </button>
                </form>
            </div>

            <div className={styles.imageContainer}>
                <div className={styles.pixelOverlay}></div>
            </div>
        </div>

    );
}
