import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { saveHistory } from "../../redux/ducks/history";
import { COLORS, SIZES, FONTS } from "../../constants";

const compraExitosa = true;

const CompraFinalizada = (props) => {
  const dispatch = useDispatch();
  const { amount, direccion, descripcion, currency, id, date } = useSelector(
    (store) => store.BitcoinData
  );
  const { data } = useSelector((store) => store.HistoryData);
  const transactionHistory = {
    id,
    amount,
    direccion,
    descripcion,
    currency,
    date,
  };

  const { setRender } = props;

  const navigation = useNavigation();
  useEffect(() => {
    if (transactionHistory) {
      saveTransaction();
    }
  }, []);

  function saveTransaction() {
    dispatch(saveHistory(transactionHistory));
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      }}
    >
      <ImageBackground
        source={{
          uri:
            "https://ripio-cms-us.s3.amazonaws.com/filer_public/37/38/3738dce8-28d2-4784-9184-808d43e2358f/background-performance.png",
        }}
        resizeMode="cover"
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {compraExitosa ? (
          <View
            style={{
              marginTop: SIZES.fullpadding,
              paddingVertical: SIZES.fullpadding,
              alignContent: "center",
              justifyContent: "center",
              marginHorizontal: SIZES.padding,
              padding: 20,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.secondary,
              ...styles.shadow,
            }}
            onPress={() => setComprar(true)}
          >
            <Text
              style={{ color: COLORS.green, ...FONTS.h1, textAlign: "center" }}
            >
              Felicidades
            </Text>
            <Text
              style={{ color: COLORS.green, ...FONTS.h2, textAlign: "center" }}
            >
              El envio de {amount} bitcoins a la dirección {direccion} se ha
              realizado con exito
            </Text>
            <Text
              style={{
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.body3,
                lineHeight: 18,
                textAlign: "center",
              }}
            >
              Puedes ver esta y todas tus transacciones haciendo click en
              TRANSACCIONES
            </Text>
          </View>
        ) : (
          <View
            style={{
              marginTop: SIZES.fullpadding,
              paddingVertical: SIZES.fullpadding,
              alignContent: "center",
              justifyContent: "center",
              marginHorizontal: SIZES.padding,
              padding: 20,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.secondary,
              ...styles.shadow,
            }}
            onPress={() => setComprar(true)}
          >
            <Text
              style={{ color: COLORS.red, ...FONTS.h2, textAlign: "center" }}
            >
              !UPs!
            </Text>
            <Text
              style={{
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.body3,
                textAlign: "center",
                lineHeight: 18,
              }}
            >
              Ha ocurrido un error al intentar completar la operación.
            </Text>
            <Text
              style={{
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.h2,
                lineHeight: 24,
                textAlign: "center",
              }}
            >
              INTENTA DE NUEVO MAS TARDE.
            </Text>
          </View>
        )}
        <View>
          {compraExitosa ? (
            <TouchableOpacity
              style={{
                height: 45,
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: 35,
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => [
                navigation.navigate("Transaction"),
                setRender(false),
              ]}
            >
              <Text
                style={{
                  color: COLORS.secondary,
                  ...FONTS.h3,
                  textAlign: "center",
                }}
              >
                TRANSACCIONES
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                height: 45,
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding,
                padding: 20,
                borderRadius: 35,
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setRender(false)}
            >
              <Text
                style={{
                  color: COLORS.secondary,
                  ...FONTS.h3,
                  textAlign: "center",
                }}
              >
                REINTENTAR COMPRA
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              height: 45,
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.padding,
              padding: 20,
              borderRadius: 35,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              [navigation.navigate("Home"), setRender(false)];
            }}
          >
            <Text style={{ color: COLORS.secondary, ...FONTS.h3 }}>
              VOLVER AL HOME
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CompraFinalizada;
