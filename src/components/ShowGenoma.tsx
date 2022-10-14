import "./ShowGenoma.css"
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import { api } from "../services/Api";
import { ShowGenomaGraphPorcentDays } from './ShowGenomaGraphPorcentDays';
import { ShowGenomaGraphDrawdown } from './ShowGenomaGraphDrawdown';
import { ShowGenomaGraphCandleTraining } from "./ShowGenomaGraphCandleTraining";

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
interface IProps {
    genoma: IGenoma;
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


export function ShowGenoma(props: IProps) {

    const [trainings, setTrainings] = useState<ITraining[]>()

    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const [training, setTraining] = useState<ITraining>();
    const handleTraining = (train: ITraining) => setTraining(train)

    const getTrainings = async () => await api
        .get(`getTrainings/${props.genoma.id}`)
        .then((response) => setTrainings(response.data))

    const convertDate = (date: Date) => {
        var _data = new Date(date)
        return `${_data.getUTCDate().toLocaleString()}/${_data.getUTCMonth().toLocaleString()}/${_data.getUTCFullYear()}`
    }

    useEffect(() => {
        getTrainings();
        console.log(trainings ? trainings[0].dia.dia : 0)
    }, [])


    return (
        <div className="div-show-genoma">
            <div className="info-genoma">
                <div className="h3-pers">
                    <h3><strong>Genoma</strong></h3>
                    <h6>(info)</h6>
                </div>
                <div className="cart-genoma-show">
                    <div><strong>Id</strong> {props.genoma.id}</div>
                    <div><strong>Fitness</strong> {props.genoma.fitness.toFixed(2)}</div>
                    <div><strong>Resultado Total Valor</strong> R$ {props.genoma.resultado_total_valor.toFixed(2)}</div>
                    <div><strong>Total Trades Gain</strong> {props.genoma.total_trades_gain}</div>
                    <div><strong>Total Trades Loss</strong> {props.genoma.total_trades_loss}</div>
                    <div><strong>Total Trades</strong> {props.genoma.total_trades}</div>
                    <div><strong>Media Porcent Desejada</strong> {props.genoma.media_porcent_desejada.toFixed(2)}%</div>
                    <div><strong>Media Porcent Atingida</strong> {props.genoma.media_porcent_atingida.toFixed(2)}%</div>
                    <div><strong>Total Dias Training</strong> {props.genoma.total_dias_training}</div>
                    <div><strong>Id Generation</strong> {props.genoma.id_generation}</div>
                </div>
            </div>
            <div className="info-trainings">
                <div className="h3-pers">
                    <h3><strong>Lista Trainings</strong></h3>
                    <h6>(Scrolling)</h6>
                </div>

                <div className="list-trainings">
                    {
                        trainings?.map((t) => (
                            <div className="cart-training" key={t.id} onClick={() => { handleTraining(t); handleOpen(); }}>
                                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}><h6 style={{ width: "130px", padding: 0, margin: 0 }} >Click for Viewer in Graph</h6></div>
                                <div><strong>Id</strong> {t.id}</div>
                                <div><strong>Total Trades</strong> {t.total_trades}</div>
                                <div><strong>Total acertos</strong> {t.total_trades_gain}</div>
                                <div><strong>Total erros</strong> {t.total_trades_loss}</div>
                                <div ><strong>Porcentagem Acerto</strong> {t.porcent_trades_gain.toFixed(2)}%</div>
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    <strong>Resultado Total Valor       :</strong>
                                    <div style={t.resultado_diario_valor >= 0 ? { color: "#00FF00" } : { color: "#FF0000" }}>
                                        R$ {t.resultado_diario_valor.toFixed(2)}
                                    </div>
                                </div>
                                <div><strong>Dia {convertDate(t.dia.dia)}</strong></div>
                            </div>
                        ))
                    }
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
                                <ShowGenomaGraphCandleTraining training={training} />
                            :<div>
                                Training Não Encontrado!
                            </div>
                        }
                    </Box>
                </Modal>


                </div>
            </div>
            <div className="info-graphs">
                <ShowGenomaGraphPorcentDays id_genoma={props.genoma.id} />
                <ShowGenomaGraphDrawdown id_genoma={props.genoma.id} />
            </div>
        </div>

    );

}