import "./styles.css";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import imgLogin from "../../assets/login.png";

export default function OrderAssignment() {

    return (
        <main>
            <div className="assignment">
                <h2>Pedido #123</h2>
                <h3>Cliente: #123</h3>
                <div className="div-btn-assignment">
                    <Stack direction="row" spacing={2}>
                        <Button size="large">Iniciar Tracking</Button>
                    </Stack>
                    {/* <img src={imgLogin} alt="imagem login" /> */}
                </div>
            </div>
        </main>
    );
}