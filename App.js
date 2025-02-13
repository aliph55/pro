import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";

//import { initializeApp } from "firebase/app";

WebBrowser.maybeCompleteAuthSession();

// Firebase Config (Firebase Console'dan al)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
};

//const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);

export default function GoogleSignIn() {
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "580447110631-vvv3d82c0e3sotaeacnkigi5cu2ks62a.apps.googleusercontent.com",
    webClientId:
      "580447110631-vvv3d82c0e3sotaeacnkigi5cu2ks62a.apps.googleusercontent.com",
    iosClientId:
      "580447110631-esckavplmrljkgnf5v299aerufajuvdb.apps.googleusercontent.com",
    //  androidClientId: "YOUR_ANDROID_CLIENT_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      //  const credential = GoogleAuthProvider.credential(id_token);
      //  signInWithCredential(auth, credential)
      //    .then((userCredential) => setUser(userCredential.user))
      //   .catch((error) => console.error(error));
    }
    console.log(response.params);
  }, [response]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button title="Google ile Giriş Yap" onPress={() => promptAsync()} />
      {user && <Text>Giriş Yapan: {user.displayName}</Text>}
    </View>
  );
}
