<template>
  <div class="w-100 vh-100 d-flex justify-content-center align-items-center bg-primary bg-gradient">
    <div class="bg-light p-lg-5 p-md-5 p-3 col-lg-5 col-md-7 col-10 shadow rounded rounded-3">
      <Form @submit="onSubmitLogin" :validation-schema="loginSchema">
        <div class="row g-3">
          <h4> Connexion </h4>
          <p class="text-start my-0" style="font-size: 15px;"> Connectez-vous à votre compte 
          </p>
          <div class="col-12 text-start ">
            <label class="text-black fw-semibold mb-10">
              Email
            </label>
            <Field name="email" type="email" class="form-control rounded rounded-3" placeholder="Entrer votre email"
              style="height: 55px;" />
            <ErrorMessage name="email" class="text-danger" />
          </div>
          <div class="col-12 text-start ">
            <label class="d-block text-black fw-semibold mb-10">
              Mot de passe
            </label>
            <Field name="password" type="password" class="form-control rounded rounded-3"
              placeholder="Entrer votre mot de passe" style="height: 55px;" />
            <ErrorMessage name="password" class="text-danger" />
          </div>
          <div class="">
            <button class="btn btn-primary py-2 rounded rounded-3" type="submit">Se connecter</button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage, configure } from 'vee-validate';
import * as Yup from 'yup';
import { useRouter } from 'vue-router';
// import { useAuthStore } from '@/services/auth';
import Swal from 'sweetalert2';

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("L'email est invalide").required('L\'email   est obligatoire'),
  password: Yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est obligatoire'),
});

const router = useRouter();
// const store = useAuthStore();
const submitButton = ref<HTMLButtonElement | null>(null);

const loginForm = ref(null);
const onSubmitLogin = async (values: any) => {
  // values = values as User;
  // Clear existing errors
  // store.logout();
  // // Send login request
  // await store.login(values);
  // const error = Object.values(store.errors);
  // if (error.length === 0) {
  //   // Go to page after successfully login
  //   router.push({ name: "adminPage" });
  //   Swal.fire({
  //     toast: true,
  //     title: "Connecté avec succès!",
  //     icon: "success",
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     timer: 3000,
  //     timerProgressBar: true
  //   });
  // } else {
  //   Swal.fire({
  //     text: error[1] as string,
  //     icon: "error",
  //     buttonsStyling: false,
  //     confirmButtonText: "OK",
  //     heightAuto: false,
  //     customClass: {
  //       confirmButton: "btn btn-sm fw-semobold btn-danger",
  //     },
  //   }).then(() => {
  //     store.errors = {};
  //   });
  // }
};

</script>

<style>

</style>
