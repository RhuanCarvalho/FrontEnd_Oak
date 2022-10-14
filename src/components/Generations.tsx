import { Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../services/Api";
import "./Generations.css"
import { Genomas } from './Genomas';

interface IGeneraton {
    id: number;
    id_generation: number;
    total_dias_treinados: number;
    total_populacao: number;
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

export function Generations() {

    const [idG, setIdG] = useState(-1);
    const handleIdG = (id: number) => setIdG(id)

    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);


    const [generations, setGenerations] = useState<IGeneraton[]>([])
    const getGenerations = async () => await api.get('/getGenerations').then((response) => setGenerations(response.data));

    useEffect(() => {
        getGenerations();
    }, []);

    return (
        <div className="div-generation">
            {
                generations.map((g) => (
                    <div className="cart-generation" key={g.id} onClick={() => { handleIdG(g.id); handleOpen(); }}>
                        <div>
                            <strong>
                                Id Generation {g.id_generation}
                            </strong>
                        </div>
                        <div>
                            <div>Total Day Trains {g.total_dias_treinados}</div>
                            <div>Total Population {g.total_populacao}</div>
                        </div>
                    </div>
                ))
            }

            <Modal
                open={show}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div className="close-modal" >
                        <div className="close" onClick={handleClose}>
                            <strong>Close</strong>
                        </div>
                    </div>
                    <Genomas id_generation={idG} />
                </Box>
            </Modal>
        </div>
    );

}