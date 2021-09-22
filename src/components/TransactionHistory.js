import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import { useSelector } from "react-redux";

const TransactionHistory = ({ customContainerStyle }) => {
  const { data } = useSelector((store) => store.HistoryData);
  const [showModal, setShowModal] = useState(false);
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: SIZES.base,
        }}
        onPress={(item) => setShowModal(true)}
      >
        <Image
          source={icons.transaction}
          style={{
            width: 30,
            height: 30,
            tintColor: COLORS.primary,
          }}
        />
        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
          <Text style={{ ...FONTS.h3 }}>{item.descripcion}</Text>
          <Text style={{ color: COLORS.lightGray, ...FONTS.body4 }}>
            {item.date}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Text>
            {item.amount} {item.currency}
          </Text>
          <Image
            source={icons.right_arrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray,
            }}
          />
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
                marginHorizontal: SIZES.base,
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
                  DETALLE DE LA TRANSACCIÓN
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: SIZES.fullpadding,
                    color: COLORS.white,
                    ...FONTS.h2,
                    lineHeight: 24,
                  }}
                >
                  Evento
                </Text>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h3,
                    textAlign: "center",
                  }}
                >
                  {item.descripcion}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: SIZES.padding,
                    color: COLORS.white,
                    ...FONTS.h2,
                    lineHeight: 24,
                  }}
                >
                  Monto enviado
                </Text>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h3,
                    textAlign: "center",
                  }}
                >
                  {item.amount} bitcoins
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: SIZES.padding,
                    color: COLORS.white,
                    ...FONTS.h2,
                    lineHeight: 24,
                  }}
                >
                  Dirección
                </Text>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h3,
                    textAlign: "center",
                  }}
                >
                  {item.direccion}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: SIZES.padding,
                    color: COLORS.white,
                    ...FONTS.h2,
                    lineHeight: 24,
                  }}
                >
                  Fecha
                </Text>
                <Text
                  style={{
                    color: COLORS.green,
                    ...FONTS.h3,
                    textAlign: "center",
                  }}
                >
                  {item.date}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    height: 25,
                    width: 200,
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 20,
                    borderRadius: 35,
                    backgroundColor: COLORS.white,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => [setShowModal(false)]}
                >
                  <Text style={{ color: COLORS.secondary, ...FONTS.h3 }}>
                    Cerrar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 20,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...customContainerStyle,
      }}
    >
      <Text style={{ ...FONTS.h3 }}>Transacciones</Text>
      <FlatList
        contentContainerStyle={{ marginTop: SIZES.radius }}
        scrollEnabled={false}
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: COLORS.lightGray,
              }}
            ></View>
          );
        }}
      />
    </View>
  );
};

export default TransactionHistory;
