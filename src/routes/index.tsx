import {useEffect, useState} from "react";
import { useTheme } from 'native-base';
import OneSignal, {OSNotification} from "react-native-onesignal";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import {Notification} from "../components/Notification";

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification();
      setNotification(response)
    });

  }, [])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {
          notification?.title &&
          <Notification
              data={notification}
              onClose={() => setNotification(undefined)}
          />
      }
    </NavigationContainer>
  );
}