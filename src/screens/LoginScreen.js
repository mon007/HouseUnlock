import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../slices/LoginSlice';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (username === 'user' && password === '123') {
            dispatch(login({ username }));
            navigation.navigate('Home');
        } else {
            Alert.alert('Login Failed', 'Please enter valid credentials');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
            <View style={{ flex: 0.2, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700' }}>Home List App</Text>
            </View>
            <View style={{ flex: 0.6 }}>
                <Text>Username:</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
                />
                <Text>Password:</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
                />
                <TouchableOpacity title="Login" onPress={handleLogin} style={{ backgroundColor: 'blue', padding: 20, borderRadius: 10, alignItems: 'center' }}>
                    <Text style={{ color: '#ffffff' }}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default LoginScreen;
