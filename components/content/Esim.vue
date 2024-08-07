<template>
    
    <!-- Your HTML code to display the products goes here -->
    <div class="container">
      <div class="row">
        <h5>Find the best data eSIM in {{ country.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') }}</h5>
        <p>Check eSIM data plans for your next trip to {{ country.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') }}. Get the most data, texts and calls at the best price. Never hassle again buying a physical sim card.</p>
      </div>
      <div class="row mt-2">
        <div class="col-md-12">
          <article class="blog-post">
            <div class="row">
              <!-- Product 1 -->
            <div class="col-md-4 mb-4"  v-for="product in products" :key="product.externalId">
              <div class="card h-100" style="background-color: whitesmoke;border:0;padding:10px">
                <img :src="product.providerName.logo" class="card-img-top" :alt="product.providerName.displayName">
                <div class="card-body">
                  <h5 class="card-title">{{ product.displayName }}</h5>
                  <ul class="list-group list-group-flush" style="border-radius: 10px;padding:4px;">
                    <li class="list-group-item">Capacity: {{ product.capacity }} MB</li>
                    <li class="list-group-item">Price: {{ formatPrice(product.price) }}</li>
                    <li class="list-group-item">Original Price: {{ formatPrice(product.originalPrice) }}</li>
                    <li class="list-group-item">Duration: {{ product.duration }} days</li>
                    <li class="list-group-item">Coverage: {{ product.coverageType }}</li>
                    <li class="list-group-item" v-if="product.phoneNumber">Phone Number: Available</li>
                  </ul>
                </div>
              </div>
            </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  

</template>
<script setup>

import { ref, onMounted } from 'vue';
import {shuffle} from 'lodash';

const props = defineProps({
  country: {
    type: String,
    required: true
  }
});

const products = ref([]);

const formatPrice = (price) => {
  return `${price.currency.symbol.sign}${price.value.toFixed(price.currency.precision)}`;
}

onMounted(async () => {

  try {
    const response =  await fetch(`json/${props.country}.json`).then((response) => response.json());
    products.value = shuffle(response.props.pageProps.initialFilteredProducts.products);
    
  } catch (error) {
    console.error(`Failed to load data for country ${props.country}:`, error);
  }
});

</script>
<style scoped>

</style>