/* Calculateur econotes — logique d'interface.
   Les prix viennent de engine.js, généré depuis la grille revendeur. */

const COVERS = {
  premium: {
    nom: "Premium",
    desc: "PET 70 % recyclé, indéformable et waterproof. Toucher velours.",
    court: "La plus rigide, celle qui dure des années."
  },
  soft: {
    nom: "Carton soft touch",
    desc: "Carton PEFC pelliculé, toucher velours, résiste à l'humidité.",
    court: "Le bon compromis entre rendu et budget."
  },
  carton: {
    nom: "Carton",
    desc: "Carton PEFC brut, léger, personnalisable à l'identique.",
    court: "La version goodies, pour les gros volumes."
  },
  goodies: {
    nom: "Standard",
    desc: "La référence telle quelle, personnalisable.",
    court: "Simple et efficace."
  }
};

const euros = (v) => new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 2, maximumFractionDigits: 2
}).format(v) + " €";

const params = new URLSearchParams(location.search);
const modeRevendeur = params.get("m") === "rev";
const QTE_MIN = 10;

const premierProduit = PRODUCTS[0];
const etat = {
  produit: premierProduit.id,
  couverture: Object.keys(premierProduit.variants)[0],
  pages: Object.values(premierProduit.variants)[0] ? Object.keys(Object.values(premierProduit.variants)[0])[0] : null,
  elastique: false,
  qte: 100,
  remise: 0
};

const produitCourant = () => PRODUCTS.find((p) => p.id === etat.produit);
const couverturesDispo = () => Object.keys(produitCourant().variants);
const pagesDispo = () => Object.keys(produitCourant().variants[etat.couverture] || {});

function prix(opts) {
  return chiffrer({
    produit: etat.produit,
    couverture: opts && opts.couverture ? opts.couverture : etat.couverture,
    pages: opts && opts.pages !== undefined ? opts.pages : etat.pages,
    qte: opts && opts.qte !== undefined ? opts.qte : etat.qte,
    elastique: etat.elastique
  });
}

/* ---------- étape 1 : produit ---------- */
function dessinerProduits() {
  const zone = document.getElementById("produits");
  zone.innerHTML = "";
  PRODUCTS.forEach((p) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = p.nom;
    b.setAttribute("aria-pressed", String(p.id === etat.produit));
    b.addEventListener("click", () => {
      etat.produit = p.id;
      etat.couverture = Object.keys(p.variants)[0];
      etat.pages = Object.keys(p.variants[etat.couverture])[0];
      etat.elastique = false;
      if (etat.qte < QTE_MIN) etat.qte = QTE_MIN;
      dessinerProduits();
      dessinerCouvertures();
      dessinerOptions();
      dessinerPaliers();
      majRecap();
    });
    zone.appendChild(b);
  });
}

/* ---------- étape 2 : couverture ---------- */
function dessinerCouvertures() {
  const zone = document.getElementById("couvertures");
  const etape = document.querySelector('[data-step="2"]');
  const liste = couverturesDispo();
  zone.innerHTML = "";
  etape.hidden = liste.length < 2;
  renumeroter();
  liste.forEach((cle) => {
    const meta = COVERS[cle] || COVERS.goodies;
    const dispo = Object.keys(produitCourant().variants[cle]);
    const pagesRef = dispo.indexOf(String(etat.pages)) >= 0 ? etat.pages : dispo[0];
    const r = prix({ couverture: cle, pages: pagesRef });
    const b = document.createElement("button");
    b.type = "button";
    b.className = "cover";
    b.setAttribute("aria-pressed", String(cle === etat.couverture));
    b.innerHTML =
      '<div class="name"><span class="dot"></span>' + meta.nom + "</div>" +
      '<div class="desc">' + meta.desc + "</div>" +
      '<div class="from">' + (r ? euros(r.unitConseille) : "sur devis") +
      ' <span>l\'unité</span></div>';
    b.addEventListener("click", () => {
      const dispo = Object.keys(produitCourant().variants[cle]);
      etat.couverture = cle;
      etat.pages = dispo.indexOf(String(etat.pages)) >= 0 ? etat.pages : dispo[0];
      dessinerCouvertures();
      dessinerOptions();
      majRecap();
    });
    zone.appendChild(b);
  });
}

function renumeroter() {
  let n = 0;
  document.querySelectorAll("section.step").forEach((s) => {
    if (s.hidden) return;
    n += 1;
    s.querySelector(".num").textContent = String(n);
  });
}

/* ---------- étape 3 : options ---------- */
function dessinerOptions() {
  const zone = document.getElementById("options");
  const p = produitCourant();
  const pages = pagesDispo();
  zone.innerHTML = "";

  if (pages.length > 1) {
    zone.appendChild(ligneOption(
      "Nombre de pages",
      "Plus de pages, prix plus élevé.",
      pages.map((v) => ({ valeur: v, label: v + " pages" })),
      etat.pages,
      (v) => { etat.pages = v; dessinerOptions(); majRecap(); }
    ));
  }

  if (p.elastic) {
    zone.appendChild(ligneOption(
      "Élastique",
      "Noir ou blanc, pour fermer le carnet.",
      [
        { valeur: "non", label: "Sans" },
        { valeur: "noir", label: "Noir" },
        { valeur: "blanc", label: "Blanc" }
      ],
      etat.elastique ? etat.elastique : "non",
      (v) => { etat.elastique = v === "non" ? false : v; dessinerOptions(); majRecap(); }
    ));
  }

  if (!zone.children.length) {
    zone.innerHTML = '<p class="hint" style="margin:0">Ce produit n\'a pas d\'option supplémentaire. Passez à la quantité.</p>';
  }
}

function ligneOption(titre, sous, choix, actif, onChange) {
  const d = document.createElement("div");
  d.className = "opt";
  const label = document.createElement("div");
  label.className = "opt-label";
  label.innerHTML = titre + "<small>" + sous + "</small>";
  const seg = document.createElement("div");
  seg.className = "seg";
  choix.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = c.label;
    b.setAttribute("aria-pressed", String(String(c.valeur) === String(actif)));
    b.addEventListener("click", () => onChange(c.valeur));
    seg.appendChild(b);
  });
  d.appendChild(label);
  d.appendChild(seg);
  return d;
}

/* ---------- étape 4 : quantité ---------- */
function dessinerPaliers() {
  const zone = document.getElementById("paliers");
  zone.innerHTML = "";
  PALIERS.forEach((v) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = v.toLocaleString("fr-FR");
    b.setAttribute("aria-pressed", String(etat.qte === v));
    b.addEventListener("click", () => { etat.qte = v; majQuantite(); majRecap(); });
    zone.appendChild(b);
  });
}

function majQuantite() {
  const input = document.getElementById("qte");
  input.min = String(QTE_MIN);
  input.value = String(etat.qte);
  document.querySelectorAll("#paliers .chip").forEach((b) => {
    b.setAttribute("aria-pressed", String(Number(b.textContent.replace(/\s/g, "")) === etat.qte));
  });
  const h = document.getElementById("hintQte");
  h.textContent = "Sous 25 pièces, 40 € HT de frais techniques s'ajoutent. Au-dessus, le prix baisse par palier.";
}

/* ---------- récap ---------- */
function majRecap() {
  const r = prix();
  if (!r) {
    document.getElementById("unit").textContent = "sur devis";
    document.getElementById("total").textContent = "sur devis";
    return;
  }
  const p = produitCourant();
  const meta = COVERS[etat.couverture] || COVERS.goodies;
  const taux = Math.max(0, Math.min(60, etat.remise)) / 100;
  const arrondi = (v) => Math.round(v * 100) / 100;

  const baseUnit = modeRevendeur ? r.unitAchat : r.unitConseille;
  const unit = arrondi(baseUnit * (1 - taux));
  const port = r.qte < 25 ? 9.9 : 0;
  const total = arrondi(unit * r.qte + r.frais + port);

  document.getElementById("modeBadge").textContent = modeRevendeur ? "Prix d'achat HT" : "Prix HT";
  document.getElementById("notePrix").textContent = (modeRevendeur
    ? "Prix d'achat revendeur HT, issus de la grille revendeur econotes 2026."
    : "Prix conseillés HT, issus de la grille revendeur econotes 2026.")
    + " Fabrication française, 5 jours ouvrés après validation du BAT.";
  document.getElementById("unit").textContent = euros(unit);
  document.getElementById("total").textContent = euros(total);
  document.getElementById("qteLabel").textContent = "pour " + r.qte.toLocaleString("fr-FR") + " pièces";

  const frais = document.getElementById("frais");
  if (r.frais) {
    frais.hidden = false;
    frais.textContent = "Dont " + euros(r.frais) + " HT de frais techniques, car la quantité est sous 25 pièces.";
  } else {
    frais.hidden = true;
  }

  const portEl = document.getElementById("port");
  portEl.textContent = port
    ? "Livraison 1 point en France : " + euros(port) + " HT, car la quantité est sous 25 pièces."
    : "Livraison offerte, 1 point en France.";

  const lignes = [
    "Produit : " + p.nom,
    "Couverture : " + meta.nom,
    pagesDispo().length > 1 ? "Pages : " + etat.pages : null,
    p.elastic ? "Élastique : " + (etat.elastique || "sans") : null,
    "Quantité : " + r.qte,
    etat.remise ? "Remise : " + etat.remise + " %" : null,
    "Prix unitaire : " + euros(unit) + " HT",
    port ? "Livraison : " + euros(port) + " HT" : "Livraison : offerte, 1 point en France",
    "Total livré : " + euros(total) + " HT" + (r.frais ? " (dont " + euros(r.frais) + " de frais techniques)" : "")
  ].filter(Boolean);
  const sujet = "Devis " + p.nom + " " + meta.nom + " x" + r.qte;
  document.getElementById("cta").href = "mailto:stephen@econotes.co"
    + "?subject=" + encodeURIComponent(sujet)
    + "&body=" + encodeURIComponent("Bonjour,\n\n" + lignes.join("\n") + "\n\nMerci de me confirmer le devis.\n");
}

/* ---------- quantité : boutons ---------- */
document.getElementById("moins").addEventListener("click", () => {
  etat.qte = Math.max(QTE_MIN, etat.qte - 25);
  majQuantite(); majRecap();
});
document.getElementById("plus").addEventListener("click", () => {
  etat.qte = Math.min(100000, etat.qte + 25);
  majQuantite(); majRecap();
});
document.getElementById("qte").addEventListener("change", (e) => {
  const v = parseInt(e.target.value, 10);
  etat.qte = isNaN(v) ? QTE_MIN : Math.max(QTE_MIN, Math.min(100000, v));
  majQuantite(); majRecap();
});
document.getElementById("qte").addEventListener("input", (e) => {
  const v = parseInt(e.target.value, 10);
  if (!isNaN(v) && v >= QTE_MIN) { etat.qte = Math.min(100000, v); majRecap(); }
});

document.getElementById("remise").addEventListener("input", (e) => {
  const v = parseInt(e.target.value, 10);
  etat.remise = isNaN(v) ? 0 : Math.max(0, Math.min(60, v));
  majRecap();
});

/* ---------- démarrage ---------- */
dessinerProduits();
dessinerCouvertures();
dessinerOptions();
dessinerPaliers();
majQuantite();
majRecap();
