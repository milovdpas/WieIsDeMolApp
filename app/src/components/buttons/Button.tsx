import React, {ReactNode} from 'react';
import {
    GestureResponderEvent,
    StyleSheet,
    TextStyle,
    TouchableOpacity, View,
} from 'react-native';
import {Border, Spacing, Colors} from '../../assets/Stylesheet';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
    accessibilityHint?: string;
    children?: ReactNode;
    style?: TextStyle;
    textColor?: string;
    colors?: Array<string> | 'primary' | 'secondary';
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    disabled?: boolean | undefined;
    fabric?: boolean | undefined;
};

const Button = (
    {
        accessibilityHint,
        children,
        style = {},
        textColor = Colors.white,
        colors = 'primary',
        onPress,
        disabled = false,
        fabric = false
    }: ButtonProps) => {
    return <TouchableOpacity
        accessibilityRole={'button'}
        accessibilityHint={accessibilityHint}
        onPress={onPress}
        disabled={disabled}>
        {fabric ? (
            <LinearGradient
                colors={Array.isArray(colors) ? colors : buttonColors[colors]}
                style={[style, styles.button, {color: textColor}]}>
                {children}
            </LinearGradient>
        ) : (
            <View
                style={[style, styles.button, {backgroundColor: (Array.isArray(colors) ? colors[0] : buttonColors[colors][0])}, {color: textColor}]}>
                {children}
            </View>
        )}
    </TouchableOpacity>
        ;
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
        paddingVertical: Spacing.small,
        paddingHorizontal: Spacing.medium
    },
});

const buttonColors = {
    'primary': [Colors.orange, Colors.red],
    'secondary': [Colors.red, Colors.pink],
};

export default Button;
