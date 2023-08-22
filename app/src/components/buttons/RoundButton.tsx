import React, {ReactNode} from 'react';
import {
    GestureResponderEvent,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
} from 'react-native';
import {Border, Spacing, Colors} from '../../assets/Stylesheet';
import {Shadow} from 'react-native-shadow-2';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
    accessibilityHint?: string;
    children?: ReactNode;
    style?: TextStyle;
    colors?: Array<string> | 'primary' | 'secondary';
    size?: 'small' | 'big';
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    disabled?: boolean | undefined;
    fabric?: boolean | undefined;
    shadow?: boolean | undefined;
};

const RoundButton = (
    {
        accessibilityHint,
        children,
        style = {},
        colors = 'primary',
        size = 'big',
        onPress,
        disabled = false,
        fabric = false,
        shadow = true,
    }: ButtonProps) => {
    const GetButton = () => {
        return (fabric ? (<TouchableOpacity
                accessibilityRole={'button'}
                accessibilityHint={accessibilityHint}
                style={styles.rounded}
                onPress={onPress}
                disabled={disabled}>
                <LinearGradient
                    colors={Array.isArray(colors) ? colors : buttonColors[colors]}
                    style={[style, styles.button, buttonSizes[size]]}>
                    {children}
                </LinearGradient>
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
                accessibilityRole={'button'}
                accessibilityHint={accessibilityHint}
                style={[style, styles.rounded, styles.button, buttonSizes[size], {backgroundColor: Array.isArray(colors) ? colors[0] : buttonColors[colors][0]}]}
                onPress={onPress}
                disabled={disabled}>
                {children}
            </TouchableOpacity>
        ));
    }
    return (shadow ?
            <Shadow
                distance={shadowSizes[size]}
                startColor={'rgba(224, 167, 252, 0.2)'}>
                {GetButton()}
            </Shadow>
            : GetButton()
    );
};

const styles = StyleSheet.create({
    rounded: {
        borderRadius: Border.round,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Border.round,
    },
});

const buttonColors = {
    'primary': [Colors.orange, Colors.red],
    'secondary': [Colors.red, Colors.pink],
};

const shadowSizes = {
    small: 15,
    big: 30,
};

const buttonSizes = StyleSheet.create({
    small: {paddingHorizontal: Spacing.small, paddingVertical: Spacing.small},
    big: {
        paddingHorizontal: Spacing.large,
        paddingVertical: Spacing.large,
    },
});

export default RoundButton;
