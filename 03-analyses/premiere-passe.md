# Première passe — inventaire et coût des obligations administratives

11 octobre 2026. Fichiers produits :
- `02-extractions/obligations.csv` — inventaire des obligations (une ligne par phrase)
- `03-analyses/scm-hypotheses.csv` — hypothèses du modèle de coût (modifiables)
- `03-analyses/scm-resultats.csv` — résultats du modèle
- scripts : `scripts/extract_obligations.py`, `scripts/cout_scm.py`

## 1. Inventaire des obligations

Extraction par règles sur les 11 572 articles : **2 847 phrases-obligations dans 2 332 articles**
(1 311 à la voix active, 1 442 au passif avec l'employeur sous-entendu, 94 droits du salarié valant obligation pour l'employeur).

| Catégorie | Nombre |
|---|---|
| Non classée | 1 081 |
| Santé et sécurité | 360 |
| Déclaration à l'administration | 290 |
| Versement | 186 |
| Formalisme et procédure | 162 |
| Registre ou document | 138 |
| Information du salarié | 119 |
| Affichage | 118 |
| Formation | 108 |
| Consultation du CSE | 72 |
| Interdiction | 62 |
| Information du CSE | 41 |
| Preuve ou justification | 40 |
| Organisation du travail | 28 |
| Autorisation administrative | 25 |
| Négociation | 9 |
| Entretien avec le salarié | 8 |

Par partie : santé et sécurité 806, relations individuelles 496, relations collectives 408, emploi 305,
durée du travail et salaire 288, formation 281, professions particulières 167, contrôle 96.

Seuils d'effectif cités dans les articles concernés : 50 salariés (76 obligations), 300 (25), 11 (23), 250 (4), 1 000 (4).

### Fiabilité mesurée

Validation manuelle sur un échantillon aléatoire de 50 articles jamais utilisé pour régler les règles :

| Mesure | Résultat |
|---|---|
| Précision (obligations extraites qui en sont vraiment) | 75 % (6 sur 8) |
| Rappel, obligations administratives et de procédure | 75 % (6 sur 8) |
| Rappel, y compris normes techniques de sécurité | 50 % (6 sur 12) |

Échantillon petit : l'incertitude est de l'ordre de ± 15 points. Les ratés sont surtout des normes techniques
rédigées comme des descriptions (« les échelles sont attachées… »), peu pertinentes pour la charge administrative.
Un tiers des obligations extraites restent non classées. Deux échantillons précédents (40 et 60 articles)
ont servi à corriger les règles : ils ne comptent pas dans la mesure.

## 2. Coût administratif (méthode Standard Cost Model, version calibrée)

coût = volume annuel × (temps × 44,3 €/h + coût externe) × (1 − part que l'entreprise ferait de toute façon)

Ce qui est mesuré :
- **Volumes** — DARES mouvements de main-d'œuvre 2025 (25,9 M d'embauches dont 21,9 M en CDD ; 898 000 licenciements pour
  motif personnel ; 518 000 ruptures conventionnelles ; 76 000 licenciements économiques) ; Eurostat (1,45 M d'entreprises
  employeuses ; 31 400 de 50 salariés et plus ; 18,5 M de salariés).
- **Coût horaire** — 44,3 €/h en 2025 (Eurostat, `donnees/eurostat/lc_lci_lev_FR_cout-horaire-travail.json`).
- **Fréquences légales** — réunions du CSE (L2315-21, L2315-28), heures de délégation (R2314-1).

Ce qui est calibré sur des sources publiques (colonne `source_hypotheses` du fichier d'hypothèses) :
- **Document unique** — mesure Standard Cost Model de l'UE (consortium Capgemini, Deloitte, Ramboll, avis du groupe de haut
  niveau 2009, `etudes/methodes-evaluation/ue-2009-hlg-...`) : 2,9 Md€ pour l'UE, ramenés à la France (12 % des employeurs
  de l'UE, Eurostat) et à l'inflation, soit environ 450 M€ ; 46 % de coûts de conseil. La Commission (DG Emploi) avait contesté
  ces mesures : à prendre comme ordre de grandeur.
- **Bulletin de paie** — tarifs de marché des cabinets : 20 à 35 € HT par bulletin pour les très petites entreprises
  (sources commerciales, indicatives).

Ce qui reste une hypothèse : les temps des procédures de rupture, des contrats, des entretiens, des affichages.
Aucun barème public fiable n'a été trouvé.

**Total des 23 processus : 1,2 à 7,3 milliards d'euros par an.**

Contrôle de cohérence : selon l'enquête du CJD (536 dirigeants, avril 2025, `etudes/methodes-evaluation/cjd-2025-...`), plus
de la moitié des dirigeants passent 1 à 5 heures par semaine en tâches administratives, toutes réglementations confondues.
Appliqué à 1,45 M d'employeurs, cela donne 3 à 15 Md€ par an pour l'ensemble des formalités (fiscales comprises).
Le sous-total du droit du travail tient dans cet ordre de grandeur.

| Rang | Processus | Bas | Central | Haut | Base légale | Source des temps |
|---|---|---|---|---|---|---|
| 1 | Bulletin de paie, 10 salariés et plus | 149 | 443 | 1 322 | L3243-2, R3243-1 | hypothèse |
| 2 | Bulletin de paie, 1 à 9 salariés | 147 | 316 | 682 | L3243-2, R3243-1 | tarifs de marché |
| 3 | Document unique, moins de 11 salariés | 122 | 280 | 641 | L4121-3, R4121-2 | mesure UE |
| 4 | Licenciement pour motif personnel | 84 | 240 | 690 | L1232-2 à L1232-6 | hypothèse |
| 5 | Décompte de la durée du travail | 51 | 186 | 673 | L3171-2, D3171-8 | hypothèse |
| 6 | Document unique, 11 salariés et plus | 73 | 178 | 435 | R4121-2 | mesure UE |
| 7 | Documents de fin de contrat | 80 | 158 | 310 | L1234-19, L1234-20, R1234-9 | hypothèse |
| 8 | CSE, 11 à 49 salariés | 71 | 156 | 343 | L2311-2, L2315-21 | fréquence légale |
| 9 | Visite d'information et de prévention | 72 | 132 | 241 | R4624-10 | hypothèse |
| 10 | CSE, 50 à 299 salariés | 54 | 128 | 305 | L2312-17, L2315-28 | fréquence légale |
| 11 | Entretien de parcours professionnel | 55 | 127 | 292 | L6315-1 | hypothèse |
| 12 | Contrat CDD écrit | 39 | 103 | 272 | L1242-12, L1242-13 | hypothèse |
| 13 | Licenciement économique hors PSE | 40 | 92 | 212 | L1233-3 et suivants | hypothèse |
| 14 | Rupture conventionnelle | 28 | 77 | 216 | L1237-11 à L1237-16 | hypothèse |
| 15 | CSE, 300 salariés et plus | 31 | 76 | 185 | L2312-17, L2315-28 | fréquence légale |
| 16 | Affichages obligatoires | 29 | 61 | 128 | L3171-1 et autres | hypothèse |
| 17 | Déclaration préalable à l'embauche | 28 | 56 | 115 | L1221-10 | hypothèse |
| 18 | Négociations obligatoires | 10 | 32 | 103 | L2242-1 | hypothèse |
| 19 | Registre unique du personnel | 6 | 16 | 46 | L1221-13 | hypothèse |
| 20 | Obligation d'emploi des travailleurs handicapés | 7 | 14 | 30 | L5212-2 | hypothèse |
| 21 | Index égalité | 4 | 13 | 38 | L1142-8 | hypothèse |
| 22 | Document d'information (CDI) | 4 | 10 | 26 | L1221-5-1 | hypothèse |
| 23 | Règlement intérieur | 1 | 3 | 14 | L1311-2, L1321-4 | hypothèse |

Montants en millions d'euros par an.

### Heures de délégation du CSE (chiffrées à part)

Le temps payé aux élus du CSE pour exercer leur mandat (R2314-1) n'est pas une charge administrative au sens strict :
c'est un droit, qui finance la représentation des salariés. Mais c'est un coût réel pour l'employeur, fixé par la loi.

| Taille | Heures mensuelles légales (total des élus) | Coût annuel France |
|---|---|---|
| 10 à 19 salariés | 10 h | 110 à 550 M€ |
| 20 à 49 salariés | 10 à 20 h | 57 à 571 M€ |
| 50 à 249 salariés | 72 à 126 h | 411 à 1 692 M€ |
| 250 salariés et plus | 242 h et plus | 336 à 1 633 M€ |
| **Total** | | **0,9 à 4,4 Md€** |

Fourchette basse : CSE présent dans 40 % des entreprises de 11 à 49 salariés et 85 % au-delà, heures utilisées à moitié.
Fourchette haute : CSE partout, heures utilisées en totalité. Les taux de présence sont des hypothèses (à vérifier dans
l'enquête REPONSE de la DARES).

### Ce qui est robuste

Recalculé avec toutes les hypothèses basses, puis toutes hautes :
- **En tête quel que soit le scénario** : bulletin de paie, document unique, licenciement pour motif personnel, CSE.
- **En bas quel que soit le scénario** : règlement intérieur, document d'information CDI, index égalité, obligation d'emploi
  des travailleurs handicapés, registre du personnel.

**Conséquence pour le projet** : plusieurs simplifications souvent citées (règlement intérieur, registre, index égalité)
pèsent peu au total. Les gros postes sont liés au volume (222 M de bulletins, 26 M de fins de contrat), à l'évaluation
des risques et aux instances représentatives.

### Le coût des seuils, par entreprise

| Seuil | Charge administrative | Heures de délégation (si utilisées en totalité) | Ce qui se déclenche |
|---|---|---|---|
| 11 salariés | +14 à +55 h ; +740 à +4 000 € par an | +120 h ; +5 300 € par an | CSE, mise à jour annuelle du document unique |
| 50 salariés | +49 à +247 h ; +2 200 à +14 800 € par an | +624 h ; +27 600 € par an | CSE complet, BDESE, index, règlement intérieur, négociations |

Au passage de 49 à 50 salariés, les heures de délégation passent de 20 à 72 heures par mois (R2314-1). C'est le
principal surcoût en temps du seuil, devant la charge administrative. S'y ajoutent des coûts financiers non comptés :
participation aux résultats (L3322-2), subvention de fonctionnement du CSE (0,20 % de la masse salariale, L2315-61),
plan de sauvegarde de l'emploi dès 10 licenciements (L1233-61). C'est cohérent avec l'accumulation d'entreprises juste
sous 50 salariés observée par Garicano, Lelarge et Van Reenen (`etudes/marche-du-travail/`).

## 3. Limites

1. **Une partie des temps reste hypothétique.** Mesurés ou calibrés : volumes, coût horaire, fréquences légales, document unique, paie des très petites entreprises. Hypothèses : procédures de rupture, contrats, entretiens, affichages. D'où la fourchette ×6.
2. **Périmètre partiel.** 23 processus seulement. Non chiffrés : plans de sauvegarde de l'emploi, normes techniques de
   santé-sécurité (partie 4 réglementaire, 2 288 articles), formation professionnelle, travail temporaire, détachement,
   professions particulières.
3. **Coûts financiers exclus** (cotisations, subventions CSE, participation, contribution handicap) : la méthode ne mesure
   que la charge administrative.
4. **Contentieux exclu.** 118 000 affaires nouvelles aux prud'hommes en 2024 (`donnees/autres/justice-rsj2024`) : coût
   d'incertitude juridique à chiffrer séparément.
5. **Bulletin de paie mixte.** Sa complexité vient surtout des cotisations (Code de la sécurité sociale), pas du Code du travail.
6. **Extraction imparfaite.** Précision et rappel autour de 75 % pour les obligations administratives.

## 4. Prochaines étapes proposées

1. **Calibrer les temps restants** (licenciement, décompte du temps de travail, fin de contrat) : aucun barème public fiable ;
   une petite enquête (15 à 20 cabinets de paie ou avocats) reste la seule voie.
2. **Chiffrer le contentieux** et les coûts financiers des seuils, pour avoir le coût complet du passage à 50.
3. **Passer aux preuves** : pour chaque gros poste, que dit la littérature sur l'effet d'un allègement sur l'emploi,
   la productivité et le bien-être (étape 3 du workflow, sur le corpus déjà rassemblé).
