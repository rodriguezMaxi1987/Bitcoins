import React, { useRef, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, SIZES, FONTS, icons } from "../../constants";
import { useNavigation } from "@react-navigation/core";
import { enviarBitcoins } from "../../redux/ducks/transaction";

const RealizarCompra = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const saldo = useSelector((store) => store.BitcoinData.saldo);
  const id = useSelector((store) => store.BitcoinData.id);

  const { setRender } = props;
  const [comprar, setComprar] = useState(false);
  const [monto, setMonto] = useState(0);
  const [bitcoins, setBitcoins] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [sendDireccion, setDireccion] = useState(null);
  const ArsRef = useRef(null);
  const DirectionRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      setComprar(false);
      setMonto(0);
      setDireccion(null);
      setBitcoins(0);
    }, [])
  );

  function bitcoinsTraslate(value) {
    let monto = Number(value);
    if (monto <= saldo) {
      let bitcoins = (Number(monto) * 1) / 250000.0 + comicion;
      setBitcoins(bitcoins);
    }
  }
  const comicion = 0.0012;
  function sendBitcoins() {
    let payload = {
      id: id,
      amount: bitcoins,
      comicion: comicion,
      direccion: sendDireccion,
      saldo: Number(saldo) - Number(monto),
    };
    dispatch(enviarBitcoins(payload));
  }

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: 200,
          ...styles.shadow,
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
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              flexDirection: "row",
              paddingTop: SIZES.h2,
            }}
          >
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={icons.back_arrow}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white,
                  }}
                />
                <Text
                  style={{
                    marginLeft: SIZES.base,
                    ...FONTS.h3,
                    color: COLORS.white,
                  }}
                >
                  Volver
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: "-30%",
              marginHorizontal: SIZES.padding,
              padding: 20,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.secondary,
              borderRadius: 35,
            }}
            onPress={() => setComprar(true)}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 , textAlign:"center"}}>
              Comprar Bitcoin es muy facil.
            </Text>
            <Text
              style={{
                marginTop: SIZES.base,
                color: COLORS.white,
                ...FONTS.body4,
                lineHeight: 18,
                textAlign: "center"
              }}
            >
              Ten en cuenta que la compra de BTC tiene un % de comisión. EL
              monto minimo a comprar es de $ 1400.00 ARS.
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={{ marginTop: SIZES.fullpadding }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: COLORS.secondary,
              ...FONTS.h2,
              marginTop: SIZES.fullpadding * 1.5,
              marginHorizontal: SIZES.fullpadding,
              justifyContent: "center",
            }}
          >
            $ARS :{" "}
          </Text>
          <TextInput
            style={{
              width: 190,
              color: COLORS.primary,
              marginTop: SIZES.fullpadding * 1.5 - 9,
              marginLeft: -40,
            }}
            ref={ArsRef}
            placeholderTextColor={COLORS.secondary}
            onChangeText={(value) => (setMonto(value), bitcoinsTraslate(value))}
            placeholder=" ingrese un monto en pesos"
            keyboardType="numeric"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: COLORS.secondary,
              ...FONTS.h3,
              marginTop: SIZES.base * 2,
              marginHorizontal: SIZES.fullpadding,
              justifyContent: "center",
            }}
          >
            DIRECCIÓN :{" "}
          </Text>
          <TextInput
            style={{
              width: 190,
              color: COLORS.primary,
              marginTop: SIZES.base * 2 - 12,
              marginLeft: -40,
            }}
            minLength={6}
            maxLength={20}
            ref={DirectionRef}
            placeholderTextColor={COLORS.secondary}
            onChangeText={(value) => setDireccion(value)}
            placeholder=" ingrese dirección de envío"
          />
        </View>
        {/* {(monto > 1400) & (monto < saldo) & (sendDireccion !== null) ? ( */}
        <TouchableOpacity
          style={{
            marginTop: SIZES.fullpadding * 2,
            marginHorizontal: SIZES.padding,
            padding: 20,
            borderRadius: 35,
            backgroundColor: COLORS.secondary,
            opacity:
              (monto < 1400) | (monto > saldo) | (sendDireccion == null)
                ? 0.5
                : 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={(monto < 1400) | (monto > saldo) | (sendDireccion == null)}
          onPress={() => setShowModal(true)}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}
          >
            Continuar
          </Text>
        </TouchableOpacity>
        {/* ) : null} */}
      </View>

      {showModal ? (
        <Modal
          animationType="slide"
          transparent={false}
          isVisible={showModal}
          backdropOpacity={0.6}
          backgroundColor={COLORS.secondary}
        >
          <View
            style={{
              margin: 60,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
              padding: 20,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.secondary,
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                  textAlign: "center",
                }}
              >
                !YA CASI!
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: SIZES.base,
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                Ten en cuenta que la compra de BTC tiene un 1.0% de comisión
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: SIZES.fullpadding,
                  color: COLORS.white,
                  ...FONTS.h4,
                  lineHeight: 18,
                }}
              >
                El iporte ingresado corresponde
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                  textAlign: "center",
                }}
              >
                {" "}
                {bitcoins} bitcoins
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  marginTop: SIZES.padding,
                  marginHorizontal: SIZES.padding,
                  padding: 20,
                  borderRadius: 35,
                  backgroundColor: COLORS.white,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => [
                  setShowModal(false),
                  setRender(true),
                  sendBitcoins(),
                ]}
              >
                <Text style={{ color: COLORS.secondary, ...FONTS.h3 }}>
                  Confirmar Compra
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: SIZES.padding,
                  marginHorizontal: SIZES.padding,
                  padding: 20,
                  borderRadius: 35,
                  backgroundColor: COLORS.white,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={{ color: COLORS.secondary, ...FONTS.h3 }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
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

export default RealizarCompra;
