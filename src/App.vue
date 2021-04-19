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
        </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
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
    },

    validateName() {
      this.invalidNameInput = this.enteredName === '' ? true : false
    },

    showData(oldSurvey) {
      this.isEdit = true
      this.editId = oldSurvey.id
      this.enteredName = oldSurvey.name
      this.pet = oldSurvey.pet
    },
  },

}
</script>
