import React from "react";
import { Image } from "react-native";

export default class ImageScroll extends React.Component {
  render() {
    const { x, y } = this.props.position;
    const { largeur, hauteur } = this.props.taille;
    const source = this.props.source;

    return (
      <Image
        source={source}
        style={{
          height: hauteur,
          width: largeur,
          position: "absolute",
          top: y,
          left: x
        }}
      />
    );
  }
}
