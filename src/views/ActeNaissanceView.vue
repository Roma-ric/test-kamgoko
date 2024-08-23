<template>
  <div class="p-4 text-start">
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary py-2 rounded rounded-3 mb-2" type="submit">Enregistrer un acte de
        naissance</button>
    </div>
    <div class="col-12 mb-2 d-flex justify-content-start">
      <div class="col-4 d-flex align-items-center">
        <span class="material-symbols-outlined mx-2">
          search
        </span>
        <input type="search" class="form-control" @input="sortNaissanceWithSearch($event.target)"
          placeholder="Rechercher...">
      </div>
      <!-- <div class="col-3">
        <select name="filtrer" id="filter" class="form-select" @click="sortActeNaissanceWithCategorie($event.target)">
          <option selected disabled> Filtrer par catégorie </option>
          <option value="tout"> Tout </option>
          <option value="conge"> Congé </option>
          <option value="permission"> Permission </option>
        </select>
      </div>
      <div class="col-3">
        <select name="filtrer" id="filter" class="form-select" @click="sortActeNaissanceWithStatut($event.target)">
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
            <th scope="col"> Nom </th>
            <th scope="col"> Prenoms(s)</th>
            <th scope="col"> Date de naissance </th>
            <th scope="col"> Lieu de naissance </th>
            <th scope="col"> Actions </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="acteNaissance in filterActeNaissance" :key="acteNaissance.id">
            <td> {{ acteNaissance.nom_pere }} </td>
            <td> {{ acteNaissance.prenom_enfant }} </td>
            <td> {{ acteNaissance.date_naissance_enfant }} </td>
            <td> {{ acteNaissance.lieu_naissance_enfant }} </td>
            <td>
              <div class="d-flex justify-content-center">
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger"
                  @click="updateActeNaissance(acteNaissance.id)" style="height: 40px; width: 40px;">
                  delete
                </span>
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-success"
                  @click="deleteActeNaissance(acteNaissance.id)" style="height: 40px; width: 40px;">
                  update
                </span>
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-primary"
                  @click="deleteActeNaissance(acteNaissance.id)" style="height: 40px; width: 40px;">
                  visibility
                </span>
              </div>
            </td>
            <!-- v-if="acteNaissance.statut === 'En cours de traitement' && admin" -->
            <!-- <td v-else> </td> -->
          </tr>
        </tbody>
      </table>
      <div v-if="filterActeNaissance.length == 0" class="fs-5 d-flex justify-content-center">
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

let acteNaissance = [
  { id: 1, nom_officier: 'Dupont', prenom_officier: 'Jean', fonction_officier: 'Maire', prenom_enfant: 'Lucas', sexe_enfant: 'M', nom_pere: 'Martin', age_pere: 32, profession_pere: 'Ingénieur', domicile_pere: 'Paris', nom_mere: 'Durand', age_mere: 28, profession_mere: 'Infirmière', domicile_mere: 'Paris', declarant: 'Dupont', date_naissance_enfant: '2024-08-01', lieu_naissance_enfant: 'Paris', date_declaration: '2024-08-02' },
  { id: 2, nom_officier: 'Martin', prenom_officier: 'Sophie', fonction_officier: 'Adjoint', prenom_enfant: 'Emma', sexe_enfant: 'F', nom_pere: 'Bernard', age_pere: 34, profession_pere: 'Architecte', domicile_pere: 'Lyon', nom_mere: 'Moreau', age_mere: 30, profession_mere: 'Avocate', domicile_mere: 'Lyon', declarant: 'Martin', date_naissance_enfant: '2024-08-02', lieu_naissance_enfant: 'Lyon', date_declaration: '2024-08-03' },
  { id: 3, nom_officier: 'Bernard', prenom_officier: 'Michel', fonction_officier: 'Maire', prenom_enfant: 'Léo', sexe_enfant: 'M', nom_pere: 'Durand', age_pere: 29, profession_pere: 'Médecin', domicile_pere: 'Marseille', nom_mere: 'Lefevre', age_mere: 27, profession_mere: 'Enseignante', domicile_mere: 'Marseille', declarant: 'Bernard', date_naissance_enfant: '2024-08-03', lieu_naissance_enfant: 'Marseille', date_declaration: '2024-08-04' },
  { id: 4, nom_officier: 'Durand', prenom_officier: 'Laura', fonction_officier: 'Adjoint', prenom_enfant: 'Chloé', sexe_enfant: 'F', nom_pere: 'Moreau', age_pere: 31, profession_pere: 'Avocat', domicile_pere: 'Bordeaux', nom_mere: 'Simon', age_mere: 29, profession_mere: 'Pharmacienne', domicile_mere: 'Bordeaux', declarant: 'Durand', date_naissance_enfant: '2024-08-04', lieu_naissance_enfant: 'Bordeaux', date_declaration: '2024-08-05' },
  { id: 5, nom_officier: 'Moreau', prenom_officier: 'Luc', fonction_officier: 'Maire', prenom_enfant: 'Noah', sexe_enfant: 'M', nom_pere: 'Lefevre', age_pere: 33, profession_pere: 'Ingénieur', domicile_pere: 'Nice', nom_mere: 'Roux', age_mere: 29, profession_mere: 'Comptable', domicile_mere: 'Nice', declarant: 'Moreau', date_naissance_enfant: '2024-08-05', lieu_naissance_enfant: 'Nice', date_declaration: '2024-08-06' },
  { id: 6, nom_officier: 'Lefevre', prenom_officier: 'Marie', fonction_officier: 'Adjoint', prenom_enfant: 'Lina', sexe_enfant: 'F', nom_pere: 'Roux', age_pere: 32, profession_pere: 'Médecin', domicile_pere: 'Toulouse', nom_mere: 'Simon', age_mere: 28, profession_mere: 'Architecte', domicile_mere: 'Toulouse', declarant: 'Lefevre', date_naissance_enfant: '2024-08-06', lieu_naissance_enfant: 'Toulouse', date_declaration: '2024-08-07' },
  { id: 7, nom_officier: 'Roux', prenom_officier: 'Pierre', fonction_officier: 'Maire', prenom_enfant: 'Mia', sexe_enfant: 'F', nom_pere: 'Simon', age_pere: 34, profession_pere: 'Ingénieur', domicile_pere: 'Montpellier', nom_mere: 'Petit', age_mere: 30, profession_mere: 'Infirmière', domicile_mere: 'Montpellier', declarant: 'Roux', date_naissance_enfant: '2024-08-07', lieu_naissance_enfant: 'Montpellier', date_declaration: '2024-08-08' },
  { id: 8, nom_officier: 'Simon', prenom_officier: 'Isabelle', fonction_officier: 'Adjoint', prenom_enfant: 'Louis', sexe_enfant: 'M', nom_pere: 'Petit', age_pere: 36, profession_pere: 'Architecte', domicile_pere: 'Strasbourg', nom_mere: 'Laurent', age_mere: 32, profession_mere: 'Enseignante', domicile_mere: 'Strasbourg', declarant: 'Simon', date_naissance_enfant: '2024-08-08', lieu_naissance_enfant: 'Strasbourg', date_declaration: '2024-08-09' },
  { id: 9, nom_officier: 'Laurent', prenom_officier: 'Thomas', fonction_officier: 'Maire', prenom_enfant: 'Jules', sexe_enfant: 'M', nom_pere: 'Durand', age_pere: 31, profession_pere: 'Comptable', domicile_pere: 'Nantes', nom_mere: 'Petit', age_mere: 29, profession_mere: 'Pharmacienne', domicile_mere: 'Nantes', declarant: 'Laurent', date_naissance_enfant: '2024-08-09', lieu_naissance_enfant: 'Nantes', date_declaration: '2024-08-10' },
  { id: 10, nom_officier: 'Petit', prenom_officier: 'Julie', fonction_officier: 'Adjoint', prenom_enfant: 'Sofia', sexe_enfant: 'F', nom_pere: 'Lefevre', age_pere: 30, profession_pere: 'Médecin', domicile_pere: 'Reims', nom_mere: 'Roux', age_mere: 28, profession_mere: 'Enseignante', domicile_mere: 'Reims', declarant: 'Petit', date_naissance_enfant: '2024-08-10', lieu_naissance_enfant: 'Reims', date_declaration: '2024-08-11' }
];


let filterActeNaissance = ref(acteNaissance);
const admin = ref(window.localStorage.getItem("adminOnline"));
// let filterActeNaissanceToRefused = ref();

// ------------------------------------------------- DELETE --------------------------------------------
function deleteActeNaissance(id: number) {

  Swal.fire({
    title: "Voulez-vraiment suprimer cette acteNaissance?",
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
const updateActeNaissance = (id: any) => {

// 
}

// -------------------------------------------------- GET ---------------------------------------------

function sortNaissanceWithSearch(searchActeNaissance: any) {
  if ((searchActeNaissance.value as string).trim() === "") {
    filterActeNaissance.value = acteNaissance
  } else {
    filterActeNaissance.value = acteNaissance.filter(document =>
      (document.nom_pere.toLowerCase()).includes(((searchActeNaissance as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.prenom_enfant.toLowerCase()).includes(((searchActeNaissance as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.date_naissance_enfant.toLowerCase()).includes(((searchActeNaissance as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.lieu_naissance_enfant.toLowerCase()).includes(((searchActeNaissance as HTMLInputElement).value as string).trim().toLowerCase())
  )
  }
}


</script>

<style></style>
