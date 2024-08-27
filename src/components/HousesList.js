import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setHouses } from '../slices/HouseSlice';

const housesData = require('../api/houseApi.json');

const HousesList = ({  onSelectHome  }) => {
    const dispatch = useDispatch();
    const homes = useSelector(state => state.houses.houses);

    useEffect(() => {
        dispatch(setHouses(housesData));
    }, [dispatch]);

    const renderHouseItem = ({ item }) => (
        <TouchableOpacity onPress={() => onSelectHome(item)}>
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                <Image source={{ uri: item.image }} style={{ height: 100, width: '100%' }} />
                <Text>{item.address}</Text>
                <Text>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ marginTop: 20 }}>
            <FlatList
                data={homes}
                renderItem={renderHouseItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>

    );
};

export default HousesList;
