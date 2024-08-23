<template>
  <div class="p-4">
    <div class="row gx-3 flex-wrap">
      <div class="col-4">
        <DashboardElement target="demande" nombre="100" libelle="Total des enregistrements" />
      </div>
      <div class="col-4">
        <DashboardElement target="demande" nombre="29" libelle="Total par utilisateurs" />
      </div>
      <div class="col-4">
        <DashboardElement target="demande" nombre="29" libelle="Total par enregistrements" />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-6">
            <div class="w-100 pt-2 mb-2">
              <h5 class="text-start p-1 bg-light m-0 rounded text-dark fw-bold"> Total par type </h5>
              <canvas ref="totalParType"></canvas>
            </div>
          </div>
          <!-- <div class="col-6">
            <div class="w-100 pt-2 mb-2">
              <h5 class="text-start p-1 bg-light m-0 rounded text-dark fw-bold"> Total par enregistrement </h5>
              <canvas ref="totalParEnregistrement"></canvas>
            </div>
          </div> -->
          <div class="col-6">
            <div class="w-100 pt-2 mb-2">
              <h5 class="text-start p-1 bg-light m-0 rounded text-dark fw-bold"> Total par periode </h5>
              <canvas ref="totalParPeriode" ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DashboardElement from '@/components/DashboardElement.vue';
import Chart from 'chart.js/auto';

const totalParType = ref<HTMLCanvasElement | null>(null);
const totalParEnregistrement = ref<HTMLCanvasElement | null>(null);
const totalParPeriode = ref<HTMLCanvasElement | null>(null);

onMounted(() => {

  if (totalParType.value) {
    new Chart(totalParType.value, {
      type: 'pie',
      data: {
        labels: [
          'Acte de naissance',
          'Acte de mariage',
          'Acte de décès'
        ],
        datasets: [{
          label: '',
          data: [20, 50, 30],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  const dataPeriode = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  if (totalParPeriode.value) {
    new Chart(totalParPeriode.value, {
      type: 'bar',
      data: {
        labels: dataPeriode.map(row => row.year),
        datasets: [
          {
            label: 'Enregistrements',
            data: dataPeriode.map(row => row.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});

</script>

<style>
/* Tu peux ajouter des styles personnalisés ici si nécessaire */
</style>
