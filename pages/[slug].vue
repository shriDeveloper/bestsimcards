<template>

    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
        Best Sim Cards
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Cities
            
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li class="dropdown-item" v-for="city in cities" :key="city"><a href="">{{city}}</a></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Airports
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li class="dropdown-item"><a href="#">New York - JFK</a></li>
            <li class="dropdown-item"><a href="#">Los Angeles - LAX</a></li>
            <li class="dropdown-item"><a href="#">Chicago - ORD</a></li>
            <li class="dropdown-item"><a href="#">Miami - MIA</a></li>
            <li class="dropdown-item"><a href="#">Dallas - DFW</a></li>
            <li class="dropdown-item"><a href="#">San Francisco - SFO</a></li>
            <li class="dropdown-item"><a href="#">Atlanta - ATL</a></li>
            <li class="dropdown-item"><a href="#">Denver - DEN</a></li>
            <li class="dropdown-item"><a href="#">Seattle - SEA</a></li>
            <li class="dropdown-item"><a href="#">Washington D.C. - DCA</a></li>
          </ul>
        </li>

      </ul>
      </div>
    
  </div>
</nav>
    </div>

    <div class="banner d-flex flex-column justify-content-center align-items-center">
        <h1>{{ page.title }}</h1>
        <p>Experience seamless internet connectivity with our {{ page.country }} eSIMs .</p>
        <nuxt-link to="#pricing" class="btn btn-lg" style="background-color: #ff7a00;color: white;">Get Your eSIM
            Now</nuxt-link>
    </div>

    <marquee>
        <div class="container-fliud" style="padding: 10px;">
            <div class="nav-scroller py-1">
                <nav class="nav">
                    <a v-for="(country, index) in shuffledCountries" :key="index" class="nav-item nav-link m-1"
                        style="background-color: whitesmoke;padding: 13px;border-radius: 10px;color: black;font-weight: bold;"
                        :href="'best-esims-for-' + country.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')">
                        {{ country }}
                    </a>
                </nav>
            </div>
        </div>
    </marquee>



    <main class="container mt-2">
        <div class="row">
            <div class="col-md-8">
                
                <div class="row" style="border: 1px solid whitesmoke;padding: 40px;">
                    <img :src="getCountryFlag(page.country)" height="300" width="300">
                </div>
                
                <div class="row mt-5">
                    <article class="blog-post">
                        <ContentDoc />
                    </article>
                </div>

            </div>

            <div class="col-md-4">
                <div class="position-sticky" style="top: 2rem;">
                    <div>
                        <h4 class="text-center">Related posts</h4>
                        <ul class="list-unstyled">
                            <li v-for="(article, index) in shuffledArticles" :key="index">
                                <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
                                    :href="article._path">
                                    <img :src="getCountryFlag(article.country)" height="34" width="64">
                                    <div class="col-lg-8">
                                        <h6 class="mb-0">{{ article.title }}</h6>
                                        <small class="text-body-secondary">{{ article.date }}</small>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>




                </div>
            </div>
        </div>
    </main>

    <Footer></Footer>

</template>

<script setup>

import { shuffle } from 'lodash';
const articles = ref([]);
const shuffledArticles = ref([]);
const shuffledCountries = ref([]);
const { page } = useContent();
const cities = ref([]);

const { data: countries } = await useFetch('https://restcountries.com/v3.1/all?fields=name,flags')


async function fetchCities(country) {
  const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ country })
  });
  
  const result = await response.json();
  return result.data; 
}

const getCountryFlag = (countryName) => {
    for (const country of countries.value) {
        if (country.name.common.toLowerCase() === countryName.toLowerCase()) {
            return country.flags.svg; // or country.flags.svg for SVG format
        }
    }
    return null; 
}

onMounted(async () => {
    const content = await queryContent().where({ 'category': { $contains: ['country'] } }).find();
    articles.value = content;
    shuffledArticles.value = shuffle(articles.value).slice(0, 13);
    const countries = shuffledArticles.value.map(article => article.country);
    const uniqueCountries = [...new Set(countries)];
    shuffledCountries.value = shuffle(uniqueCountries).slice(0, 10);
    cities.value = await fetchCities(page.value.country);

})






</script>

<style scoped>
/* Add your styles here */
.banner {
    background-color: whitesmoke;
    background-size: cover;
    background-position: center;
    padding: 100px 0;
    color: black;
    text-align: center;
}

.banner h1 {
    font-size: 3rem;
    font-weight: bold;
}

.banner p {
    font-size: 1.25rem;
    margin: 20px 0;
}

.banner .btn {
    font-size: 1rem;
    padding: 15px 30px;
}

@media (max-width: 768px) {
    .banner {
        padding: 50px 0;
    }

    .banner h1 {
        font-size: 2rem;
    }

    .banner p {
        font-size: 1rem;
    }
}
</style>
