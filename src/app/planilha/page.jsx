'use client';

import styles from './planilha.module.css';

export default function GerarPlanilha() {
    const gerarPlanilha = async () => {
        try {
            const baseURL = process.env.NEXT_PUBLIC_API_URL;

            if (!baseURL) {
                throw new Error('A variável de ambiente NEXT_PUBLIC_API_URL não está definida.');
            }

            const response = await fetch(`${baseURL}/gas/planilha`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro ao gerar a planilha:', response.status, errorText);
                throw new Error(`Erro ao gerar a planilha: ${response.status}`);
            }

            const blob = await response.blob();

            // Gera o nome do arquivo com a data (igual ao backend)
            const dataAtual = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
            const nomeArquivo = `LEVANTAMENTO DE GÁS ${dataAtual}.xlsx`;

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = nomeArquivo;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            alert('✅ Planilha gerada com sucesso!');
        } catch (error) {
            console.error('Erro ao gerar planilha:', error);
            alert('❌ Ocorreu um erro ao gerar a planilha');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>🧾 Gerador de Planilha de Gás</h1>
            <button onClick={gerarPlanilha} className={styles.button}>
                📥 Baixar Planilha
            </button>
        </div>
    );
}
