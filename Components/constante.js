import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

// -- Constantes liées Ecran -- //
export const hauteurEcran = parseInt(height) + 1;
export const largeurEcran = parseInt(width) + 1;

// -- Constantes liées Personnage -- //
export const personnage = {
  sprite: {
    largeurAffiche: parseInt((1 / 3) * width),
    file: require("./sprite/SpritePersonnage.png"),
    largeur: 1600,
    hauteur: 1800,
    ligne: 3,
    colonne: 4
  },
  sequence: {
    repos: [0, 1, 2, 3, 2, 1, 0],
    course: [4, 5, 6, 7],
    saut: [8, 9, 10, 9, 8]
  }
};
export const positionPersoY = parseInt((1 / 6) * height);
export const positionPersoX = parseInt((1 / 5) * height);

export const saut = parseInt((1 / 20) * width);
export const sautMax =
  positionPersoY - parseInt((3 / 2) * personnage.sprite.largeurAffiche);

// -- Constantes liées Règles -- //
export const fps = 15;

// -- Constantes liées Obstacle -- //
export const feu = {
  sprite: {
    largeurAffiche: parseInt((1 / 8) * width),
    file: require("./sprite/SpriteFeu.png"),
    largeur: 1200,
    hauteur: 400,
    ligne: 1,
    colonne: 6
  },
  sequence: {
    bruler: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1]
  }
};
export const positionFeuY = parseInt((2 / 3) * height);

export const tempsMin = 1 * fps;
export const tempsMax = 2 * fps;

// -- Constantes liées Images -- //
export const bgNor = require("./sprite/backgroundNor.jpg");
export const bgInv = require("./sprite/backgroundInv.jpg");
export const valeurScrollBg = parseInt((1 / 300) * width);

export const avantBgNor = require("./sprite/basNor.png");
export const avantBgInv = require("./sprite/basInv.png");
export const valeurScrollAvantBg = parseInt((1 / 30) * width);
