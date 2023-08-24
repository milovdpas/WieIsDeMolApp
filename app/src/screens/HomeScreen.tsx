import {ActivityIndicator, FlatList, Platform, StyleSheet, TextInput, View, Dimensions, Alert} from 'react-native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import React from 'react'
import {Border, Colors, Gradients, Spacing} from '../assets/Stylesheet';
import Footer from '../components/Footer';
import Group from "../models/Group";
import Text from "../components/Text";
import GroupCard from "../components/cards/GroupCard";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import RoundButton from "../components/buttons/RoundButton";
import {BottomSheetModalProvider, BottomSheetModal} from '@gorhom/bottom-sheet';
import CloseButton from "../components/buttons/CloseButton";
import {FileSelectedData} from "../models/FileSelectedData";
import ImageSelector from "../components/inputs/ImageSelector";
import {useUser} from "../utils/contexts/UserContext";
import Axios from "../utils/modules/Axios";
import Button from "../components/buttons/Button";
import FormData from "form-data";
import {useHeaderHeight} from '@react-navigation/elements';
import useInitialURL from "../utils/hooks/UseInitialUrl";
import {useNetInfo} from "@react-native-community/netinfo";

const HomeScreen = ({navigation, route}: any) => {
    useInitialURL(navigation, route.params?.group);
    const {user} = useUser();
    const netInfo = useNetInfo();
    const headerHeight = useHeaderHeight();
    const windowHeight = Dimensions.get("window").height;
    const [groups, setGroups] = useState<Array<Group>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const snapPoints = useMemo(() => [Platform.OS === 'ios' ? '90%' : '95%'], []);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    let textInputRef = useRef<TextInput>(null);
    const [groupName, setGroupName] = useState<string>('');
    const [inputImage, setInputImage] = useState<FileSelectedData | null>(null);
    const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

    const checkIfIdExists = useCallback((list: Group[], id: string): boolean => {
        return list.some(group => group.id === id);
    }, []);

    useEffect(() => {
        const addedGroup = route.params?.group;
        if (!addedGroup || checkIfIdExists(groups, addedGroup.id))
            return;
        const newGroups = [...groups, addedGroup];
        setGroups(newGroups)
    }, [route, checkIfIdExists]);

    useEffect(() => {
        if (!user)
            return;
        if(!netInfo || netInfo.isConnected === null)
            return;
        if (!netInfo.isConnected) {
            Alert.alert('Geen internet connectie');
            return;
        }
        try {
            Axios.get(`/users/${user.id}/groups`).then(response => {
                if (response.status !== 200)
                    return;
                let newGroups = response.data.data as Group[];
                setGroups(newGroups);
                setIsLoading(false);
            });
        } catch (e) {
            setIsLoading(false);
            console.log(JSON.stringify(e));
        }
    }, [user, netInfo, setIsLoading]);

    const openSheet = () => {
        if (!bottomSheetRef || !bottomSheetRef.current) {
            return;
        }
        bottomSheetRef.current.present();
    };

    const closeSheet = () => {
        bottomSheetRef.current?.dismiss();
    };

    const createGroup = async () => {
        if (!user || disableSubmit)
            return;
        if (!groupName) {
            Alert.alert('Group name is required');
            return;
        }
        setDisableSubmit(true);
        const data = new FormData();
        data.append('name', groupName);
        if (inputImage != null)
            data.append('image', inputImage);
        const response = await Axios.post(`/users/${user.id}/groups`, data);
        if (response.status !== 200)
            return;
        textInputRef.current?.clear();
        setInputImage(null);
        setGroups([...groups, response.data.data as Group]);
        closeSheet();
        setDisableSubmit(false);
    };

    return (
        <BottomSheetModalProvider>
            <View style={{width: '100%', height: windowHeight - headerHeight}}>
                <View
                    style={{
                        maxHeight: '77.5%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingTop: Spacing.small,
                    }}>
                    <Text size="xl" fontStyle="bold" style={{marginBottom: Spacing.medium}}>
                        Groepen
                    </Text>
                    {isLoading ? (
                        <ActivityIndicator color={Colors.textColor}/>
                    ) : groups.length === 0 ? (
                        <Text size={'l'} color={Colors.textColor} fontStyle={'bold'}>
                            Geen groepen beschikbaar
                        </Text>
                    ) : (
                        <FlatList
                            style={{paddingHorizontal: Spacing.small}}
                            data={groups}
                            renderItem={({item}) => <GroupCard group={item} navigation={navigation}/>}
                            keyExtractor={item => item.id}
                        />
                    )}
                </View>
                <View style={styles.absoluteCenter}>
                    <RoundButton
                        colors={'primary'}
                        size={'small'}
                        onPress={openSheet}>
                        <MIcon name={'plus'} size={40} color={Colors.textColor}/>
                    </RoundButton>
                </View>
                <View style={{flex: 1,}}/>
                <Footer start={false}/>
            </View>
            <BottomSheetModal
                snapPoints={snapPoints}
                handleStyle={{marginBottom: -Spacing.small}}
                backgroundStyle={{backgroundColor: Colors.white}}
                onDismiss={closeSheet}
                ref={bottomSheetRef}>
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        marginRight: Spacing.medium,
                    }}>
                    <CloseButton
                        onPress={closeSheet}
                        iconColor={Colors.purple}
                        accessibilityHint="Close reservation sheet"
                    />
                </View>
                <View style={{flex: 1, padding: Spacing.medium}}>
                    <Text size={'l'} color={Colors.black} fontStyle={'bold'}>Groep aanmaken</Text>
                    <Text size={'s'} color={Colors.black} fontStyle={'bold'}>Groepsnaam*</Text>
                    <TextInput
                        ref={textInputRef}
                        style={styles.input}
                        placeholder={'Voer groepsnaam in'}
                        placeholderTextColor={Colors.black}
                        onChangeText={setGroupName}
                    />
                    <Text size={'s'} color={Colors.black} fontStyle={'bold'}>Upload een groepsfoto</Text>
                    <ImageSelector
                        onImageSelected={(image: FileSelectedData | null) => {
                            setInputImage(image);
                        }}
                    />
                    <Button style={{
                        width: '100%',
                        marginTop: Spacing.medium,
                        borderRadius: Border.rounded,
                        flexDirection: 'row'
                    }}
                            disabled={disableSubmit} onPress={createGroup} colors={Gradients.primary}>
                        <Text>Groep aanmaken</Text>
                        {disableSubmit && (
                            <ActivityIndicator style={{marginLeft: Spacing.small}} color={Colors.white}/>)}
                    </Button>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    absoluteCenter: {
        width: '100%',
        position: 'absolute',
        bottom: Spacing.extraLarge,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 40,
        color: Colors.purple,
        marginTop: Spacing.small,
        borderWidth: 1,
        borderColor: Colors.purple,
        borderRadius: Border.rounded,
        padding: Spacing.small,
    },
});

export default HomeScreen;
