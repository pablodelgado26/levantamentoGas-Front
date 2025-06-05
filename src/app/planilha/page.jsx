"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import styles from "./planilha.module.css";

export default function PedidoGasPage() {
  const [userName, setUserName] = useState("");
  const [frase, setFrase] = useState("");

const frasesDoDia = [
    "Acredite em você e tudo será possível!",
    "Cada dia é uma nova chance para recomeçar.",
    "Sucesso é a soma de pequenos esforços repetidos diariamente.",
    "Seja a mudança que você quer ver no mundo.",
    "Não coloque limites em seus sonhos, coloque fé.",
    "A persistência realiza o impossível.",
    "Grandes conquistas começam com pequenos passos.",
    "O otimismo é a chave que abre portas.",
    "Quem corre sozinho pode até chegar mais rápido, mas quem vai acompanhado chega mais longe.",
    "O melhor projeto da sua vida é você mesmo.",
    "Desafios são oportunidades disfarçadas.",
    "A jornada é tão importante quanto o destino.",
    "Aprenda com o ontem, viva o hoje e sonhe com o amanhã.",
    "A coragem é a resistência ao medo, domínio do medo, e não a ausência do medo.",
    "O sucesso nasce do querer, da determinação e persistência.",
    "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
    "Acredite: tudo tem o seu tempo.",
    "O segredo do progresso é começar.",
    "Não espere por oportunidades, crie-as.",
    "A vida é feita de escolhas. Escolha ser feliz hoje.",
    "O esforço de hoje é o sucesso de amanhã.",
    "A gratidão transforma o que temos em suficiente.",
    "Nunca é tarde para recomeçar.",
    "A vida recompensa quem não desiste.",
    "A simplicidade é o último grau de sofisticação.",
    "O importante não é vencer todos os dias, mas lutar sempre.",
    "A maior glória não está em nunca cair, mas em levantar-se sempre que se cai.",
    "Faça mais do que te faz feliz.",
    "A mente é como um paraquedas: só funciona se estiver aberta.",
    "A esperança é o sonho do homem acordado.",
    "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
    "A vida é feita de momentos, aproveite cada um deles.",
    "Acredite no seu potencial e vá além.",
    "O impossível é apenas uma opinião.",
    "Sorria, você está sendo feliz agora.",
    "A vida é curta demais para não arriscar.",
    "Seja luz por onde passar.",
    "A determinação de hoje constrói o sucesso de amanhã.",
    "A vida é feita de tentativas, não de certezas.",
    "O melhor está sempre por vir.",
    "Transforme seus sonhos em planos e seus planos em realidade."
];

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.userName) {
          setUserName(decoded.userName);
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    }
  }, []);

  const handleGerarPlanilha = () => {
    alert("Aqui você implementa a geração da planilha Excel!");
    // 👉 Aqui você pode colocar a lógica real de gerar o Excel
  };

  const handleFraseDoDia = () => {
    const fraseAleatoria =
      frasesDoDia[Math.floor(Math.random() * frasesDoDia.length)];
    setFrase(fraseAleatoria);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          Seja bem-vindo, <strong>{userName}</strong>!
        </h1>
        <p className={styles.subtitle}>
          Aqui você pode gerar sua planilha de pedidos.
        </p>

        <button onClick={handleGerarPlanilha} className={styles.button}>
          Gerar Planilha Excel
        </button>

        <button onClick={handleFraseDoDia} className={styles.button}>
          Frase do Dia
        </button>

        {frase && (
          <div className={styles.infoUser}>
            <p>{frase}</p>
          </div>
        )}
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.pixelOverlay}></div>
      </div>
    </div>
  );
}
