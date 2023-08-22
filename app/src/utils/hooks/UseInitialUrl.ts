import {useCallback, useEffect} from 'react';
import {Alert, Linking} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useUser} from "../contexts/UserContext";
import Axios from "../modules/Axios";
import Group from "../../models/Group";

const useInitialURL = (navigation: NavigationProp<any>, disabled: boolean = false) => {
    const {user} = useUser();

    const extractGroupIdFromURL = (newUrl: string): string => {
        const GroupIdSearchQuery = 'group_id=';

        let groupId = newUrl.substring(
            newUrl.indexOf(GroupIdSearchQuery) + GroupIdSearchQuery.length
        );
        for (
            let charPosition = groupId.length - 1;
            charPosition >= 0;
            charPosition--
        ) {
            if (groupId[charPosition] === '#') {
                groupId = groupId.slice(0, charPosition) + groupId.slice(charPosition + 1);
            } else {
                break;
            }
        }
        return groupId;
    };

    const readUrl = useCallback(
        async (url: string | null): Promise<void> => {
            if(disabled)
                return;
            if (!url) {
                return;
            }
            url = decodeURIComponent(url);
            //Check if initialUrl is correct url consisting of access_token and uuid
            if (url.match('verbouwen://group_id=.*')) {
                const groupId = extractGroupIdFromURL(url);
                if (user) {
                    try {
                        const response = await Axios.post(`/users/${user.id}/groups/${groupId}/join`);
                        if (response.status !== 200)
                            return;
                        const group = response.data.data as Group
                        navigation.navigate({
                            name: 'Home',
                            params: {
                                group: group
                            }
                        });
                    } catch (e) {
                        Alert.alert('Already joined this group');
                    }
                } else {
                    navigation.navigate({
                        name: 'Registration',
                        params: {
                            groupId: groupId
                        }
                    });
                }
            }
        },
        [user],
    );

    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();
            await readUrl(initialUrl);
        };
        getUrlAsync().then(() => {
        });
    }, [readUrl]);

    useEffect(() => {
        Linking.addEventListener('url', initialUrl => {
            readUrl(initialUrl.url).then();
        });
    }, []);

    return {};
};

export default useInitialURL;
