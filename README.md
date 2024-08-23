# Test KAMGOKO

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

# Architecture de l'application

## Architecture Matérielle

1. **Serveur Web pour le Front-End et le Back-End**

2. **Serveur de Base de Données**

3. **Serveur de Stockage**


## Architecture Logicielle

1. **Front-End** (Vue.js)

2. **Back-End** (PHP API REST)

3. **Base de Données** (MySQL) 


## Schéma d'Architecture

```sql
                  +------------------+
                  |     Utilisateur  |
                  +--------+---------+
                           |
                           |
                  +--------v---------+
                  |   CDN/Serveur    |
                  |  Front-End (Vue.js) |
                  +--------+---------+
                           |
                           |
                  +--------v---------+
                  |  Serveur Web     |
                  |   (Nginx/Apache) |
                  +--------+---------+
                           |
                           |
                  +--------v---------+
                  |  API REST (PHP)  |
                  |                  |
                  +--------+---------+
                           |
                           |
                  +--------v---------+
                  | Serveur de Base  |
                  |   de Données     |
                  |       (MySQL)    | 
                  +------------------+
                           |
                           |
                  +--------v---------+
                  | Serveur de       |
                  |  Stockage        |
                  |  (AWS S3/Google  |
                  |   Cloud Storage) |
                  +------------------+

```


## Déploiement

1. **Tests**
   - Tests unitaires et d'intégration pour le back-end.
   - Tests de compatibilité pour le front-end.

2. **Déploiement**
   - Déploiement du front-end sur un CDN ou serveur web.
   - Déploiement du back-end sur un serveur cloud ou hébergement PHP.
   - Configuration de la base de données et du stockage.

3. **Surveillance et Maintenance**
   - Outils de surveillance pour performances et erreurs.
   - Sauvegardes régulières pour base de données et fichiers.



