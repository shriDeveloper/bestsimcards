<template>
    
  
    <div class="container-fluid">
      <Header></Header>
    </div>
    
    <Banner/>

    <div class="container" style="padding: 40px;">
    
    <main class="text-center py-2">
      
      <div class="search-container my-4">
        <input type="text" v-model="searchQuery" class="form-control" placeholder="Search data packs for 200+ countries and regions">
      </div>

      
      
      <div class="row mt-5">
        <div v-for="country in filteredCountries" :key="country.name.common" class="col-6 col-md-4 col-lg-3 my-2">
          <NuxtLink :to="`/best-esims-for-${country.name.common.toLowerCase().replace(/ /g, '-')}`" class="text-decoration-none">
          <div class="card d-flex align-items-center justify-content-between p-2">
            <div class="d-flex align-items-center">
              <img style="border-radius: 50%;" :src="country.flags.svg" alt="Flag" class="flag-icon me-2">
              <h4 class="card-title m-0">{{ country.name.common }}</h4>
            </div>
          </div>
        </NuxtLink>
        </div>
      </div>

      
      
    </main>
  </div>

<!-- Footer -->
<Footer></Footer>
</template>

<script setup>

import { ref, computed } from 'vue'

const { data: countries } = await useFetch('https://restcountries.com/v3.1/all?fields=name,flags')

const searchQuery = ref('')

const filteredCountries = computed(() => {
  return countries.value.filter(country => 
    country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

</script>
  

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.flag-icon {
  width: 30px;
  height: 30px;
  object-fit: cover;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 8px;
  background-color:whitesmoke;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  font-size: 18px;
  font-weight: 500;
}

.bi-chevron-down {
  font-size: 16px;
  color: #6c757d;
}
</style>