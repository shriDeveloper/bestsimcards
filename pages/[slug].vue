<template>

    <div class="container-fluid">
        <Header></Header>
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
                        <h4>Related posts</h4>
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

const { data: countries } = await useFetch('https://restcountries.com/v3.1/all?fields=name,flags')


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
