# Le Code du travail, annoté par les preuves

Que faudrait-il changer dans le droit du travail français pour avoir plus d'emploi, plus de croissance et plus
de bien-être ? Cet exercice part du texte du Code, chiffre ce qu'il coûte, confronte chaque idée de réforme aux études
et aux données, et rédige des propositions article par article, avec leurs perdants.

**Page de synthèse** : `06-site/index.html` (site statique, déployable tel quel sur Vercel).

> Exercice de pensée indépendant (octobre 2026), réalisé avec l'assistance d'une IA (Claude) à partir de sources
> publiques. Ce n'est ni un avis juridique ni une étude relue par des pairs.

## Principaux résultats

| Constat | Chiffre | Où le vérifier |
|---|---|---|
| Le chômage pèse environ 5 fois plus que le CDD sur la satisfaction de vie, à revenu égal | −0,74 contre −0,15 point sur 10 | `03-analyses/ess-resultats.md` |
| Coût administratif des 23 principales démarches du Code du travail | 1,2 à 7,3 Md€ par an | `03-analyses/premiere-passe.md` |
| Le seuil de 50 salariés agit comme une taxe implicite sur le travail | ≈ 1,3 % (Garicano et al.) | `03-analyses/preuves-par-levier.md` |
| La protection contre le licenciement n'a pas d'effet net démontré sur l'emploi, mais freine la productivité | revue de littérature | `03-analyses/preuves-par-levier.md` |
| Cinq réformes précises du Code du travail | 100 à 550 M€ par an | `04-propositions/` |

## Structure

```
00-pilotage/        Objectifs fixés avant l'analyse, liste des sources à télécharger
02-extractions/     Code du travail et Code de la sécurité sociale découpés article par article ;
                    inventaire des 2 847 obligations extraites (obligations.csv)
03-analyses/        Inventaire et coût (Standard Cost Model), preuves par levier, analyse ESS,
                    assurance chômage
04-propositions/    Une fiche par réforme : texte actuel, texte proposé, gain, perdants, contre-expertise
05-synthese/        Première page de synthèse
06-site/            Site pédagogique (index.html, image d'aperçu, données téléchargeables)
scripts/            Extraction, téléchargement, modèle de coût, analyse ESS
```

## Ce qui n'est pas dans ce dépôt, et pourquoi

Le dossier `01-sources/` (environ 1,3 Go) n'est pas publié :

- les **études** en PDF sont sous droit d'auteur ;
- les **microdonnées de l'European Social Survey** ne peuvent pas être redistribuées (inscription gratuite sur
  [ess.sikt.no](https://ess.sikt.no)) ;
- les séries Eurostat, OCDE, INSEE et DARES sont publiques mais volumineuses.

La liste complète, avec l'adresse de chaque document, est dans `00-pilotage/telechargements.md`.
Les scripts de `scripts/` permettent de retélécharger la plupart des données publiques et de refaire les calculs.

## Refaire les calculs

Python 3.12 et [uv](https://docs.astral.sh/uv/) :

```
# découper le Code du travail en articles (PDF Légifrance placé dans 01-sources/textes/droit-francais/)
uv run --with pypdf python scripts/extract.py <code.pdf> 02-extractions/code-du-travail-texte.txt
python scripts/parse.py 02-extractions/code-du-travail-texte.txt 02-extractions/code-du-travail-articles.json

# extraire les obligations
python scripts/extract_obligations.py 02-extractions/code-du-travail-articles.json 02-extractions/obligations.csv

# modèle de coût (hypothèses modifiables dans le CSV)
python scripts/cout_scm.py 03-analyses/scm-hypotheses.csv 03-analyses/scm-resultats.csv

# analyse ESS (fichiers .sav téléchargés depuis ess.sikt.no)
uv run --with pyreadstat --with pandas --with statsmodels python scripts/ess_analyse.py \
  ESS10e03_3.sav ESS11e04_2.sav protection-emploi-epl.csv 03-analyses/ess-resultats-bruts.md
```

## Limites

- Une partie des temps unitaires du modèle de coût est estimée, pas mesurée.
- L'analyse ESS montre des associations, pas des effets causaux.
- Les études ont été lues de façon ciblée (résumés, conclusions, passages clés).
- Les textes proposés doivent être relus par un juriste en droit du travail.

Les contributions qui contestent un chiffre, une hypothèse ou une source sont bienvenues : ouvrez une issue en citant
le fichier concerné.
