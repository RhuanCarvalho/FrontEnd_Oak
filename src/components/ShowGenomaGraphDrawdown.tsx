import "./ShowGenomaGraphDrawdown.css";
import Chart from "react-apexcharts";
import { useState } from 'react';
import { ApexOptions } from "apexcharts";
import { api } from "../services/Api";
import { useEffect } from 'react';


interface IDataGraph {
    arraySeq: number[];
    arrayX: number[];
}

interface ISeries {
    data: number[];
}

interface IProps {
    id_genoma: number;
}

export function ShowGenomaGraphDrawdown(props: IProps) {


    const [series, setSeries] = useState<ISeries[]>([])

    const [data, setData] = useState<ApexOptions>({})

    const getDataGraph = async () => {
        const response = await api.get(`getGraphShowDrawdown/${props.id_genoma}`);

        const _data: IDataGraph = response.data

        _data.arraySeq ? setSeries([{ data: _data.arraySeq }]) : setSeries(series)
        console.log(series);

        _data.arrayX ?
            setData(
                {
                    chart: {
                      zoom: {
                        enabled: true,
                        type: 'xy',
                            autoScaleYaxis: true,
                      },
                      toolbar:{
                        show:true,
                      }
            
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    title: {
                      text: 'Drawdown',
                      align: 'left',
                      style:{
                        color: '#fff'
                      }
                    },
                    xaxis: {
                        labels: {
                            show: false,
                        },
                        categories: _data.arrayX,
                        axisTicks: {
                            show:false
                        }
                    },
                    yaxis:{
                        labels:{
                            style:{
                                colors:['#fff']
                            }
                        }
                    }
            
                }
            ) : setData(data)
        console.log(data);
    }

    useEffect(() => {
        getDataGraph();
    }, [])

    return (
        <div className="cart-show-genoma-graph">
            <Chart
                options={data}
                series={series}
                type='line'
                width={740}
                height={250}
            />
        </div>
    )
}



