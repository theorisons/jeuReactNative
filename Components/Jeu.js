import React from "react";
import { StyleSheet, StatusBar, TouchableOpacity, Text } from "react-native";

import ImageScroll from "./ImageScroll";
import Sprite from "./Sprite";
import Menu from "./Menu";
import { connect } from "react-redux";

import { fonctionGestion } from "./systeme.js";

import {
  positionPersoX,
  positionPersoY,
  bgNor,
  bgInv,
  avantBgNor,
  avantBgInv,
  largeurEcran,
  hauteurEcran,
  fps,
  tempsMin,
  personnage,
  feu
} from "./constante.js";

class Jeu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      personnage: {
        action: "course",
        indiceSeq: 0,
        x: positionPersoX,
        y: positionPersoY,
        rot: 0,
        phaseSaut: 0,
        hitBox: {
          xGauche:
            positionPersoX +
            parseInt((1 / 4) * personnage.sprite.largeurAffiche),
          xDroite:
            positionPersoX +
            parseInt((3 / 4) * personnage.sprite.largeurAffiche),
          yBas:
            positionPersoY +
            parseInt(
              (personnage.sprite.largeurAffiche * personnage.sprite.hauteur) /
                personnage.sprite.ligne /
                (personnage.sprite.largeur / personnage.sprite.colonne)
            ),
          hauteur: parseInt(
            (personnage.sprite.largeurAffiche * personnage.sprite.hauteur) /
              personnage.sprite.ligne /
              (personnage.sprite.largeur / personnage.sprite.colonne)
          )
        }
      },
      bg: { nor: { x: 0, y: 0 }, inv: { x: largeurEcran, y: 0 } },
      avantBg: { nor: { x: 0, y: 0 }, inv: { x: largeurEcran, y: 0 } },
      obstacle: { liste: [], temps: { prochain: tempsMin, courant: tempsMin } }
    };
    this.action = { etat: 0, collision: true, debut: true };
    this.animation;
  }

  reset() {
    this.setState({
      score: 0,
      personnage: {
        action: "course",
        indiceSeq: 0,
        x: positionPersoX,
        y: positionPersoY,
        rot: 0,
        phaseSaut: 0,
        hitBox: {
          xGauche:
            positionPersoX +
            parseInt((1 / 4) * personnage.sprite.largeurAffiche),
          xDroite:
            positionPersoX +
            parseInt((3 / 4) * personnage.sprite.largeurAffiche),
          yBas:
            positionPersoY +
            parseInt(
              (personnage.sprite.largeurAffiche * personnage.sprite.hauteur) /
                personnage.sprite.ligne /
                (personnage.sprite.largeur / personnage.sprite.colonne)
            ),
          hauteur: parseInt(
            (personnage.sprite.largeurAffiche * personnage.sprite.hauteur) /
              personnage.sprite.ligne /
              (personnage.sprite.largeur / personnage.sprite.colonne)
          )
        }
      },
      bg: { nor: { x: 0, y: 0 }, inv: { x: largeurEcran, y: 0 } },
      avantBg: { nor: { x: 0, y: 0 }, inv: { x: largeurEcran, y: 0 } },
      obstacle: { liste: [], temps: { prochain: tempsMin, courant: tempsMin } }
    });
    this.action = { etat: 0, collision: false, debut: false };
  }

  startGame() {
    this.stopGame();
    this.animation = setInterval(() => {
      let newState;
      [newState, this.action] = fonctionGestion(this.state, this.action);
      if (this.action.collision) {
        if (this.state.score > this.props.hightScore) {
          const action = { type: "NEW_HS", value: this.state.score };
          this.props.dispatch(action);
        }
      }
      this.setState(newState);
    }, 1000 / fps);
  }

  afficherMenuScore() {
    if (this.action.collision) {
      let message = `Pas mal : ${this.state.score} `;
      if (this.action.debut) {
        //On vient de lancer le jeu
        message = "";
      } else if (this.state.score === this.props.hightScore) {
        //On a battu le record

        message = `Waooh ! ${this.state.score} `;
      }
      //Rien de spécial
      return <Menu message={message} />;
    }
    return <Text style={styles.score}>{this.state.score}</Text>;
  }

  stopGame() {
    clearInterval(this.animation);
  }

  componentDidMount() {
    this.startGame();
  }

  actionToucher = () => {
    this.action.etat = "saut";
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!this.action.collision) {
            this.actionToucher();
          } else {
            this.reset();
          }
        }}
        style={{
          backgroundColor: "blue",
          position: "absolute",
          top: 0,
          left: 0,
          width: largeurEcran,
          height: hauteurEcran
        }}
        activeOpacity={1}
      >
        <ImageScroll
          taille={{ largeur: largeurEcran, hauteur: hauteurEcran }}
          position={this.state.bg.nor}
          source={bgNor}
        />
        <ImageScroll
          taille={{ largeur: largeurEcran, hauteur: hauteurEcran }}
          position={this.state.bg.inv}
          source={bgInv}
        />
        <ImageScroll
          taille={{ largeur: largeurEcran, hauteur: hauteurEcran }}
          position={this.state.avantBg.nor}
          source={avantBgNor}
        />
        <ImageScroll
          taille={{ largeur: largeurEcran, hauteur: hauteurEcran }}
          position={this.state.avantBg.inv}
          source={avantBgInv}
        />
        <Sprite etat={this.state.personnage} sprite={personnage} />

        {this.state.obstacle.liste.map(item => {
          return <Sprite etat={item} sprite={feu} key={item.x} />;
        })}

        <StatusBar hidden={true} />

        {this.afficherMenuScore()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  bouton: { width: 100, position: "absolute", top: 50, right: 50 },
  score: {
    position: "absolute",
    top: 0,
    right: 20,
    fontSize: 80,
    fontWeight: "bold",
    color: "black",
    textAlign: "right"
  }
});

const mapStateToProps = state => {
  return { hightScore: state.hightScore };
};

export default connect(mapStateToProps)(Jeu);
