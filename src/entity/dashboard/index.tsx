import React, { useEffect } from 'react'
import { IDashboardProps } from "./dashboard.interface";
import { DashBoardSafeAreaView } from "./dashboard.style";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CardGroup from "../../shared/component/card-group";
import DashboardTable from "../../shared/component/dashboard-table";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import styled from "styled-components/native";
import { IRootState } from "../../shared/reducer";

const FilterWrap = styled.View`
align-items: flex-end;
padding-right: 10px;
`;


const Dashboard = (props: IDashboardProps) => {

    const dispatch = useDispatch()

    const {navigation} = props

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "대시보드",
            headerShown: false
        })
    }, [])

    const {selectDate} = useSelector((state: IRootState) => {
        return {
            selectDate: state.filter.selectDate
        }
    })

    const goFilter = () => {
        navigation.navigate("Filter")
    }

    return (
        <DashBoardSafeAreaView>

            <FilterWrap>
                <TouchableOpacity onPress={goFilter}>
                    <FontAwesomeIcon size={18}
                                     icon={['fas', 'filter']}
                                     color={'#000'}/>
                </TouchableOpacity>
            </FilterWrap>

            <ScrollView
                style={{
                    flex: 1
                }}>
                <View style={{
                    padding: 10,
                    flexDirection : "row",
                    alignItems : "baseline",
                }}>
                    <Text style={
                        {
                            fontSize: 27,
                            fontWeight: "bold",
                        }
                    }>
                        서울시
                    </Text>
                    {
                        (selectDate.startDate !== "" && selectDate.endDate !== "") ?
                            <Text style={{
                                paddingLeft: 10,
                                color : '#989898'
                            }}> {selectDate.startDate} ~ {selectDate.endDate}</Text> : null
                    }
                </View>

                {/*<View style={*/}
                {/*    {*/}
                {/*        backgroundColor: "#f00",*/}
                {/*        flexDirection : "column"*/}
                {/*    }*/}
                {/*}>*/}
                {/*    <Text>*/}
                {/*        2020.02.01 ~ 2020.03.01*/}
                {/*    </Text>*/}
                {/*    <Text>*/}
                {/*        토지 거래*/}
                {/*    </Text>*/}
                {/*</View>*/}

                <CardGroup/>

                <DashboardTable/>

            </ScrollView>

        </DashBoardSafeAreaView>
    )
}


export default Dashboard
