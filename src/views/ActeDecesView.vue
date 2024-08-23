<template>
  <div class="p-4 text-start">
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary py-2 rounded rounded-3 mb-2" type="submit">Enregistrer un acte de
        deces</button>
    </div>
    <div class="col-12 mb-2 d-flex justify-content-start">
      <div class="col-4 d-flex align-items-center">
        <span class="material-symbols-outlined mx-2">
          search
        </span>
        <input type="search" class="form-control" @input="sortDecesWithSearch($event.target)"
          placeholder="Rechercher...">
      </div>
      <!-- <div class="col-3">
        <select name="filtrer" id="filter" class="form-select" @click="sortActeDecesWithCategorie($event.target)">
          <option selected disabled> Filtrer par catégorie </option>
          <option value="tout"> Tout </option>
          <option value="conge"> Congé </option>
          <option value="permission"> Permission </option>
        </select>
      </div>
      <div class="col-3">
        <select name="filtrer" id="filter" class="form-select" @click="sortActeDecesWithStatut($event.target)">
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
            <th scope="col"> Profession </th>
            <th scope="col"> Date de deces </th>
            <th scope="col"> Lieu de deces </th>
            <th scope="col"> Actions </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="acteDeces in filterActeDeces" :key="acteDeces.id">
            <td> {{ acteDeces.nom_pere }} </td>
            <td> {{ acteDeces.prenom_defunt }} </td>
            <td> {{ acteDeces.profession_defunt }} </td>
            <td> {{ acteDeces.date_deces_defunt }} </td>
            <td> {{ acteDeces.lieu_deces_defunt }} </td>
            <td>
              <div class="d-flex justify-content-center">
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger"
                  @click="updateActeDeces(acteDeces.id)" style="height: 40px; width: 40px;">
                  delete
                </span>
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-success"
                  @click="deleteActeDeces(acteDeces.id)" style="height: 40px; width: 40px;">
                  update
                </span>
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-primary"
                  @click="deleteActeDeces(acteDeces.id)" style="height: 40px; width: 40px;">
                  visibility
                </span>
              </div>
            </td>
            <!-- v-if="acteDeces.statut === 'En cours de traitement' && admin" -->
            <!-- <td v-else> </td> -->
          </tr>
        </tbody>
      </table>
      <div v-if="filterActeDeces.length == 0" class="fs-5 d-flex justify-content-center">
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

let acteDeces = [
  { id: 1, nom_officier: 'Dupont', prenom_officier: 'Jean', fonction_officier: 'Maire', prenom_defunt: 'Pierre', sexe_defunt: 'M', date_naissance_defunt: '1960-03-15', lieu_naissance_defunt: 'Paris', nom_pere: 'Martin', nom_mere: 'Durand', situation_matrimoniale_defunt: 'Marié', domicile_defunt: 'Paris', profession_defunt: 'Ingénieur', declarant: 'Martin', date_deces_defunt: '2024-07-01', lieu_deces_defunt: 'Paris', date_declaration: '2024-07-02' },
  { id: 2, nom_officier: 'Martin', prenom_officier: 'Sophie', fonction_officier: 'Adjoint', prenom_defunt: 'Jacques', sexe_defunt: 'M', date_naissance_defunt: '1972-06-22', lieu_naissance_defunt: 'Lyon', nom_pere: 'Bernard', nom_mere: 'Lefevre', situation_matrimoniale_defunt: 'Célibataire', domicile_defunt: 'Lyon', profession_defunt: 'Médecin', declarant: 'Bernard', date_deces_defunt: '2024-07-02', lieu_deces_defunt: 'Lyon', date_declaration: '2024-07-03' },
  { id: 3, nom_officier: 'Bernard', prenom_officier: 'Michel', fonction_officier: 'Maire', prenom_defunt: 'Laurent', sexe_defunt: 'M', date_naissance_defunt: '1980-08-30', lieu_naissance_defunt: 'Marseille', nom_pere: 'Durand', nom_mere: 'Petit', situation_matrimoniale_defunt: 'Divorcé', domicile_defunt: 'Marseille', profession_defunt: 'Artisan', declarant: 'Durand', date_deces_defunt: '2024-07-03', lieu_deces_defunt: 'Marseille', date_declaration: '2024-07-04' },
  { id: 4, nom_officier: 'Durand', prenom_officier: 'Laura', fonction_officier: 'Adjoint', prenom_defunt: 'Antoine', sexe_defunt: 'M', date_naissance_defunt: '1950-11-15', lieu_naissance_defunt: 'Toulouse', nom_pere: 'Petit', nom_mere: 'Bernard', situation_matrimoniale_defunt: 'Veuf', domicile_defunt: 'Toulouse', profession_defunt: 'Comptable', declarant: 'Petit', date_deces_defunt: '2024-07-04', lieu_deces_defunt: 'Toulouse', date_declaration: '2024-07-05' },
  { id: 5, nom_officier: 'Moreau', prenom_officier: 'Luc', fonction_officier: 'Maire', prenom_defunt: 'David', sexe_defunt: 'M', date_naissance_defunt: '1945-09-12', lieu_naissance_defunt: 'Bordeaux', nom_pere: 'Roux', nom_mere: 'Bernard', situation_matrimoniale_defunt: 'Marié', domicile_defunt: 'Bordeaux', profession_defunt: 'Retraité', declarant: 'Roux', date_deces_defunt: '2024-07-05', lieu_deces_defunt: 'Bordeaux', date_declaration: '2024-07-06' },
  { id: 6, nom_officier: 'Lefevre', prenom_officier: 'Marie', fonction_officier: 'Adjoint', prenom_defunt: 'Nicolas', sexe_defunt: 'M', date_naissance_defunt: '1980-01-27', lieu_naissance_defunt: 'Nantes', nom_pere: 'Martin', nom_mere: 'Roux', situation_matrimoniale_defunt: 'Divorcé', domicile_defunt: 'Nantes', profession_defunt: 'Enseignant', declarant: 'Martin', date_deces_defunt: '2024-07-06', lieu_deces_defunt: 'Nantes', date_declaration: '2024-07-07' },
  { id: 7, nom_officier: 'Roux', prenom_officier: 'Pierre', fonction_officier: 'Maire', prenom_defunt: 'Vincent', sexe_defunt: 'M', date_naissance_defunt: '1955-04-19', lieu_naissance_defunt: 'Nice', nom_pere: 'Petit', nom_mere: 'Durand', situation_matrimoniale_defunt: 'Marié', domicile_defunt: 'Nice', profession_defunt: 'Avocat', declarant: 'Petit', date_deces_defunt: '2024-07-07', lieu_deces_defunt: 'Nice', date_declaration: '2024-07-08' },
  { id: 8, nom_officier: 'Simon', prenom_officier: 'Louis', fonction_officier: 'Adjoint', prenom_defunt: 'Lucas', sexe_defunt: 'M', date_naissance_defunt: '1975-02-05', lieu_naissance_defunt: 'Strasbourg', nom_pere: 'Simon', nom_mere: 'Petit', situation_matrimoniale_defunt: 'Célibataire', domicile_defunt: 'Strasbourg', profession_defunt: 'Entrepreneur', declarant: 'Simon', date_deces_defunt: '2024-07-08', lieu_deces_defunt: 'Strasbourg', date_declaration: '2024-07-09' },
  { id: 9, nom_officier: 'Petit', prenom_officier: 'Clément', fonction_officier: 'Maire', prenom_defunt: 'Benoît', sexe_defunt: 'M', date_naissance_defunt: '1965-10-29', lieu_naissance_defunt: 'Toulouse', nom_pere: 'Durand', nom_mere: 'Petit', situation_matrimoniale_defunt: 'Marié', domicile_defunt: 'Toulouse', profession_defunt: 'Notaire', declarant: 'Durand', date_deces_defunt: '2024-07-09', lieu_deces_defunt: 'Toulouse', date_declaration: '2024-07-10' },
  { id: 10, nom_officier: 'Lefevre', prenom_officier: 'Marie', fonction_officier: 'Adjoint', prenom_defunt: 'Alexandre', sexe_defunt: 'M', date_naissance_defunt: '1984-05-18', lieu_naissance_defunt: 'Lyon', nom_pere: 'Petit', nom_mere: 'Lefevre', situation_matrimoniale_defunt: 'Célibataire', domicile_defunt: 'Lyon', profession_defunt: 'Technicien', declarant: 'Petit', date_deces_defunt: '2024-07-10', lieu_deces_defunt: 'Lyon', date_declaration: '2024-07-11' }
]


let filterActeDeces = ref(acteDeces);
const admin = ref(window.localStorage.getItem("adminOnline"));
// let filterActeDecesToRefused = ref();

// ------------------------------------------------- DELETE --------------------------------------------
function deleteActeDeces(id: number) {

  Swal.fire({
    title: "Voulez-vraiment suprimer cette acteDeces?",
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
const updateActeDeces = (id: any) => {

// 
}

// -------------------------------------------------- GET ---------------------------------------------

function sortDecesWithSearch(searchActeDeces: any) {
  if ((searchActeDeces.value as string).trim() === "") {
    filterActeDeces.value = acteDeces
  } else {
    filterActeDeces.value = acteDeces.filter(document =>
      (document.nom_pere.toLowerCase()).includes(((searchActeDeces as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.prenom_defunt.toLowerCase()).includes(((searchActeDeces as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.date_deces_defunt.toLowerCase()).includes(((searchActeDeces as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.lieu_deces_defunt.toLowerCase()).includes(((searchActeDeces as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.profession_defunt.toLowerCase()).includes(((searchActeDeces as HTMLInputElement).value as string).trim().toLowerCase())
  )
  }
}


</script>

<style></style>
