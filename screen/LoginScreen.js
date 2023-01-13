import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";

export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginhandler({ nik, password }) {
    setIsAuthenticating(true);
    try {
      const id = await login(nik, password);
      authCtx.authenticate(id);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credential"
      );
      console.log(error);
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent onAuthenticate={loginhandler} />;
}
