import React from 'react';
import { Text, View, TouchableOpacity, Alert, Vibration } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Api from './services/Api';

export default class CameraScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        imagebase64: null,
    };

    isProcessing = false;

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    componentDidUpdate() {
        if (this.props.logout) {
            this.isProcessing = false;
        }
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={Camera.Constants.Type.front}
                        ref={ref => { this.camera = ref; }}
                        ratio={'1:1'}
                        // Captures the detected face and identifies it, logging them in if successful
                        onFacesDetected={image => {
                            if (image.faces.length > 0 && !this.isProcessing) {
                                this.isProcessing = true;

                                this.camera.takePictureAsync({ base64: true, onPictureSaved: this.onPictureSaved }).then(async data => {
                                    Vibration.vibrate([500, 500, 200, 500]);

                                    this.api = new Api();
                                    let imgurUrl = await this.api.uploadImage(data.base64);
                                    console.log(imgurUrl);
                                    let faceId = await this.api.detectFace(imgurUrl);
                                    let personId = await this.api.identifyFace(faceId);
                                    let name = await this.api.getPersonName(personId);

                                    if (name !== undefined) {
                                        this.props.onIdentify('Hi ' + name);
                                    } else {
                                        this.isProcessing = false;
                                    }
                                })
                            }
                        }}>
                    </Camera>
                </View>
            );
        }
    }
}