<template>
    <div class="w-screen h-screen pt-36 bg-blue-100" >
        <div class="container middlex">
            <form @submit.prevent="submitForm">
                <input-box>
                    <label class="text-lg mx-2 text-white" for="name">Name</label>
                    <input class="input" id="name" type="text" v-model.trim="enteredName" @blur="validateName" />
                </input-box>
                <div class="middlex">
                <p v-if="invalidNameInput" class="invalid">
                        Please enter your Name!
                    </p>
                </div>
                <h2 class="middlex text-white">Select Your Pet</h2>
                <div class="flex">
                    <input type="radio" name="pet" value="dog" id="dog" v-model="pet">
                    <label for="dog" class="inputImg">
                        <img :src="require('./assets/dog.jpg')">
                    </label>
                    <input type="radio" name="pet" value="cat" id="cat" v-model="pet">
                    <label for="cat" class="inputImg">
                        <img :src="require('./assets/cat.jpg')">
                    </label>
                </div>
                <input-box v-show="pet">
                    <p class="text-white">Your pet is <span class="text-xl font-bold text-white md:uppercase">{{ pet }}</span></p>
                </input-box>
                <div class="middlex">
                <p v-if="invalidPetInput" class="invalid">
                Please choose your Pet!
                </p>
                </div>
                <div class="right">
                <button class="btn">Submit</button>
                </div>
            </form>
            <div class="result">
                <ul v-for="survey in petSurvey" :key="survey.id">
                    <ResultBox :sname="survey.name">
                        <template v-slot:img>
                            <img :src="getImgSrc(survey)" class="result" />
                        </template>
                        <button  class="bg-blue-500 m-1"><img src="./assets/edit.svg" alt="" /></button>
                        <button  class="bg-red-500 m-1"><img src="./assets/delete.svg" alt="" /></button>
                    </ResultBox>
                </ul>
            </div>
        </div>
  </div>
</template>

<script>
import ResultBox from './components/ResultBox.vue'

export default {
  name: 'App',
  components: {
    ResultBox
  },
  data() {
    return {
      url: 'http://localhost:5000/petSurvey',
      enteredName: '',
      pet: null,
      pets:  {
          dog:{
              name: "dog",
              src: "./assets/dog.jpg"
          },
          cat:{
              name: "cat",
              src: "./assets/cat.jpg"
          }
      },
      invalidNameInput: false,
      invalidPetInput: false,
      petSurvey: []
    }
  },
  methods: {
    submitForm() {
      this.invalidNameInput = this.enteredName === '' ? true : false
      this.invalidPetInput = this.pet === null ? true : false
      if (this.enteredName !== '' && this.pet !== null) {
          this.addNewSurvey({
            name: this.enteredName,
            pet: this.pet,
            src: this.pets.dog.name === this.pet ? this.pets.dog.src : this.pets.cat.src
          })
      }
      this.enteredName = ''
      this.pet = null
    },

    validateName() {
      this.invalidNameInput = this.enteredName === '' ? true : false
    },

    getImgSrc (survey) {
        return survey.src == "./assets/dog.jpg" ? require('./assets/dog.jpg') : require('./assets/cat.jpg')
    },
    async getPetSurvey() {
      try {
        const res = await fetch(this.url)
        const data = await res.json()
        return data
      } catch (error) {
        console.log(`Could not get! ${error}`)
      }
    },
    async addNewSurvey(newSurvey) {
      try {
        const res = await fetch(this.url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name: newSurvey.name,
            pet: newSurvey.pet,
            src: newSurvey.src
          })
        })
        const data = await res.json()
        this.petSurvey = [...this.petSurvey, data]
      } catch (error) {
        console.log(`Could not save! ${error}`)
      }
    }
  },
  async created() {
    this.petSurvey = await this.getPetSurvey()
  }
}
</script>
