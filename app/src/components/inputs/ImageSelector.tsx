import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Platform, Image
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {FileSelectedData} from '../../models/FileSelectedData';
import {Colors} from "../../assets/Stylesheet";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

const fixMediaUri = (uri: string): string => {
    if (Platform.OS === 'android') {
        return uri.replace('localhost', '10.0.2.2');
    }
    return uri;
};

type ImageSelectorProps = {
    onImageSelected: (selectedImageData: FileSelectedData | null) => void;
};

const ImageSelector = ({onImageSelected}: ImageSelectorProps) => {
    const [image, SetImage] = React.useState<string | undefined>(undefined);

    const checkResponse = (response: ImagePickerResponse) => {
        //Check for future logging system for response errors
        if (response.didCancel) {
            console.log('No photo selected');
        } else if (response.errorCode === 'permission') {
            console.log('Permission denied');
        } else if (response.errorCode === 'others') {
            console.log(response.errorMessage);
        } else {
            if (response.assets && response.assets[0]) {
                const source = response.assets[0];
                const formDataImage = {
                    uri: source.uri,
                    type: source.type,
                    name: source.fileName,
                } as FileSelectedData;
                onImageSelected(formDataImage);
                SetImage(source.uri);
            }
        }
    };
    const UseCamera = () => {
        launchCamera({mediaType: 'photo', quality: 1, includeBase64: false}, (response) => {
            checkResponse(response);
        });
    };
    const PickImageFromGallery = () => {
        launchImageLibrary({mediaType: 'photo', quality: 1, includeBase64: false}, (response) => {
            checkResponse(response);
        });
    };

    const RemoveImage = () => {
        SetImage('');
        onImageSelected(null);
    };

    const RequestCameraPermission = async () => {
        //check ios camera
        checkPermission(PERMISSIONS.IOS.CAMERA);

        //check android camera
        checkPermission(PERMISSIONS.ANDROID.CAMERA);
        UseCamera();
    };

    const checkPermission = (permissions: any) => {
        check(permissions)
            .then(async (result) => {
                await request(permissions);
                if (result !== RESULTS.GRANTED) {
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <View style={styles.container}>
                {image ? (
                    <>
                        <View
                            style={styles.imageContainer}
                            accessible={true}
                            accessibilityLabel={'Gemaakte afbeelding'}
                        >
                            <Image
                                source={{uri: fixMediaUri(image)}}
                                style={styles.imgStyle}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={styles.imageButtons}>
                            {/*<View*/}
                            {/*    pointerEvents="none"*/}
                            {/*    accessible={true}*/}
                            {/*    accessibilityLabel="Afbeelding vergroten knop"*/}
                            {/*>*/}
                            {/*    <MIcon name={'arrow-expand'} size={48} color={Colors.black}/>*/}
                            {/*</View>*/}
                            <TouchableOpacity
                                onPress={() => RemoveImage()}
                                accessible={true}
                                accessibilityLabel="Verwijder afbeelding knop"
                            >
                                <MIcon name={'trash-can'} size={48} color={Colors.black}/>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : null}
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => RequestCameraPermission()}
                        accessibilityLabel={'Open camera knop'}
                    >
                        <MIcon name={'camera'} style={styles.rowContainerChild} size={48} color={Colors.black}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => PickImageFromGallery()}
                        accessibilityLabel={'Open galerij knop'}
                    >
                        <MIcon name="image" style={styles.rowContainerChild} size={48} color={Colors.black}/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    imageContainer: {
        borderWidth: 2,
        borderColor: Colors.black,
        borderRadius: 10,
    },
    imgStyle: {
        width: '100%',
        aspectRatio: 2,
    },
    imageButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',

        position: 'absolute',
        width: '100%',
        padding: 20,
    },
    rowContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: '100%',
        padding: 5,
    },
    rowContainerChild: {
        padding: 5,
    },
});

export default ImageSelector;
