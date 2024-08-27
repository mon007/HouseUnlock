import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HousesList from '../components/HousesList';
import {  selectHouse } from '../slices/HouseSlice';

const HomeScreen = ({navigation}) => {
    const user = useSelector(state => state.login.user);
    const dispatch = useDispatch();

    const handleSelectHome = (home) => {
        dispatch(selectHouse(home));
        navigation.navigate('HouseDetails');
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View style={{ marginTop: 40, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Welcome, {user.username}</Text>
            </View>
            <HousesList onSelectHome={handleSelectHome} />
        </SafeAreaView>
    );
};

export default HomeScreen;
