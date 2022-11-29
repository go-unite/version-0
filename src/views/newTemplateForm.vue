<template>
  <form @submit="handleSubmit">
    <div class="box">
      <div class="field">
        <label class="label">What is the impact you want to have?</label>
        <div class="control">
          <input class="textarea" type="text" placeholder="Intended impact" v-model="outline.impact" required>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="field">
        <label class="label">How will that impact be measured?</label>
        <div class="control">
          <input class="textarea" type="text" placeholder="Measure of impact" v-model="outline.measure" required>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="field">
        <label class="label">How is that impact achieved?</label>
        <div class="control">
          <input class="textarea" type="text" placeholder="Method" v-model="outline.method" required>
        </div>
      </div>
    </div> 
    
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Environment
        </p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="location.type">
                indoor
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="location.type">
                outdoor
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="location.type" checked>
                not sure/I'm easy
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Power needed
        </p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="#" v-model="location.facilities.power">
            </div>
            <label class="label">kWh</label>
            <label class="checkbox">
              <input type="checkbox" v-model="location.facilities.power" checked>
              no idea/I'm easy
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Water needed
        </p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="#" v-model="location.facilities.water">
            </div>
            <label class="label">gallons</label>
            <label class="checkbox">
              <input type="checkbox" v-model="location.facilities.water" checked>
              no idea/I'm easy
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="field">
        <label>Are there any foreseen risks that may require a hospital?</label>
        <div class="control">
          <label class="radio">
            <input type="radio" name="question" v-model="location.facilities.hospital">
            Yes
          </label>
          <label class="radio">
            <input type="radio" name="question" v-model="location.facilities.hospital">
            No
          </label>
          <label class="radio">
            <input type="radio" name="question" v-model="location.facilities.hospital">
            Not sure
          </label>
        </div>
      </div>
    </div>
    
    <div class="box">
      <div class="field">
        <label>Is there trash being collected or produced??</label>
        <div class="control">
          <label class="radio">
            <input type="radio" name="question" v-model="location.facilities.trash">
            Yes
          </label>
          <label class="radio">
            <input type="radio" name="question" v-model="location.facilities.trash">
            No
          </label>
          <label class="radio">
            <input type="radio" name="question" v-model="location.facilities.trash">
            Not sure
          </label>
        </div>
      </div>
    </div>
  

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">Cancel</button>
      </div>
    </div>
  </form>
</template>

<script>
import { db } from '../firebase/firebase'
import { doc, setDoc, collection } from 'firebase/firestore'

const fbTemplates = collection(db, "Templates")

export default {
  data() {
    return {
      outline: {
        impact: '',
        measure: '',
        method: '',
      },
      location: {
        type: '',
        facilities: {
          hospital: '',
          power: '',
          water: '',
          trash: ''
        }
      }
    }
  },
  methods: {
    handleSubmit() {
      let inputForm = {
        outline: {
          impact: this.outline.impact,
          measure: this.outline.measure,
          method: this.outline.method,
        },
        location: {
          type: this.location.type,   
            power: this.location.power,
            water: this.location.water,
            trash: this.location.trash,
          }
        }

      }
      //firestore push stuff
    }
  }


</script>