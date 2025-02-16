import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./firebaseConfig"; // Firebase ayarlarını içe aktar

WebBrowser.maybeCompleteAuthSession();

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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser: ", currentUser);
      setUser(currentUser);
    });
    return unsubscribe;
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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Google ile Giriş Yap" onPress={() => promptAsync()} />
      {user && <Text>Giriş Yapan: {user?.displayName}</Text>}
    </View>
  );
}
