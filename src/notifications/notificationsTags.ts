import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
    OneSignal.sendTags({
        'user_name': 'Eduardo',
        'user_email': 'edutdutra@gmail.com'
    });
}