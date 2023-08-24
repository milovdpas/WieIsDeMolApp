import React from "react";
import type { StyleProp, ViewStyle, ViewProps } from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import type { AnimateProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import RoundButton from "../buttons/RoundButton";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {Colors, Spacing} from "../../assets/Stylesheet";
import Text from "../Text";
import {GestureResponderEvent, TouchableOpacity} from "react-native";

interface Props extends AnimateProps<ViewProps> {
    style?: StyleProp<ViewStyle>;
    index?: number;
    icon: string;
    title: string;
    description: string;
    isLast?: boolean;
    onLast?: ((event: GestureResponderEvent) => void) | undefined;
}

export const WalkthroughCard: React.FC<Props> = (props) => {
    const { style, index, icon, title, description, isLast, onLast, ...animatedViewProps } = props;
    return (
        <LongPressGestureHandler
            onActivated={() => {
            }}
        >
            <Animated.View style={{ flex: 1, alignItems: 'center', padding: Spacing.medium, marginTop: Spacing.extraLarge }} {...animatedViewProps}>
                <RoundButton
                    colors={'primary'}
                    size={'small'}
                    disabled={true}>
                    <MIcon name={icon} size={40} color={Colors.textColor}/>
                </RoundButton>
                <Text
                    size={'xl'}
                    color={Colors.textColor}
                    alignment={'center'}
                    style={{marginTop: Spacing.small, marginBottom: Spacing.small}}>
                    {title}
                </Text>
                <Text
                    size={'m'}
                    color={Colors.green}
                    style={{marginBottom: Spacing.extraLarge}}>
                    {description}
                </Text>
                {isLast && (<TouchableOpacity onPress={onLast}>
                    <Text size={'l'} color={Colors.darkgreen} fontStyle={'bold'}>
                        GOT IT
                    </Text>
                </TouchableOpacity>)}
            </Animated.View>
        </LongPressGestureHandler>
    );
};
