<template>
  <div class="p-4 text-start">
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary py-2 rounded rounded-3 mb-2" type="submit">Enregistrer un acte de
        mariage</button>
    </div>
    <div class="col-12 mb-2 d-flex justify-content-start">
      <div class="col-4 d-flex align-items-center">
        <span class="material-symbols-outlined mx-2">
          search
        </span>
        <input type="search" class="form-control" @input="sortMariageWithSearch($event.target)"
          placeholder="Rechercher...">
      </div>
      <!-- <div class="col-3">
        <select name="filtrer" id="filter" class="form-select" @click="sortActeMariageWithCategorie($event.target)">
          <option selected disabled> Filtrer par catégorie </option>
          <option value="tout"> Tout </option>
          <option value="conge"> Congé </option>
          <option value="permission"> Permission </option>
        </select>
      </div>
      <div class="col-3">
        <select name="filtrer" id="filter" class="form-select" @click="sortActeMariageWithStatut($event.target)">
          <option selected disabled> Filtrer par statut </option>
          <option value="tout"> Tout </option>
          <option value="acceptée"> Acceptée </option>
          <option value="refusée"> Refusée </option>
          <option value="traitement"> En cours de traitement </option>
        </select>
      </div> -->
    </div>
    <div class="card rounded rounded-4 px-2 pt-4 py-1 overflow-auto">
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col"> Date de mariage </th>
            <th scope="col"> Epoux</th>
            <th scope="col"> Epouse</th>
            <th scope="col"> Temoin 1 </th>
            <th scope="col"> Temoin 2 </th>
            <th scope="col"> Actions </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="acteMariage in filterActeMariage" :key="acteMariage.id">
            <td> {{ acteMariage.date_mariage }} </td>
            <td> {{ acteMariage.nom_epoux + " " + acteMariage.prenom_epoux }} </td>
            <td> {{ acteMariage.nom_epouse + " " + acteMariage.prenom_epouse }} </td>
            <td> {{ acteMariage.nom_temoin1 + " " + acteMariage.prenom_temoin1 }} </td>
            <td> {{ acteMariage.nom_temoin2 + " " + acteMariage.prenom_temoin2 }} </td>
            <td>
              <div class="d-flex justify-content-center">
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger"
                  @click="updateActeMariage(acteMariage.id)" style="height: 40px; width: 40px;">
                  delete
                </span>
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-success"
                  @click="deleteActeMariage(acteMariage.id)" style="height: 40px; width: 40px;">
                  update
                </span>
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-primary"
                  @click="deleteActeMariage(acteMariage.id)" style="height: 40px; width: 40px;">
                  visibility
                </span>
              </div>
            </td>
            <!-- v-if="acteMariage.statut === 'En cours de traitement' && admin" -->
            <!-- <td v-else> </td> -->
          </tr>
        </tbody>
      </table>
      <div v-if="filterActeMariage.length == 0" class="fs-5 d-flex justify-content-center">
        La liste est vide
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
// import { useRouter } from 'vue-router';

// const router = useRouter()

let acteMariage = [
  { id: 1, date_mariage: '2024-08-01', nom_officier: 'Dupont', prenom_officier: 'Jean', fonction_officier: 'Maire', rpi_epoux: 1, nom_epoux: 'Martin', prenom_epoux: 'Pierre', nom_epouse: 'Durand', prenom_epouse: 'Julie', date_naissance_epoux: '1990-05-10', lieu_naissance_epoux: 'Paris', nom_pere_epoux: 'Martin', nom_mere_epoux: 'Lefevre', rpi_temoin1: 2, nom_temoin1: 'Bernard', prenom_temoin1: 'Jacques', rpi_temoin2: 3, nom_temoin2: 'Durand', prenom_temoin2: 'Sophie', regime_matrimoniale: 'Communauté de biens', domicile_epoux: 'Paris', domicile_epouse: 'Paris', date_naissance_epouse: '1992-07-15', lieu_naissance_epouse: 'Lyon', nom_pere_epouse: 'Durand', nom_mere_epouse: 'Lefevre', fichier_signature_epoux: 'signature_epoux_1.png', fichier_signature_epouse: 'signature_epouse_1.png', fichier_signature_temoin1: 'signature_temoin1_1.png', fichier_signature_temoin2: 'signature_temoin2_1.png' },
  { id: 2, date_mariage: '2024-08-02', nom_officier: 'Martin', prenom_officier: 'Sophie', fonction_officier: 'Adjoint', rpi_epoux: 2, nom_epoux: 'Bernard', prenom_epoux: 'Jacques', nom_epouse: 'Moreau', prenom_epouse: 'Lucie', date_naissance_epoux: '1988-03-20', lieu_naissance_epoux: 'Lyon', nom_pere_epoux: 'Bernard', nom_mere_epoux: 'Lefevre', rpi_temoin1: 4, nom_temoin1: 'Lefevre', prenom_temoin1: 'Michel', rpi_temoin2: 5, nom_temoin2: 'Moreau', prenom_temoin2: 'Alice', regime_matrimoniale: 'Séparation de biens', domicile_epoux: 'Lyon', domicile_epouse: 'Lyon', date_naissance_epouse: '1990-09-25', lieu_naissance_epouse: 'Bordeaux', nom_pere_epouse: 'Durand', nom_mere_epouse: 'Petit', fichier_signature_epoux: 'signature_epoux_2.png', fichier_signature_epouse: 'signature_epouse_2.png', fichier_signature_temoin1: 'signature_temoin1_2.png', fichier_signature_temoin2: 'signature_temoin2_2.png' },
  { id: 3, date_mariage: '2024-08-03', nom_officier: 'Bernard', prenom_officier: 'Michel', fonction_officier: 'Maire', rpi_epoux: 3, nom_epoux: 'Durand', prenom_epoux: 'Laurent', nom_epouse: 'Lefevre', prenom_epouse: 'Amélie', date_naissance_epoux: '1991-12-15', lieu_naissance_epoux: 'Marseille', nom_pere_epoux: 'Durand', nom_mere_epoux: 'Petit', rpi_temoin1: 6, nom_temoin1: 'Petit', prenom_temoin1: 'Pierre', rpi_temoin2: 7, nom_temoin2: 'Martin', prenom_temoin2: 'Paul', regime_matrimoniale: 'Communauté universelle', domicile_epoux: 'Marseille', domicile_epouse: 'Marseille', date_naissance_epouse: '1993-02-28', lieu_naissance_epouse: 'Lille', nom_pere_epouse: 'Lefevre', nom_mere_epouse: 'Moreau', fichier_signature_epoux: 'signature_epoux_3.png', fichier_signature_epouse: 'signature_epouse_3.png', fichier_signature_temoin1: 'signature_temoin1_3.png', fichier_signature_temoin2: 'signature_temoin2_3.png' },
  { id: 4, date_mariage: '2024-08-04', nom_officier: 'Durand', prenom_officier: 'Laura', fonction_officier: 'Adjoint', rpi_epoux: 4, nom_epoux: 'Petit', prenom_epoux: 'Antoine', nom_epouse: 'Simon', prenom_epouse: 'Élodie', date_naissance_epoux: '1989-06-14', lieu_naissance_epoux: 'Toulouse', nom_pere_epoux: 'Petit', nom_mere_epoux: 'Bernard', rpi_temoin1: 8, nom_temoin1: 'Roux', prenom_temoin1: 'Luc', rpi_temoin2: 9, nom_temoin2: 'Simon', prenom_temoin2: 'Pierre', regime_matrimoniale: 'Participation aux acquêts', domicile_epoux: 'Toulouse', domicile_epouse: 'Toulouse', date_naissance_epouse: '1991-11-22', lieu_naissance_epouse: 'Nice', nom_pere_epouse: 'Durand', nom_mere_epouse: 'Roux', fichier_signature_epoux: 'signature_epoux_4.png', fichier_signature_epouse: 'signature_epouse_4.png', fichier_signature_temoin1: 'signature_temoin1_4.png', fichier_signature_temoin2: 'signature_temoin2_4.png' },
  { id: 5, date_mariage: '2024-08-05', nom_officier: 'Moreau', prenom_officier: 'Luc', fonction_officier: 'Maire', rpi_epoux: 5, nom_epoux: 'Roux', prenom_epoux: 'David', nom_epouse: 'Petit', prenom_epouse: 'Clara', date_naissance_epoux: '1992-01-30', lieu_naissance_epoux: 'Bordeaux', nom_pere_epoux: 'Roux', nom_mere_epoux: 'Bernard', rpi_temoin1: 10, nom_temoin1: 'Petit', prenom_temoin1: 'Émile', rpi_temoin2: 11, nom_temoin2: 'Durand', prenom_temoin2: 'Gabriel', regime_matrimoniale: 'Séparation de biens', domicile_epoux: 'Bordeaux', domicile_epouse: 'Bordeaux', date_naissance_epouse: '1993-04-18', lieu_naissance_epouse: 'Strasbourg', nom_pere_epouse: 'Simon', nom_mere_epouse: 'Lefevre', fichier_signature_epoux: 'signature_epoux_5.png', fichier_signature_epouse: 'signature_epouse_5.png', fichier_signature_temoin1: 'signature_temoin1_5.png', fichier_signature_temoin2: 'signature_temoin2_5.png' },
  { id: 6, date_mariage: '2024-08-06', nom_officier: 'Lefevre', prenom_officier: 'Marie', fonction_officier: 'Adjoint', rpi_epoux: 6, nom_epoux: 'Martin', prenom_epoux: 'Nicolas', nom_epouse: 'Lefevre', prenom_epouse: 'Camille', date_naissance_epoux: '1991-09-07', lieu_naissance_epoux: 'Nantes', nom_pere_epoux: 'Martin', nom_mere_epoux: 'Roux', rpi_temoin1: 12, nom_temoin1: 'Bernard', prenom_temoin1: 'Philippe', rpi_temoin2: 13, nom_temoin2: 'Lefevre', prenom_temoin2: 'Laurent', regime_matrimoniale: 'Communauté de biens', domicile_epoux: 'Nantes', domicile_epouse: 'Nantes', date_naissance_epouse: '1993-06-10', lieu_naissance_epouse: 'Lyon', nom_pere_epouse: 'Petit', nom_mere_epouse: 'Durand', fichier_signature_epoux: 'signature_epoux_6.png', fichier_signature_epouse: 'signature_epouse_6.png', fichier_signature_temoin1: 'signature_temoin1_6.png', fichier_signature_temoin2: 'signature_temoin2_6.png' },
  { id: 7, date_mariage: '2024-08-07', nom_officier: 'Roux', prenom_officier: 'Pierre', fonction_officier: 'Maire', rpi_epoux: 7, nom_epoux: 'Petit', prenom_epoux: 'Vincent', nom_epouse: 'Lefevre', prenom_epouse: 'Sophie', date_naissance_epoux: '1988-10-22', lieu_naissance_epoux: 'Nice', nom_pere_epoux: 'Petit', nom_mere_epoux: 'Durand', rpi_temoin1: 14, nom_temoin1: 'Simon', prenom_temoin1: 'Jean', rpi_temoin2: 15, nom_temoin2: 'Petit', prenom_temoin2: 'Laurent', regime_matrimoniale: 'Communauté universelle', domicile_epoux: 'Nice', domicile_epouse: 'Nice', date_naissance_epouse: '1990-12-04', lieu_naissance_epouse: 'Lille', nom_pere_epouse: 'Roux', nom_mere_epouse: 'Bernard', fichier_signature_epoux: 'signature_epoux_7.png', fichier_signature_epouse: 'signature_epouse_7.png', fichier_signature_temoin1: 'signature_temoin1_7.png', fichier_signature_temoin2: 'signature_temoin2_7.png' },
  { id: 8, date_mariage: '2024-08-08', nom_officier: 'Simon', prenom_officier: 'Louis', fonction_officier: 'Adjoint', rpi_epoux: 8, nom_epoux: 'Bernard', prenom_epoux: 'Lucas', nom_epouse: 'Roux', prenom_epouse: 'Émilie', date_naissance_epoux: '1993-07-13', lieu_naissance_epoux: 'Strasbourg', nom_pere_epoux: 'Simon', nom_mere_epoux: 'Petit', rpi_temoin1: 16, nom_temoin1: 'Durand', prenom_temoin1: 'Pierre', rpi_temoin2: 17, nom_temoin2: 'Lefevre', prenom_temoin2: 'Amélie', regime_matrimoniale: 'Participation aux acquêts', domicile_epoux: 'Strasbourg', domicile_epouse: 'Strasbourg', date_naissance_epouse: '1995-02-09', lieu_naissance_epouse: 'Marseille', nom_pere_epouse: 'Petit', nom_mere_epouse: 'Bernard', fichier_signature_epoux: 'signature_epoux_8.png', fichier_signature_epouse: 'signature_epouse_8.png', fichier_signature_temoin1: 'signature_temoin1_8.png', fichier_signature_temoin2: 'signature_temoin2_8.png' },
  { id: 9, date_mariage: '2024-08-09', nom_officier: 'Petit', prenom_officier: 'Clément', fonction_officier: 'Maire', rpi_epoux: 9, nom_epoux: 'Martin', prenom_epoux: 'Benoît', nom_epouse: 'Lefevre', prenom_epouse: 'Claire', date_naissance_epoux: '1992-04-11', lieu_naissance_epoux: 'Toulouse', nom_pere_epoux: 'Durand', nom_mere_epoux: 'Petit', rpi_temoin1: 18, nom_temoin1: 'Petit', prenom_temoin1: 'Jean', rpi_temoin2: 19, nom_temoin2: 'Roux', prenom_temoin2: 'Louis', regime_matrimoniale: 'Communauté de biens', domicile_epoux: 'Toulouse', domicile_epouse: 'Toulouse', date_naissance_epouse: '1993-08-21', lieu_naissance_epouse: 'Nantes', nom_pere_epouse: 'Roux', nom_mere_epouse: 'Bernard', fichier_signature_epoux: 'signature_epoux_9.png', fichier_signature_epouse: 'signature_epouse_9.png', fichier_signature_temoin1: 'signature_temoin1_9.png', fichier_signature_temoin2: 'signature_temoin2_9.png' },
  { id: 10, date_mariage: '2024-08-10', nom_officier: 'Lefevre', prenom_officier: 'Marie', fonction_officier: 'Adjoint', rpi_epoux: 10, nom_epoux: 'Durand', prenom_epoux: 'Alexandre', nom_epouse: 'Roux', prenom_epouse: 'Marion', date_naissance_epoux: '1994-03-18', lieu_naissance_epoux: 'Lyon', nom_pere_epoux: 'Petit', nom_mere_epoux: 'Lefevre', rpi_temoin1: 20, nom_temoin1: 'Simon', prenom_temoin1: 'Charles', rpi_temoin2: 21, nom_temoin2: 'Durand', prenom_temoin2: 'Paul', regime_matrimoniale: 'Séparation de biens', domicile_epoux: 'Lyon', domicile_epouse: 'Lyon', date_naissance_epouse: '1995-09-16', lieu_naissance_epouse: 'Lille', nom_pere_epouse: 'Bernard', nom_mere_epouse: 'Moreau', fichier_signature_epoux: 'signature_epoux_10.png', fichier_signature_epouse: 'signature_epouse_10.png', fichier_signature_temoin1: 'signature_temoin1_10.png', fichier_signature_temoin2: 'signature_temoin2_10.png' }
];


let filterActeMariage = ref(acteMariage);
const admin = ref(window.localStorage.getItem("adminOnline"));
// let filterActeMariageToRefused = ref();

// ------------------------------------------------- DELETE --------------------------------------------
function deleteActeMariage(id: number) {

  Swal.fire({
    title: "Voulez-vraiment suprimer cette acteMariage?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Supprimer",
    cancelButtonText: "Annuler"
  }).then(async (result) => {
    // if (result.isConfirmed) {

    // }
  });
}

// -------------------------------------------------- UPDATE --------------------------------
const updateActeMariage = (id: any) => {

// 
}

// -------------------------------------------------- GET ---------------------------------------------

function sortMariageWithSearch(searchActeMariage: any) {
  if ((searchActeMariage.value as string).trim() === "") {
    filterActeMariage.value = acteMariage
  } else {
    filterActeMariage.value = acteMariage.filter(document =>
      (document.nom_epoux.toLowerCase()).includes(((searchActeMariage as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.prenom_epoux.toLowerCase()).includes(((searchActeMariage as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.nom_temoin1.toLowerCase()).includes(((searchActeMariage as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.prenom_temoin1.toLowerCase()).includes(((searchActeMariage as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.nom_epouse.toLowerCase()).includes(((searchActeMariage as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.prenom_epouse.toLowerCase()).includes(((searchActeMariage as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.date_mariage.toLowerCase()).includes(((searchActeMariage as HTMLInputElement).value as string).trim().toLowerCase())
  )
  }
}


</script>

<style></style>
