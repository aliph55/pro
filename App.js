import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

//import { initializeApp } from "firebase/app";

WebBrowser.maybeCompleteAuthSession();

// Firebase Config (Firebase Console'dan al)
const firebaseConfig = {
  apiKey: "AIzaSyBQBeJUrdt99QuihLgTPtv9HpPebsUt7qU",
  authDomain: "elevated-column-445717-h4.firebaseapp.com",
  projectId: "elevated-column-445717-h4",
  storageBucket: "elevated-column-445717-h4.firebasestorage.app",
  messagingSenderId: "580447110631",
  appId: "1:580447110631:web:2a41bf1ee57eb266c9a942",
  measurementId: "G-F4K4PTP5TE",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default function GoogleSignIn() {
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "491406833717-90gbg1j16188d120j6u6gcob6723eha2.apps.googleusercontent.com",
    webClientId:
      "491406833717-90gbg1j16188d120j6u6gcob6723eha2.apps.googleusercontent.com",
    iosClientId:
      "580447110631-esckavplmrljkgnf5v299aerufajuvdb.apps.googleusercontent.com",
    androidClientId:
      "580447110631-pgrpip2f74n1oh2e6ovf48t7asv45c31.apps.googleusercontent.com",
  });

  useEffect(() => {
    const unsubscrible = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser: ", currentUser);
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
