import "./ShowGenomaGraphPorcentDays.css";
import Chart from "react-apexcharts";
import { useState } from 'react';
import { ApexOptions } from "apexcharts";
import { api } from "../services/Api";
import { useEffect } from 'react';


interface IDataGraph {
    arrayDays: Date[];
    arrayPorcents: number[];
}

interface ISeries {
    data: number[];
}

interface IProps {
    id_genoma: number;
}

export function ShowGenomaGraphPorcentDays(props: IProps) {


    const [series, setSeries] = useState<ISeries[]>([])

    const [data, setData] = useState<ApexOptions>({})

    const getDataGraph = async () => {
        const response = await api.get(`getGraphShowGenoma/${props.id_genoma}`);

        const _data: IDataGraph = response.data

        _data.arrayPorcents ? setSeries([{data: _data.arrayPorcents}]) : setSeries(series)
        console.log(series);

        _data.arrayDays ?
        setData(
            {
                plotOptions: {
                    bar: {
                        // borderRadius: 10,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {
                    enabled: false,
                    formatter: function (val) {
                        return val + "%";
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#fff"]
                    }
                },
        
                xaxis: {
                    categories: _data.arrayDays,
                    labels: {
                        formatter: (value: any) => {
                            var _data = new Date(value)
                            return `${_data.getUTCDate().toLocaleString()}/${_data.getUTCMonth().toLocaleString()}/${_data.getUTCFullYear()}`
                        },
                        show: false
        
                    },
                    position: 'top',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#000',
                                colorTo: '#000',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                    }
                },
                yaxis: {
                    
                    max:100,
                    min:0,
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        style:{
                            colors: "#fff"
                        },
                        show: true,
                        formatter: function (val) {
                            return val + "%";
                        }
                    }
        
                },
            }
        ):setData(data)
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
                type='bar'
                width={740}
                height={250}
            />
        </div>
    )
}



