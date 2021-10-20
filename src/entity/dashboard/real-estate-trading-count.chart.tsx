import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { H3 } from "../../shared/component/component";
import {
    VictoryAxis,
    VictoryChart,
    VictoryLabel, VictoryLegend,
    VictoryLine,
    VictoryTheme, VictoryTooltip, VictoryZoomContainer,
} from "victory-native";
import Svg from "react-native-svg";
import { CARD_COLOR } from "../../shared/utils/color.utils";
import ButtonGroup from "../../shared/component/button-group";
import { useDispatch } from "react-redux";
import { getByRealEstateTradingCount, setByTrendingNum } from "./dashboard.reducer";
import { ButtonGroupList } from "../../shared/utils/data.utils";

interface IRealEstateTradingCountChartProps {
    data: any | Array<any> | undefined
}

type RealEstateTradingCountState = {
    readonly xLabel: Array<String> | Array<any> | any
    readonly chartData: Array<any>
}


const RealEstateTradingCountChart = (props: IRealEstateTradingCountChartProps) => {

    const {data} = props

    const dispatch = useDispatch()

    const [state, setState] = useState<RealEstateTradingCountState>({
        xLabel: [],
        chartData: []
    })

    const [brushDomain, setBrushDomain] = useState<any>(null)

    const [zoomDomain, setZoomDomain] = useState<any>(null)

    const [trendingNum, setTrendingNum] = useState<number | any>(0)

    useEffect(() => {

        const currentChartData = data.data

        if (typeof currentChartData === "undefined") return;

        const chartData = currentChartData
            .map((value: any) => {
                return {
                    x: value['date'],
                    y: value['count']
                }
            })

        const newState: RealEstateTradingCountState = {
            xLabel: [],
            chartData
        }

        setState(newState)

    }, [data])

    const toPressButtonGroup = (num: number) => {
        setTrendingNum(num)
        // setZoom({x: [0, 4]})
        dispatch(setByTrendingNum(ButtonGroupList[num].value))
        dispatch(getByRealEstateTradingCount())
    }

    return (
        <View style={{marginTop: 10, padding: 5}}>
            <H3 text={'부동산 거래 건수 추이'}
                styles={{
                    paddingLeft: 8
                }}/>
            <ButtonGroup data={ButtonGroupList}
                         pos={'flex-end'}
                         selectValue={trendingNum}
                         toPress={toPressButtonGroup}/>
            <Svg>
                <VictoryChart
                    theme={VictoryTheme.material}
                    animate={{
                        duration: 10000
                    }}
                    containerComponent={
                        <VictoryZoomContainer responsive={true}
                                              zoomDimension="y"/>
                    }>
                    <VictoryLegend x={300} y={0}
                                   orientation="horizontal"
                                   gutter={30}
                                   data={[
                                       {name: "거래건수", symbol: {fill: CARD_COLOR[0]}}
                                   ]}
                    />
                    <VictoryLine
                        style={{
                            data: {stroke: CARD_COLOR[0], strokeWidth: 3},
                            parent: {border: "1px solid #ccc"}
                        }}
                        data={state.chartData}/>
                </VictoryChart>
            </Svg>
        </View>
    )
}

export default React.memo(RealEstateTradingCountChart)