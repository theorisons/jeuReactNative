import {
  largeurEcran,
  valeurScrollBg,
  valeurScrollAvantBg,
  tempsMin,
  tempsMax,
  positionFeuY,
  positionPersoY,
  personnage,
  feu,
  saut,
  sautMax
} from "./constante";

export const fonctionGestion = (etatCourant, action) => {
  if (action.collision) {
    [etatCourant.personnage, action] = deplacementPersonnage(
      etatCourant.personnage,
      action
    );
    return [etatCourant, action];
  }

  etatCourant.bg = deplacementFond(etatCourant.bg, valeurScrollBg);
  etatCourant.avantBg = deplacementFond(
    etatCourant.avantBg,
    valeurScrollAvantBg
  );
  [etatCourant.personnage, action] = deplacementPersonnage(
    etatCourant.personnage,
    action
  );
  etatCourant.obstacle = deplacementObstacle(etatCourant.obstacle);

  // if (gererCollision(etatCourant)) {
  //   action.etat = "repos";
  //   action.collision = true;
  // }

  return [etatCourant, action];
};

deplacementFond = (bg, scroll) => {
  bg.nor.x -= scroll;
  if (bg.nor.x + largeurEcran <= 0) {
    bg.nor.x += 2 * largeurEcran;
  }
  bg.inv.x -= scroll;
  if (bg.inv.x + largeurEcran <= 0) {
    bg.inv.x += 2 * largeurEcran;
  }
  return bg;
};

gestionSaut = etat => {
  if (etat.phaseSaut === 0) {
    //1ere frame déclenchement saut

    etat.indiceSeq += 1;
    etat.phaseSaut = "asc";

    return etat;
  } else if (etat.phaseSaut === "asc") {
    if (etat.indiceSeq === 1) {
      //2eme frame de déclenchement saut

      etat.indiceSeq += 1;

      return etat;
    }
    // etat.rot = 90;

    etat.y -= saut;
    etat.hitBox.yBas -= saut;
    if (etat.y < sautMax) {
      etat.y = sautMax;
      etat.hitBox.yBas = sautMax + etat.hitBox.hauteur;
      etat.phaseSaut = "des";
    }

    return etat;
  } else if (etat.phaseSaut === "des") {
    etat.y += saut;
    etat.hitBox.yBas += saut;

    if (etat.y > positionPersoY) {
      etat.y = positionPersoY;
      etat.hitBox.yBas = positionPersoY + etat.hitBox.hauteur;

      etat.rot = 0;

      etat.phaseSaut = 0;
      etat.action = "course";
    }

    return etat;
  }
};

deplacementPersonnage = (etat, action) => {
  if (etat.action == "saut" && !action.collision) {
    action.etat = 0;
    etat = gestionSaut(etat);
    return [etat, action];
  }

  if (action.etat !== 0 && action.etat !== etat.action) {
    etat.indiceSeq = 0;
    etat.action = action.etat;
    action.etat = 0;
    return [etat, action];
  }

  etat.indiceSeq = augmentationIndice(
    etat.indiceSeq,
    personnage.sequence[etat.action]
  );
  return [etat, action];
};

augmentationIndice = (indice, sequence) => {
  indice += 1;
  if (indice === sequence.length) {
    indice = 0;
  }
  return indice;
};

deplacementObstacle = etat => {
  if (etat.temps.prochain <= etat.temps.courant) {
    etat.liste = [...etat.liste, genererObstacle()];
    etat.temps.courant = 0;
    etat.temps.prochain =
      Math.floor(Math.random() * (tempsMax - tempsMin)) + tempsMin;
  }
  etat.liste.map(el => {
    el.x -= valeurScrollAvantBg;
    el.hitBox.xDroite -= valeurScrollAvantBg;
    el.hitBox.xGauche -= valeurScrollAvantBg;
    el.indiceSeq = augmentationIndice(el.indiceSeq, feu.sequence[el.action]);
  });
  if (etat.liste.length > 0) {
    if (etat.liste[0].x <= -feu.sprite.largeurAffiche) {
      etat.liste.shift();
    }
  }

  etat.temps.courant += 1;
  return etat;
};

genererObstacle = () => {
  let obstacle = {
    x: largeurEcran,
    y: positionFeuY,
    action: "bruler",
    indiceSeq: 0,
    hitBox: {
      xGauche: largeurEcran,
      xDroite: largeurEcran + feu.sprite.largeurAffiche,
      yHaut: positionFeuY + parseInt((1 / 2) * feu.sprite.largeurAffiche)
    },
    valide: false
  };
  return obstacle;
};

gererCollision = etat => {
  const personnageHB = etat.personnage.hitBox;
  const feu = etat.obstacle.liste;

  for (let i = 0; i < feu.length; i++) {
    if (personnageHB.yBas >= feu[i].hitBox.yHaut) {
      if (feu[i].hitBox.xGauche <= personnageHB.xDroite) {
        if (feu[i].hitBox.xDroite >= personnageHB.xDroite) {
          return true;
        }
      }

      if (feu[i].hitBox.xGauche <= personnageHB.xGauche) {
        if (feu[i].hitBox.xDroite >= personnageHB.xGauche) {
          return true;
        }
      }

      if (feu[i].hitBox.xGauche >= personnageHB.xGauche) {
        if (feu[i].hitBox.xDroite <= personnageHB.xDroite) {
          return true;
        }
      }
    }
    if (feu[i].hitBox.xDroite <= personnageHB.xGauche) {
      if (!feu[i].valide) {
        feu[i].valide = true;
        etat.score += 1;
      }
    }
  }

  return false;
};
