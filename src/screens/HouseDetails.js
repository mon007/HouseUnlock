import * as Location from 'expo-location';
import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Icon from "react-native-feather";
import { View, Text, Image, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const HouseDetails = ({ navigation }) => {
    const selectedHome = useSelector(state => state.houses.selectedHouse);
    const [enabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            if (selectedHome) {
                let location = await Location.getCurrentPositionAsync({});
                const distance = getDistanceFromLatLonInMeters(
                    location.coords.latitude,
                    location.coords.longitude,
                    selectedHome.latitude,
                    selectedHome.longitude
                );
                if (distance <= 30) {
                    setIsEnabled(true);
                }
            }
        })();
    }, [selectedHome]);

    const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
        const radiusOfEarth = 6371e3;
        const calLat1 = lat1 * (Math.PI / 180);
        const calLat2 = lat2 * (Math.PI / 180);
        const diffLat = (lat2 - lat1) * (Math.PI / 180);
        const diffLong = (lon2 - lon1) * (Math.PI / 180);

        const calFormula =
            Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
            Math.cos(calLat1) * Math.cos(calLat2) * Math.sin(diffLong / 2) * Math.sin(diffLong / 2);
        const calPoints = 2 * Math.atan2(Math.sqrt(calFormula), Math.sqrt(1 - calFormula));

        const distanceInMeters = radiusOfEarth * calPoints;
        return distanceInMeters;
    };

    if (!selectedHome) {
        return (
            <View>
                <Text>No house selected.</Text>
            </View>
        );
    }

    const handleUnlock = async () => {
        setLoading(true);

        try {
            const response = await simulateUnlockAPI();
            setLoading(false);

            if (response.success) {
                Alert.alert('Success', 'House has been unlocked successfully!');
            } else {
                Alert.alert('Error', 'Failed to unlock the house.');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };

    const simulateUnlockAPI = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() < 0.7;
                if (success) {
                    resolve({ success: true });
                } else {
                    resolve({ success: false });
                }
            }, 2000);
        });
    };


    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 40 }}>
                <Icon.ArrowLeft strokeWidth={3} stroke={'#000000'} />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', flex: 0.8 }}>
                <Image source={{ uri: selectedHome.image }} style={{ height: 200, width: '100%' }} />
                <View style={{marginTop:10}}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{selectedHome.address}</Text>
                    <Text>{selectedHome.description}</Text>
                </View>
                {enabled && (
                    loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <Button title="Unlock" onPress={handleUnlock} />
                    )
                )}
            </View>

        </View>
    );
};

export default HouseDetails;
