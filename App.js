import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

//import { initializeApp } from "firebase/app";

WebBrowser.maybeCompleteAuthSession();

// Firebase Config (Firebase Console'dan al)
const firebaseConfig = {
  apiKey: "AIzaSyB1Sg1c8LKwp8162aQO9Ws48AqjzXBmpS8",
  authDomain: "ninja-ddda1.firebaseapp.com",
  databaseURL: "https://ninja-ddda1.firebaseio.com",
  projectId: "ninja-ddda1",
  storageBucket: "ninja-ddda1.firebasestorage.app",
  messagingSenderId: "491406833717",
  appId: "1:491406833717:web:d24c9b389eb48149dad97c",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default function GoogleSignIn() {
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "580447110631-vvv3d82c0e3sotaeacnkigi5cu2ks62a.apps.googleusercontent.com",
    webClientId:
      "580447110631-vvv3d82c0e3sotaeacnkigi5cu2ks62a.apps.googleusercontent.com",
    iosClientId:
      "580447110631-esckavplmrljkgnf5v299aerufajuvdb.apps.googleusercontent.com",
    androidClientId:
      "580447110631-pgrpip2f74n1oh2e6ovf48t7asv45c31.apps.googleusercontent.com",
  });

  useEffect(() => {
    const unsubscrible = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
    });
    return () => {
      unsubscrible();
    };
  }, []);

  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => setUserInfo(userCredential.user))
        .catch((error) => console.error(error));
    }
    console.log(response?.params);
  }, [response]);

  console.log(userInfo);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue",
      }}
    >
      <Button title="Google ile Giriş Yap" onPress={() => promptAsync()} />
      {user && <Text>Giriş Yapan: {user.displayName}</Text>}
    </View>
  );
}
