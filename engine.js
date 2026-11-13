const DATA = {"carnet-a5|premium|30": {"ref": "A5PM30", "achat": [12.62, 11.63, 11.02, 10.15, 9.29, 8.31, 7.69], "pvc": [18.93, 17.445, 16.53, 15.225, 13.935, 12.465, 11.535], "nom": "Carnet A5 Premium 30 pages"}, "carnet-a5|premium|60": {"ref": "A5PM60", "achat": [14.15, 13.05, 12.35, 11.38, 10.42, 9.31, 8.62], "pvc": [21.225, 19.575, 18.525, 17.07, 15.63, 13.965, 12.93], "nom": "Carnet A5 Premium 60 pages"}, "carnet-a5|soft|30": {"ref": "A5CST30", "achat": [11.46, 10.57, 10.01, 9.23, 8.45, 7.56, 7.0], "pvc": [17.19, 15.855, 15.015, 13.845, 12.675, 11.34, 10.5], "nom": "Carnet A5 carton soft touch 30 pages"}, "carnet-a5|soft|60": {"ref": "A5CST60", "achat": [13.0, 11.98, 11.35, 10.46, 9.57, 8.56, 7.92], "pvc": [19.5, 17.97, 17.025, 15.69, 14.355, 12.84, 11.88], "nom": "Carnet A5 carton soft touch 60 pages"}, "carnet-a5|carton|30": {"ref": "A5C30", "achat": [10.0, 9.2, 8.7, 8.0, 7.3, 6.5, 6.0], "pvc": [13.5, 12.42, 11.745, 10.8, 9.855, 8.775, 8.1], "nom": "Carnet A5 carton 30 pages"}, "carnet-a5|carton|60": {"ref": "A5C60", "achat": [11.54, 10.62, 10.04, 9.23, 8.42, 7.5, 6.92], "pvc": [15.579, 14.337, 13.554, 12.4605, 11.367, 10.125, 9.342], "nom": "Carnet A5 carton 60 pages"}, "cahier-a4|premium|48": {"ref": "A4PM", "achat": [15.81, 14.57, 13.79, 12.71, 11.62, 11.31, 10.38], "pvc": [23.715, 21.855, 20.685, 19.065, 17.43, 16.965, 15.57], "nom": "Cahier A4 premium"}, "cahier-a4|soft|48": {"ref": "A4CST", "achat": [14.65, 13.51, 12.79, 11.78, 10.78, 10.49, 9.63], "pvc": [21.975, 20.265, 19.185, 17.67, 16.17, 15.735, 14.445], "nom": "Cahier A4 carton soft touch"}, "agenda-a5|premium|146": {"ref": "A5AGD", "achat": [17.23, 15.88, 15.03, 13.85, 12.66, 11.31, 10.46], "pvc": [23.2605, 21.438, 20.2905, 18.6975, 17.091, 15.2685, 14.121], "nom": "Agenda A5 Premium"}, "bloc-a6|soft|48": {"ref": "A6CST", "achat": [8.38, 7.71, 7.29, 6.71, 6.12, 5.95, 5.45], "pvc": [11.313, 10.4085, 9.8415, 9.0585, 8.262, 8.0325, 7.3575], "nom": "Bloc-note A6 carton soft touch"}, "bloc-a6|carton|48": {"ref": "A6C", "achat": [8.0, 7.36, 6.96, 6.4, 5.84, 5.68, 5.2], "pvc": [10.8, 9.936, 9.396, 8.64, 7.884, 7.668, 7.02], "nom": "Bloc-note A6 carton"}, "bloc-a7|soft|48": {"ref": "A7CST", "achat": [7.38, 6.71, 6.29, 5.71, 5.12, 4.95, 4.45], "pvc": [9.963, 9.0585, 8.4915, 7.7085, 6.912, 6.6825, 6.0075], "nom": "Bloc-note A7 carton soft touch"}, "bloc-a7|carton|48": {"ref": "A7C", "achat": [7.0, 6.36, 5.96, 5.4, 4.84, 4.68, 4.2], "pvc": [9.45, 8.586, 8.046, 7.29, 6.534, 6.318, 5.67], "nom": "Bloc-note A7 carton"}, "sticky-10|premium|10": {"ref": "STICKIT10", "achat": [9.99, 8.91, 7.21, 6.49, 6.16, 5.85, 5.74], "pvc": [13.4865, 12.0285, 9.7335, 8.7615, 8.316, 7.8975, 7.749], "nom": "Sticky notes pack de 10"}, "sticky-1|goodies|1": {"ref": "STICKITG", "achat": [null, null, 2.19, 2.05, 1.98, 1.84, null], "pvc": [null, null, 2.9565, 2.7675, 2.673, 2.484, null], "nom": "Sticky notes à l'unité"}, "planner|goodies|1": {"ref": "PLANNERG", "achat": [2.84, 2.28, 2.21, 2.07, 1.85, "-", "-"], "pvc": [3.834, 3.078, 2.9835, 2.7945, 2.4975, "-", "-"], "nom": "Planner"}};
const PRODUCTS = [{"id": "carnet-a5", "nom": "Carnet A5", "dims": "146 × 207 mm", "pages": [30, 60], "elastic": true, "variants": {"premium": {"30": "A5PM30", "60": "A5PM60"}, "soft": {"30": "A5CST30", "60": "A5CST60"}, "carton": {"30": "A5C30", "60": "A5C60"}}}, {"id": "cahier-a4", "nom": "Cahier A4", "dims": "208 × 293 mm", "pages": [48], "elastic": true, "variants": {"premium": {"48": "A4PM"}, "soft": {"48": "A4CST"}}}, {"id": "agenda-a5", "nom": "Agenda A5", "dims": "146 × 207 mm · 146 pages", "pages": [146], "elastic": true, "variants": {"premium": {"146": "A5AGD"}}}, {"id": "bloc-a6", "nom": "Bloc-notes A6", "dims": "102 × 145 mm · 48 pages", "pages": [48], "elastic": false, "variants": {"soft": {"48": "A6CST"}, "carton": {"48": "A6C"}}}, {"id": "bloc-a7", "nom": "Bloc-notes A7", "dims": "73 × 103 mm · 48 pages", "pages": [48], "elastic": false, "variants": {"soft": {"48": "A7CST"}, "carton": {"48": "A7C"}}}, {"id": "sticky-10", "nom": "Sticky notes x10", "dims": "7 × 7 cm · lot de 10", "pages": [], "elastic": false, "variants": {"premium": {"10": "STICKIT10"}}}, {"id": "sticky-1", "nom": "Sticky notes à l'unité", "dims": "7 × 7 cm", "pages": [], "elastic": false, "variants": {"goodies": {"1": "STICKITG"}}}, {"id": "planner", "nom": "Planner A4", "dims": "21 × 29,7 cm", "pages": [], "elastic": false, "variants": {"goodies": {"1": "PLANNERG"}}}];
const PALIERS = [25, 50, 100, 250, 500, 1000, 2500];
const ELASTIQUE = 0.10;
const FRAIS_TECHNIQUES = 40;

function palierIndex(qte) {
  let idx = 0;
  for (let k = 0; k < PALIERS.length; k++) if (qte >= PALIERS[k]) idx = k;
  return idx;
}

function valeur(table, base) {
  let v = table[base];
  for (let k = base + 1; (v === null || v === undefined || v === "-") && k < PALIERS.length; k++) v = table[k];
  if (v === null || v === undefined || v === "-") {
    for (let k = base - 1; k >= 0; k--) {
      const w = table[k];
      if (w !== null && w !== undefined && w !== "-") return w;
    }
    return null;
  }
  return v;
}

function prixUnitaire(produit, couverture, pages, qte, elastique) {
  const ligne = DATA[produit + "|" + couverture + "|" + pages];
  if (!ligne) return null;
  const base = palierIndex(Math.max(qte, 0));
  const achat = valeur(ligne.achat, base);
  const pvc = valeur(ligne.pvc, base);
  if (achat === null || pvc === null) return null;
  const coeff = pvc / achat;
  const unitAchat = achat + (elastique ? ELASTIQUE : 0);
  return { unitAchat: unitAchat, unitConseille: unitAchat * coeff };
}

function chiffrer(opts) {
  const qte = Math.max(1, Math.min(100000, Math.round(opts.qte)));
  const p = prixUnitaire(opts.produit, opts.couverture, String(opts.pages), qte, opts.elastique);
  if (!p) return null;
  const arrondi = (v) => Math.round(v * 100) / 100;
  const frais = qte < 25 ? FRAIS_TECHNIQUES : 0;
  const unitAchat = arrondi(p.unitAchat);
  const unitConseille = arrondi(p.unitConseille);
  return {
    qte: qte,
    unitAchat: unitAchat,
    unitConseille: unitConseille,
    totalAchat: arrondi(unitAchat * qte + frais),
    totalConseille: arrondi(unitConseille * qte + frais),
    frais: frais
  };
}

if (typeof module !== "undefined") module.exports = { DATA, PRODUCTS, PALIERS, prixUnitaire, chiffrer };
