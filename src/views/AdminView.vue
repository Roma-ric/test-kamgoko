<template>
  <div class="vh-100 d-flex flex-lg-row flex-md-column flex-column justify-content-between">
    <nav class="col-lg-3 col-md-12 col-12 bg-primary overflow-auto d-flex d-flex flex-lg-column flex-md-row flex-row justify-content-between">
      <div class="d-flex flex-lg-column flex-md-row flex-row">
        <router-link to="/" class="rounded mb-2 mx-md-2 d-flex align-items-center">
          <span class="material-symbols-outlined card p-1 text-primary mx-2">
            dashboard
          </span>
          Tableau de bord
        </router-link>
        <router-link to="/naissances" class="rounded mb-2 mx-md-2 d-flex align-items-center">
          <span class="material-symbols-outlined card p-1 text-primary mx-2">
            pregnant_woman
          </span>
          Acte de naissance
        </router-link>
        <router-link to="/mariages" class="rounded mb-2 mx-md-2 d-flex align-items-center">
          <span class="material-symbols-outlined card p-1 text-primary mx-2">
            supervised_user_circle
          </span>
          Acte de mariage
        </router-link>
        <router-link to="/deces" class="rounded mb-2 mx-md-2 d-flex align-items-center">
          <span class="material-symbols-outlined card p-1 text-primary mx-2">
            deceased
          </span>
          Acte de décès
        </router-link>
      </div>
      <router-link to="/utilisateurs" class="rounded mb-2 mx-md-2 d-flex align-items-center">
        <span class="material-symbols-outlined card p-1 text-primary mx-2">
          person
        </span>
        Utilisateurs
      </router-link>
    </nav>
    <div class="col-lg-9 col-md-12 col-12 d-flex flex-column">
      <div class="card p-2 rounded-0 align-items-end shadow-sm">
        <div class="d-flex">
          <span class="material-symbols-outlined card p-0 rounded-circle text-primary mx-2 d-flex justify-content-center align-items-center" style="width: 45px; height: 45px;">
            person
          </span>
          <span class="text-start text-secondary" style="font-size: 14px;">
            romaricakodjenou54@gmail.com
            <br>
            Administrateur
          </span>
        </div>
      </div>
      <div class="overflow-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style></style>
