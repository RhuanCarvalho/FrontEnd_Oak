import "./ShowGenomaGraphCandleTrainingOfTest.css";
import Chart from "react-apexcharts";
import { useState } from 'react';
import { ApexOptions } from "apexcharts";
import { api } from "../services/Api";
import { useEffect } from 'react';
import { Box, Modal } from "@mui/material";
import { ShowGenomaGraphCandleTrade } from "./ShowGenomaGraphCandleTrade";
import { ShowGenomaGraphCandleTradeOfTest } from './ShowGenomaGraphCandleTradeOfTest';

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

interface IHistoryTrade {
    id: number;
    tipo_trade: number;
    data_trade_entrada: Date;
    data_trade_saida: Date;
    trade_entrada: number;
    trade_saida: number;
    stop: number;
    gain: number;
    resultado_valor: number;
    resultado_pontos: number;
    id_training: number;
}


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

interface IProps {
    training: ITraining;
}

export function ShowGenomaGraphCandleTrainingOfTest(props: IProps) {

    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const [history, setHistory] = useState<IHistoryTrade>();
    const handleHistory = (hist: IHistoryTrade) => setHistory(hist)


    const [series, setSeries] = useState<ApexAxisChartSeries>([])

    const [historyTrades, setHistoryTrades] = useState<IHistoryTrade[]>();

    const [data, setData] = useState<ApexOptions>(
        {
            chart: {
                zoom: {
                    enabled: true,
                    type: 'xy',
                    autoScaleYaxis: true,

                },
            },
            stroke: {
                width: [1, 5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
            },
            tooltip: {
                shared: false,
                custom: [function ({ seriesIndex, dataPointIndex, w }) {
                    return w.globals.series[seriesIndex][dataPointIndex]
                }, function ({ seriesIndex, dataPointIndex, w }) {
                    var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
                    var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
                    var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
                    return (
                        ''
                    )
                }]
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    style: {
                        colors: '#fff'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#fff'
                    },
                }
            },
            legend: {
                show: false
            },
            grid: {
                show: false
            }
        }
    )

    const convertHour = (date: Date) => {
        var _data = new Date(date)
        return `${_data.getUTCHours().toLocaleString()}h ${_data.getUTCMinutes().toLocaleString()}min`
    }

    const convertDate = (date: Date) => {
        var _data = new Date(date)
        return `${_data.getUTCDate().toLocaleString()}/${Number(_data.getUTCMonth().toLocaleString())+1}/${_data.getUTCFullYear()}`
    }

    const getDataHistTrades = async () => await api
        .get(`getShowHistoryTradesOfTest/${props.training.id}`)
        .then((response) => setHistoryTrades(response.data))

    const getDataGraph = async () => await api
        .get(`getShowGraphTrainingsOfTest/${props.training.id}`)
        .then((response) => setSeries(response.data))

    useEffect(() => {
        getDataGraph();
        getDataHistTrades();
    }, [])

    return (
        <div className="cart-show-genoma-graph">
            <div className="cart-graph-candles">
                <Chart
                    options={data}
                    series={series}
                    type='line'
                    width={800}
                    height={550}
                />
            </div>
            <div className="history-trades">
                <div className="h3-pers">
                    <h3><strong>Lista Trades - {convertDate(props.training.dia.dia)} {}</strong></h3>
                    <h6>(Scrolling)</h6>
                </div>
                <div className="list-history-trades">
                    {
                        historyTrades?.map((h) => (
                            <div className="cart-history-trades" key={h.id} onClick={() => { handleHistory(h); handleOpen(); }}>
                                <div style={{ width: "100%", display: "flex", justifyContent: "end" }}><h6 style={{ width: "130px", padding: 0, margin: 0 }} >Click for Viewer in Graph</h6></div>
                                <div><strong>Order</strong> {h.tipo_trade} - <strong>{convertHour(h.data_trade_entrada)}</strong></div>
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    <strong>{h.resultado_pontos}pts | </strong>
                                    <strong>
                                        <div style={h.resultado_valor >= 0 ? { color: "#00FF00" } : { color: "#FF0000" }}>
                                            R$ {h.resultado_valor.toFixed(2)}
                                        </div>
                                    </strong>
                                </div>
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
                            history ?
                                <ShowGenomaGraphCandleTradeOfTest historyTrade={history} />
                            :<div>
                                History Trade Não Encontrado!
                            </div>
                        }
                    </Box>
                </Modal>
                </div>
            </div>
        </div>
    )
}



