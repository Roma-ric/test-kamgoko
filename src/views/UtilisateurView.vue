<template>
  <div class="p-4 text-start">
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary py-2 rounded rounded-3 mb-2" type="submit">Enregistrer un utilisateur</button>
    </div>
    <div class="col-12 mb-2 d-flex justify-content-start">
      <div class="col-4 d-flex align-items-center">
        <span class="material-symbols-outlined mx-2">
          search
        </span>
        <input type="search" class="form-control" @input="sortUserWithSearch($event.target)"
          placeholder="Rechercher...">
      </div>
      <!-- <div class="col-3">
        <select name="filtrer" id="filter" class="form-select" @click="sortUserWithCategorie($event.target)">
          <option selected disabled> Filtrer par catégorie </option>
          <option value="tout"> Tout </option>
          <option value="conge"> Congé </option>
          <option value="permission"> Permission </option>
        </select>
      </div>
      <div class="col-3">
        <select name="filtrer" id="filter" class="form-select" @click="sortUserWithStatut($event.target)">
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
            <th scope="col"> Email </th>
            <th scope="col"> Password </th>
            <th scope="col"> Actions </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filterUser" :key="user.id">
            <td> {{ user.nom }} </td>
            <td> {{ user.prenom }} </td>
            <td> {{ user.email }} </td>
            <td> {{ "*************" }} </td>
            <td>
              <div class="d-flex justify-content-center">
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger"
                  @click="updateUser(user.id)" style="height: 40px; width: 40px;">
                  delete
                </span>
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-success"
                  @click="deleteUser(user.id)" style="height: 40px; width: 40px;">
                  update
                </span>
                <span type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-primary"
                  @click="deleteUser(user.id)" style="height: 40px; width: 40px;">
                  visibility
                </span>
              </div>
            </td>
            <!-- v-if="user.statut === 'En cours de traitement' && admin" -->
            <!-- <td v-else> </td> -->
          </tr>
        </tbody>
      </table>
      <div v-if="filterUser.length == 0" class="fs-5 d-flex justify-content-center">
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

let user = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@example.com', password: 'hashed_password1', role_id: 1, created_at: '2024-08-01', update_at: '2024-08-10', delete_at: null },
  { id: 2, nom: 'Martin', prenom: 'Sophie', email: 'sophie.martin@example.com', password: 'hashed_password2', role_id: 2, created_at: '2024-08-02', update_at: '2024-08-11', delete_at: null },
  { id: 3, nom: 'Bernard', prenom: 'Michel', email: 'michel.bernard@example.com', password: 'hashed_password3', role_id: 3, created_at: '2024-08-03', update_at: '2024-08-12', delete_at: null },
  { id: 4, nom: 'Durand', prenom: 'Laura', email: 'laura.durand@example.com', password: 'hashed_password4', role_id: 4, created_at: '2024-08-04', update_at: '2024-08-13', delete_at: null },
  { id: 5, nom: 'Moreau', prenom: 'Luc', email: 'luc.moreau@example.com', password: 'hashed_password5', role_id: 5, created_at: '2024-08-05', update_at: '2024-08-14', delete_at: null },
  { id: 6, nom: 'Lefevre', prenom: 'Marie', email: 'marie.lefevre@example.com', password: 'hashed_password6', role_id: 6, created_at: '2024-08-06', update_at: '2024-08-15', delete_at: null },
  { id: 7, nom: 'Roux', prenom: 'Pierre', email: 'pierre.roux@example.com', password: 'hashed_password7', role_id: 7, created_at: '2024-08-07', update_at: '2024-08-16', delete_at: null },
  { id: 8, nom: 'Simon', prenom: 'Isabelle', email: 'isabelle.simon@example.com', password: 'hashed_password8', role_id: 8, created_at: '2024-08-08', update_at: '2024-08-17', delete_at: null },
  { id: 9, nom: 'Laurent', prenom: 'Thomas', email: 'thomas.laurent@example.com', password: 'hashed_password9', role_id: 9, created_at: '2024-08-09', update_at: '2024-08-18', delete_at: null },
  { id: 10, nom: 'Petit', prenom: 'Julie', email: 'julie.petit@example.com', password: 'hashed_password10', role_id: 10, created_at: '2024-08-10', update_at: '2024-08-19', delete_at: null }
]


let filterUser = ref(user);
const admin = ref(window.localStorage.getItem("adminOnline"));
// let filterUserToRefused = ref();

// ------------------------------------------------- DELETE --------------------------------------------
function deleteUser(id: number) {

  Swal.fire({
    title: "Voulez-vraiment suprimer cette user?",
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
const updateUser = (id: any) => {

  // 
}

// -------------------------------------------------- GET ---------------------------------------------

function sortUserWithSearch(searchUser: any) {
  if ((searchUser.value as string).trim() === "") {
    filterUser.value = user
  } else {
    filterUser.value = user.filter(document =>
      (document.nom.toLowerCase()).includes(((searchUser as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.prenom.toLowerCase()).includes(((searchUser as HTMLInputElement).value as string).trim().toLowerCase()) ||
      (document.email.toLowerCase()).includes(((searchUser as HTMLInputElement).value as string).trim().toLowerCase())
    )
  }
}


</script>

<style></style>
