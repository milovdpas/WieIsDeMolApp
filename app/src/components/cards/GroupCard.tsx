import {Dimensions, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Border, Colors, Spacing} from '../../assets/Stylesheet';
import React from 'react';
import Text from '../Text';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Group from "../../models/Group";
import {NavigationProp} from "@react-navigation/native";
import {useUser} from "../../utils/contexts/UserContext";

type GroupCardProps = {
    navigation: NavigationProp<any>;
    group: Group;
};

const GroupCard = ({navigation, group}: GroupCardProps) => {
    const {user} = useUser();
    const goToGroup = async () => {
        navigation.navigate({
            name: user && group.owner.id === user.id ? 'GroupAdmin' : 'Leaderboard',
            params: {
                group: group
            }
        })
    };

    return (
        <TouchableOpacity
            onPress={goToGroup}
            style={[
                styles.groupCard,
                {
                    backgroundColor: Colors.secondary,
                },
            ]}>
            <Image
                source={{uri: group.imageUrl ?? 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png'}}
                style={styles.image}
                resizeMode={'cover'}
            />
            <View style={styles.center}>
                <Text size="m" fontStyle="bold">
                    {group.name}
                </Text>
                <Text size="s" fontStyle="bold">
                    {group.owner.name}
                </Text>
            </View>
            <View style={styles.right}>
                <Text size="m" fontStyle="bold">
                    {group.numberOfPeople}
                </Text>
                <MIcon name={'account-multiple'} size={40} color={Colors.white}/>
            </View>
        </TouchableOpacity>
    );
};

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    groupCard: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: Border.rounded,
        marginBottom: Spacing.medium,
        justifyContent: 'space-between',
        maxWidth: '100%',
        width: '100%',
    },
    image: {
        width: 100,
        height: 100,
        borderTopLeftRadius: Border.rounded,
        borderBottomLeftRadius: Border.rounded,
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
        paddingRight: Spacing.small,
    },
});

export default GroupCard;
