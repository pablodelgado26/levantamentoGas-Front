export default function PedidosPage() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#f5f6fa'
        }}>
            <h1 style={{ color: '#273c75' }}>Pedidos</h1>
            <p style={{ color: '#353b48' }}>Bem-vindo à página de pedidos!</p>
            <button style={{
                padding: '10px 20px',
                background: '#00a8ff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px'
            }}>
                Novo Pedido
            </button>
        </div>
    );
}                                                                                                                                                                                                                                                                                                                                                                                                       