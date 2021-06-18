import React, {memo, useEffect} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import {BackButton} from "../../shared/component/component";
import styled from "styled-components/native";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'

interface ISearchProps {
    navigation: NavigationProp<any>
}


const SearchContentWrap = styled.View`
                flex: 1;
`;
// background-color: #f0f;

const SearchContentBox = styled.ScrollView`
                    flex: 1;
                    background-color: rgba(0,0,0,.045);
                    margin: 30px;
                    margin-bottom : 10px;
                    margin-left: 35px;
                    margin-right: 35px;
`;

const Search = (props: ISearchProps) => {

    const {navigation} = props

    const onPress = () => {
        navigation.navigate("Tap")
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#fff",
            flexDirection: "column"
        }}>

            <View style={{
                flex: .3,
                backgroundColor: "#00f"
            }}>
                <View style={
                    {
                        flex: .7,
                        backgroundColor: "#f00",
                        justifyContent: "center"
                    }
                }>
                    <BackButton navigation={navigation}/>
                </View>
                <View style={
                    {
                        flex: 1,
                        backgroundColor: "#ff0"
                    }
                }>

                </View>

            </View>

            <SearchContentWrap>

                <SearchContentBox stickyHeaderIndices={[0]}>

                    <View>
                        <Text>
                            인기 검색어
                        </Text>
                    </View>

                </SearchContentBox>

                <View style={
                    {
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "f00",
                        marginBottom: 30
                    }
                }>
                    <FontAwesomeIcon style={
                        {
                            marginRight : 5
                        }
                    } size={10} icon={['fas', 'circle']}/>
                    <FontAwesomeIcon
                        style={
                            {
                                marginRight : 5
                            }
                        }
                        size={10} icon={['fas', 'circle']}/>
                </View>

            </SearchContentWrap>


        </SafeAreaView>
    )
}

export default memo(Search)
