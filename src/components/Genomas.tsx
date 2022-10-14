import { useEffect, useState } from "react";
import { api } from "../services/Api";
import "./Genomas.css"
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import { ShowGenoma } from './ShowGenoma';

interface IProps {
    id_generation: number;
}

interface IGenoma {
    id: number;
    fitness: number;
    resultado_total_valor: number;
    total_trades_gain: number;
    total_trades_loss: number;
    total_trades: number;
    media_porcent_desejada: number;
    media_porcent_atingida: number;
    total_dias_training: number;
    id_generation: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '99vw',
    height: '98vh',
    bgcolor: '#242424',
    borderRadius: 4,
    border: 'none',
    boxShadow: 'none',
    outline: 'none'
};

export function Genomas(props: IProps) {

    const [genoma, setGenoma] = useState<IGenoma>();
    const handleGenoma = (gen: IGenoma) => setGenoma(gen)

    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);


    const [genomas, setGenomas] = useState<IGenoma[]>([])
    const getGenomas = async () => await api.get(`/getGenomas/${props.id_generation}`).then((response) => setGenomas(response.data));

    useEffect(() => {
        getGenomas();
    }, []);

    return (
        <div className="container-genoma">
            <div className="div-h2">
                <h2>Genomas</h2>
            </div>
            <div className="div-genoma">
                <div className="list-genomas">
                    {
                        genomas.map((g) => (
                            <div className="cart-genoma" key={g.id} onClick={() => { handleGenoma(g); handleOpen(); }}>
                                <div><strong>Id</strong> {g.id}</div>
                                <div><strong>Fitness</strong> {g.fitness.toFixed(2)}</div>
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    <strong>Resultado Total Valor       :</strong>
                                    <div style={g.resultado_total_valor >= 0 ? { color: "#00FF00" } : { color: "#FF0000" }}>
                                        R$ {g.resultado_total_valor.toFixed(2)}
                                    </div>
                                </div>
                                <div><strong>Total Trades Gain</strong> {g.total_trades_gain}</div>
                                <div><strong>Total Trades Loss</strong> {g.total_trades_loss}</div>
                                <div><strong>Total Trades</strong> {g.total_trades}</div>
                                <div><strong>Media Porcent Desejada</strong> {g.media_porcent_desejada.toFixed(2)}%</div>
                                <div><strong>Media Porcent Atingida</strong> {g.media_porcent_atingida.toFixed(2)}%</div>
                                <div><strong>Total Dias Training</strong> {g.total_dias_training}</div>
                                <div><strong>Id Generation</strong> {g.id_generation}</div>
                            </div>
                        ))
                    }
                </div>

                <Modal
                    open={show}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <div className="close-modal-genoma">
                            <div className="close-genoma" onClick={handleClose}>
                                <strong>Close</strong>
                            </div>
                        </div>
                        {
                            genoma ?
                                <ShowGenoma genoma={genoma} />
                            :<div>
                                Genoma Não Encontrado!
                            </div>
                        }
                    </Box>
                </Modal>
            </div>
        </div>
    );
}