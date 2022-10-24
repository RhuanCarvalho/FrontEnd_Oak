import "./ShowTestGenoma.css"
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import { api } from "../services/Api";

import { ShowGenomaGraphCandleTraining } from "./ShowGenomaGraphCandleTraining";
import { ShowGenomaGraphCandleTrainingOfTest } from './ShowGenomaGraphCandleTrainingOfTest';

interface ITraining {
    id: number;
    resultado_diario_valor: number;
    total_trades_gain: number;
    total_trades_loss: number;
    total_trades: number;
    porcent_trades_gain: number;
    porcent_trades_loss: number;
    id_genoma: number;
    id_dia: number;
    dia: {
        id: number,
        dia: Date
    }
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


export function ShowTestGenoma() {

    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const [training, setTraining] = useState<ITraining>();

    const getTraining = async () => await api
        .get(`getTrainingsOfTest`)
        .then((response) => setTraining(response.data))

    useEffect(() => {
        getTraining();
    }, [])


    return (

        <div>
            <div className="close-modal-training">
                <div className="open-test-training" onClick={handleOpen}>
                    <strong>Show Test Genoma</strong>
                </div>
            </div>
            <Modal
                open={show}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div className="close-modal-training">
                        <div className="close-training" onClick={handleClose}>
                            <strong>Close</strong>
                        </div>
                    </div>
                    {
                        training ?
                            <ShowGenomaGraphCandleTrainingOfTest training={training} />
                            : <div>
                                Training Não Encontrado!
                            </div>
                    }
                </Box>
            </Modal>
        </div>



    );

}