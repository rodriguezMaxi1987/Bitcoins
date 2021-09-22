import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import RealizarEnvio from "../components/envio/RealizarEnvio";
import { EnvioFinalizado } from "../components";
const Compra = ({ navigation }) => {
  const [render, setRender] = useState(false);
  return (
    <View style={{ flex: 1, }}>
      {render ? <EnvioFinalizado setRender={setRender}  /> : <RealizarEnvio setRender={setRender} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default Compra;
