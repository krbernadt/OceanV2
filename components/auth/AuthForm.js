import { useState } from "react";
import { StyleSheet, View } from "react-native";

import SubmitButton from "../ui/SubmitButton";
import Input from "./Input";

function AuthForm({ onSubmit, credentialsInvalid }) {
  const [enteredNik, setEnteredNik] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const { nik: nikIsInvalid, password: passwordIsInvalid } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "nik":
        setEnteredNik(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      nik: enteredNik,
      password: enteredPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="NIK "
          onUpdateValue={updateInputValueHandler.bind(this, "nik")}
          value={enteredNik}
          isInvalid={nikIsInvalid}
        />
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <View style={styles.buttons}>
          <SubmitButton onPress={submitHandler}></SubmitButton>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
