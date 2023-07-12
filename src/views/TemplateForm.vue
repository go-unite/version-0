<template>
  <div class="field is-grouped mb-5">
    <p class="control is-expanded">
      <input v-model="nameInput" class="input is-large" type="text" placeholder="Name of your template">
    </p>
    <p class="control">
      <button class="button" @click.prevent="updateName">
        save
      </button>
    </p>
  </div>
  <div class="block">
    <div class="title is-4">Overview</div>
    <div class="box">
      <div class="subtitle">Outline:</div>
      <p class="control">
        <input v-model="outlineInput" class="textarea" placeholder="Outline of what you're going for">
      </p>
      <p class="control">
        <button class="button" @click.prevent="updateOutline">
          save
        </button>
      </p>
    </div>
    <div class="box">
      <div class="subtitle">Impact:</div>
      <p class="control">
        <input v-model="impactInput" class="textarea" placeholder="Impact you're going for">
      </p>
      <p class="control">
        <button class="button" @click.prevent="saveImpact">
          save
        </button>
      </p>
    </div>
  </div>
  <div class="block">
    <div class="title is-4">Details</div>
    <div class="columns">
      <div class="column">
        <div class="title is-5">roles</div>
        <div class="box">
          <div v-for="(role, key) in currentVersion.instructions.roles" v-bind:key="key" class="card mb-5">
            <div class="card-content">
              <div class="media-content">
                <div class="title is-6">
                  {{ key }}
                </div>
              </div>
              <div class="content">
                {{ role.note }}
              </div>
            </div>
          </div>
          <AddNewCard type="role" @addRole="(data) => addNewItem(data, 'role')" />
        </div>
      </div>
      <div class="column">
        <div class="title is-5">materials</div>
        <div class="box">
          <div v-for="(material, key) in currentVersion.parts.materials" v-bind:key="key" class="card mb-5">
            <div class="card-content">
              <div class="media-content">
                <div class="title is-6">
                  {{ key }}
                </div>
              </div>
              <div class="content">
                {{ material.need.quantity }} {{ material.need.measure }}
              </div>
            </div>
          </div>
          <AddNewCard type="material" @addMaterial="(data) => addNewItem(data, 'material')" />
        </div>
      </div>
    </div>
    <div class="block">
      <div class="title is-5">Location</div>
      <div class="columns">
        <div class="column">
          <div class="box">
            <div class="media-content">
              <div class="title is-6"> General </div>
            </div>
            <div class="card-content" v-if="currentVersion.parts.location.capacity && currentVersion.parts.location.type">
              <div class="subtitle">max capacity: </div>
              <div class="columns">
                <div class="column">
                  <input type="range" min="1" max="101" step="10" class="slider" id="capactiyRange" v-model="currentVersion.parts.location.capacity">
                </div>
                <div class="column">
                  <div class="subtitle">{{ currentVersion.parts.location.capacity }}</div>
                </div>
              </div>
              <div class="subtitle">location type: </div>
              <div class="columns">
                <div class="column">
                  <input type="range" min="1" max="3" class="slider" id="locationType" v-model="locationTypeInput" @input="formatLocationType">
                </div>
                <div class="column">
                  <div class="subtitle">{{ currentVersion.parts.location.type }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <div class="media-content">
              <div class="title is-6"> Spots Needed </div>
            </div>
            <div class="card-content">
              <AddNewCard type="spot" @addSpot="(data) => addNewItem(data, 'spot')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TimelineTable :currentVersionData="currentVersion.instructions.timeline" />
</template>

<script>
  import { db } from '../firebase/firebase';
  import {  } from 'firebase/firestore';
  import AddNewCard from '../components/AddNewCard.vue';
  import TimelineTable from '../components/TimelineTable.vue';
  import { ref } from 'vue';
  
  export default {
    data() {
      return {
        tID: "",
        vID: "",
        nameInput: "",
        outlineInput: "",
        impactInput: "",
        locationTypeInput: "",
        type: "",
        currentVersion: {
          name: "",
          outline: "",
          impact: "",
          classification: {},
          commitment: {},
          ownership: {},
          instructions: {
            roles: {},
            timeline: {}
          },
          parts: {
            location: {
              capacity: 1,
              type: "Mixed",
              facilities: {
                power: "",
                trash: "",
                water: "",
                restrooms: "",
                hospital: ""
              },
              spots: []
            },
            materials: []
          }
        },
      };
    },
    components: { 
      AddNewCard,
      TimelineTable 
    },
    created() {
    /* 
      try {
        the document references from template view
        const versionPath = "Templates/" + tID + "/versions/" + vID + "/";
        const versionDocRef = doc(db, versionPath)
        const locationDocRef = doc(db, versionPath+"parts", "location")
        const materialsDocRef = doc(db, versionPath+"parts", "materials")
        const timelineDocRef = doc(db, versionPath+"instructions", "timeline")
        const rolesDocRef = doc(db, versionPath+"instructions", "roles")
      }
      catch (error) {
        console.log("error getting data from firestore:", error);
      }
    */
    },
    computed: {
      formatLocationType() {
        let locationType;
        switch (Number(this.locationTypeInput)) {
          case 1:
            locationType = "Indoor";
            break;
          case 2:
            locationType = "Mixed";
            break;
          case 3:
            locationType = "Outdoor";
            break;
          default:
            locationType = "invalid";
          }
          this.currentVersion.parts.location.type = locationType
      }
    },
    methods: {
      updateName() {
        this.currentVersion.name = this.nameInput
        console.log(this.currentVersion.name)
      },
      updateImpact() {
        this.currentVersion.impact = this.impactInput
      },
      updateOutline() {
        this.currentVersion.outline = this.outlineInput
      },
      updateCapacity() {
        console.log(this.currentVersion.parts.location.capacity)
      },
      updateLocationType() {
        console.log(this.currentVersion.parts.location.capacity)
      },
      addNewItem(newValue, type) {
        switch (type) {
          case "role":
            this.currentVersion.instructions.roles.push({
              value: newValue,
            });
            console.log(this.currentVersion.instructions.roles);
            break;
          case "material":
            this.currentVersion.parts.materials.push({
              value: newValue,
            });
            break;
          case "spot":
            this.currentVersion.parts.location.spots.push({
              value: newValue,
            });
            break;
          default:
            console.log("reseting card");
        }
      },
      addNewHap(newID, ) {
        this.currentVersion.instructions.timeline.newID
      }
    }
  }
</script>