import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { largeurEcran, hauteurEcran } from "./constante";
import { connect } from "react-redux";

class Menu extends React.Component {
  render() {
    const message = this.props.message;

    return (
      <View style={styles.mainView}>
        <Text style={[styles.textGeneral, styles.titreJeu]}>JEU BIEN</Text>
        <Text style={[styles.textGeneral, styles.jouer]}>Allons - y !! </Text>
        <Text style={[styles.textGeneral, styles.message]}>{message}</Text>
        <Text style={[styles.bestScore, styles.textGeneral]}>
          Meilleur Score : {this.props.hightScore}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textGeneral: {
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
    textShadowRadius: 20,
    color: "#d35400",
    textShadowColor: "#c0392b"
  },
  mainView: {
    position: "absolute",
    top: parseInt((1 / 8) * hauteurEcran),
    left: parseInt((1 / 8) * largeurEcran),
    width: parseInt((6 / 8) * largeurEcran),
    height: parseInt((6 / 8) * hauteurEcran),
    borderRadius: parseInt((1 / 2) * hauteurEcran),
    backgroundColor: "rgba(243, 234, 18, 0.2)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    borderColor: "black"
  },
  titreJeu: {
    fontSize: 40,
    position: "absolute",
    top: 10
  },
  bestScore: {
    fontSize: 20,
    position: "absolute",
    bottom: 10
  },
  jouer: {
    fontSize: 80
  },
  message: { fontSize: 30 }
});

const mapStateToProps = state => {
  return { hightScore: state.hightScore };
};

export default connect(mapStateToProps)(Menu);
