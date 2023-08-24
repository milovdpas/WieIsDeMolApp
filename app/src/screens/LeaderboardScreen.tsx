import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react'
import {Colors, Spacing} from '../assets/Stylesheet';
import Footer from '../components/Footer';
import Group from "../models/Group";
import Text from "../components/Text";
import UserScore from '../models/UserScore';
import {useHeaderHeight} from "@react-navigation/elements";
import useInitialURL from "../utils/hooks/UseInitialUrl";
import UserScoreCard from "../components/cards/UserScoreCard";
import Axios from "../utils/modules/Axios";

const LeaderboardScreen = ({navigation, route}: any) => {
    useInitialURL(navigation);
    const group: Group = route.params.group;
    const headerHeight = useHeaderHeight();
    const windowHeight = Dimensions.get("window").height;

    const [userScores, setUserScores] = useState<Array<UserScore>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!group)
            return;
        Axios.get(`/users/${group.owner.id}/groups/${group.id}/scores`).then(response => {
            if(response.status !== 200)
                return;
            setUserScores(response.data.data as UserScore[]);
            setIsLoading(false);
        });
        setIsLoading(false);
    }, []);

    return (
        <View style={{width: '100%', height: windowHeight - headerHeight, paddingHorizontal: Spacing.medium}}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: Spacing.small,
                }}>
                <Text size="xl" fontStyle="bold" alignment={'center'} style={{marginBottom: Spacing.medium}}>
                    Leaderboard {group.name}
                </Text>
                {isLoading ? (
                    <ActivityIndicator color={Colors.textColor}/>
                ) : userScores.length === 0 ? (
                    <Text size={'l'} color={Colors.textColor} fontStyle={'bold'}>
                        Geen spelers beschikbaar
                    </Text>
                ) : (
                    <FlatList
                        style={{paddingHorizontal: Spacing.small}}
                        data={userScores}
                        renderItem={({item, index}) => <UserScoreCard groupId={group.id} userScore={item} nr={index+1}/>}
                        keyExtractor={item => item.user.id}
                    />
                )}
            </View>
            <Footer start={false}/>
        </View>
    );
};

export default LeaderboardScreen;
