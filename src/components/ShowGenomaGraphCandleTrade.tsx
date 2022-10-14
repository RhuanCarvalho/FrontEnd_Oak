import "./ShowGenomaGraphCandleTrade.css";
import Chart from "react-apexcharts";
import { useState } from 'react';
import { ApexOptions } from "apexcharts";
import { api } from "../services/Api";
import { useEffect } from 'react';

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


interface IProps {
    historyTrade: IHistoryTrade;
}

export function ShowGenomaGraphCandleTrade(props: IProps) {


    const [series, setSeries] = useState<ApexAxisChartSeries>([])

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
                width: [1, 7,7,7,7]
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


    const getDataGraph = async () => await api
        .get(`getShowGraphTrade/${props.historyTrade.id}`)
        .then((response) => setSeries(response.data))

    useEffect(() => {
        getDataGraph();
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
                    <h3><strong>Trade</strong></h3>
                    <h6>(info)</h6>
                </div>
                <div className="list-history-trades">
                    <div className="cart-history-trades">
                        <div><strong>id: {props.historyTrade.id}</strong></div>
                        <div><strong>Order</strong> {props.historyTrade.tipo_trade} - <strong>{convertHour(props.historyTrade.data_trade_entrada)}</strong></div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            <strong>{props.historyTrade.resultado_pontos}pts | </strong>
                            <strong>
                                <div style={props.historyTrade.resultado_valor >= 0 ? { color: "#00FF00" } : { color: "#FF0000" }}>
                                    R$ {props.historyTrade.resultado_valor.toFixed(2)}
                                </div>
                            </strong>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}



