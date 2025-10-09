<template>
  <div class="container mt-4">
    <h1 class="mb-3">Weather Check</h1>

    <!-- Input + button -->
    <div class="input-group mb-3">
      <input v-model="city" type="text" class="form-control" placeholder="Enter city name" />
      <button class="ms-2 btn btn-primary" @click="searchByCity">Search</button>
    </div>
    <!--The <main> tag in HTML is used to specify the main content of a document 
      More info about main, check https://www.w3schools.com/tags/tag_main.asp-->
    <main>
      <!--If there are no data returned, then skip rendering the information-->
      <div v-if="weatherData">
        <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

const apikey = '6c64e22ae8548d394821cbaa4d09fd3c'

export default {
  name: 'WeatherView',
  data() {
    return {
      city: '',
      weatherData: null
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
    },
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async searchByCity() {
      if (!this.city) return
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`
      await this.fetchWeatherData(url)
    },

    // new feature: fetch by user's current location
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          await this.fetchWeatherData(url)
        })
      }
    },

    // shared method for all fetches
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
        alert('Could not fetch weather data. Please try again.')
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>
