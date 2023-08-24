import {ActivityIndicator, Alert, StyleSheet, TextInput, View} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react'
import {Border, Colors, Spacing} from '../assets/Stylesheet';
import Footer from '../components/Footer';
import Text from "../components/Text";
import Button from "../components/buttons/Button";
import {useUser} from "../utils/contexts/UserContext";
import EncryptedStorage from "react-native-encrypted-storage";
import Axios from "../utils/modules/Axios";
import FormData from 'form-data';
import User from '../models/User';
import useInitialURL from "../utils/hooks/UseInitialUrl";
import Group from "../models/Group";
import {useNetInfo} from "@react-native-community/netinfo";

const RegistrationScreen = ({navigation, route}: any) => {
    const groupId: string | undefined = route.params?.groupId;
    if(!groupId)
        useInitialURL(navigation);
    const {user, setUser} = useUser();
    const netInfo = useNetInfo();
    const [name, onChangeName] = useState<string>('');
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

    useEffect(() => {
        if(!user)
            return;
        navigation.navigate({
            name: 'Home'
        });
    }, [user]);

    const submit = async () => {
        if(!name){
            Alert.alert('Gebruikersnaam is verplicht');
            return;
        }
        if(!netInfo.isConnected){
            Alert.alert('Geen internet connectie');
            return;
        }
        setDisableSubmit(true);
        try{
            const data = new FormData();
            data.append('name', name);
            const response = await Axios.post('/users', data);
            if(response.status !== 200)
                return;
            const user = response.data.data as User;
            await EncryptedStorage.setItem('@user', JSON.stringify(user));
            setUser(user);
            if(groupId){
                const response = await Axios.post(`/users/${user.id}/groups/${groupId}/join`);
                if (response.status !== 200)
                    return;
                const group = response.data.data as Group;
                navigation.navigate({
                    name: 'Home',
                    params: {
                        group: group
                    }
                });
                return;
            }
            navigation.navigate({
                name: 'Home'
            });
        }catch (e) {
            setDisableSubmit(false);
            console.log(JSON.stringify(e));
        }
    }

    return (
        <View style={{height: '100%'}}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: Spacing.extraLarge,
                }}>
                <Text size="xl" fontStyle="bold" style={{marginBottom: Spacing.medium}}>
                    Laten we een gebruiker aanmaken
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Voer gebruikersnaam in'}
                    placeholderTextColor={Colors.textColor}
                    onChangeText={onChangeName}
                    value={name}
                />
                <Button style={{width: '100%', marginTop: Spacing.medium}} onPress={submit} disabled={disableSubmit}>
                   <View style={{width: 200, flexDirection: 'row', justifyContent: 'center'}}>
                       <Text>Registreren</Text>
                       { disableSubmit && (<ActivityIndicator style={{marginLeft: Spacing.small}} color={Colors.textColor} />)}
                   </View>
                </Button>
            </View>
            <Footer start={false}/>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '75%',
        height: 40,
        color: Colors.white,
        margin: Spacing.small,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: Border.rounded,
        padding: Spacing.small,
    },
});

export default RegistrationScreen;
