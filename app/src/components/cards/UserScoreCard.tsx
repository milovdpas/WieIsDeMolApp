import {Dimensions, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Border, Colors, Spacing} from '../../assets/Stylesheet';
import React, {useState} from 'react';
import Text from '../Text';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useUser} from "../../utils/contexts/UserContext";
import UserScore from "../../models/UserScore";
import Axios from "../../utils/modules/Axios";

type GroupCardProps = {
    groupId: string;
    userScore: UserScore;
    nr: number;
    edit?: boolean;
};

const UserScoreCard = ({groupId, userScore, nr, edit = false}: GroupCardProps) => {
    const {user} = useUser();
    const [score, setScore] = useState<number>(userScore.score)

    const min = async () => {
        if (score <= 0 || !user)
            return;
        const newScore = score - 1;
        setScore(newScore);
        await Axios.patch(`/users/${user.id}/groups/${groupId}/addScore?userId=${userScore.user.id}&value=-1`);
    };

    const plus = async () => {
        if(!user)
            return;
        const newScore = score+1;
        setScore(newScore);
        await Axios.patch(`/users/${user.id}/groups/${groupId}/addScore?userId=${userScore.user.id}&value=1`);
    };

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: Colors.secondary,
                },
            ]}>
            {
                nr === 1 ? (
                    <Image
                        source={require('../../assets/images/icons/trophy.png')}
                        style={styles.image}
                        resizeMode={'cover'}
                    />
                ) : (<View style={styles.nr}>
                    <Text size={'l'} fontStyle={'bold'}>{nr}</Text>
                </View>)
            }
            <View style={styles.center}>
                <Text size="l" fontStyle={user && user.id === userScore.user.id ? "bold" : "regular"}>
                    {userScore.user.name}
                </Text>
            </View>
            <View style={styles.right}>
                <Text size="m" fontStyle="bold">
                    {score}
                </Text>
                {
                    edit && (
                        <View style={{
                            flexDirection: 'column',
                            paddingVertical: Spacing.small,
                        }}>
                            <TouchableOpacity onPress={plus}><MIcon name={'plus'} size={40} color={Colors.white}/></TouchableOpacity>
                            <TouchableOpacity onPress={min}><MIcon name={'minus'} size={40} color={Colors.white}/></TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </View>
    );
};

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: Border.rounded,
        marginBottom: Spacing.medium,
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '100%',
        width: '100%',
        height: 75,
    },
    image: {
        width: 45,
        height: 45,
        marginLeft: Spacing.small
    },
    nr: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: "center",
        paddingLeft: Spacing.medium
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: Spacing.small,
        width: dimensions.width - 192.72727272727275,
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.small,
        paddingRight: Spacing.medium,
        gap: Spacing.small
    },
});

export default UserScoreCard;
