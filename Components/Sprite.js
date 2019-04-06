import React from "react";
import { View, Image } from "react-native";

export default class Sprite extends React.Component {
  affectionNombreCoordonnee = (nombre, colonne) => {
    const abs = nombre % colonne;
    const ord = parseInt(nombre / colonne);
    return [abs, ord];
  };

  renvoiRot = rot => {
    if (rot === undefined) {
      return 0;
    }
    return rot;
  };

  render() {
    const { sprite, sequence } = this.props.sprite;
    const { x, y, indiceSeq, action, rot } = this.props.etat;

    const largeurFrame = sprite.largeur / sprite.colonne;
    const hauteurFrame = sprite.hauteur / sprite.ligne;

    const hauteurAffiche = parseInt(
      (sprite.largeurAffiche * hauteurFrame) / largeurFrame
    );

    const [
      decalageImageGauche,
      decalageImageHaut
    ] = this.affectionNombreCoordonnee(
      sequence[action][indiceSeq],
      sprite.colonne
    );

    return (
      <View
        style={{
          width: sprite.largeurAffiche,
          height: hauteurAffiche,
          overflow: "hidden",
          position: "absolute",
          top: y,
          left: x,
          transform: [{ rotateZ: this.renvoiRot(rot) + "deg" }]
        }}
      >
        <Image
          source={sprite.file}
          style={{
            height: hauteurAffiche * sprite.ligne,
            width: sprite.largeurAffiche * sprite.colonne,
            top: -decalageImageHaut * hauteurAffiche,
            left: -decalageImageGauche * sprite.largeurAffiche
          }}
        />
      </View>
    );
  }
}
