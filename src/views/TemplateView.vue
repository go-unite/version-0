<template>
  <h1 class="title"> {{ fsVersion.name }} </h1>
  <h5 class="subtitle"> Template: {{ tID }} Version: {{ vID }} </h5>
  <div class="block">
    <div class="sutitle">Overview</div>
    <div class="block">
      Outline: {{ fsVersion.outline }}
    </div>
    <div class="block">
      Impact: {{ fsVersion.impact }}
    </div>
  </div>
  <div class="block">
    <div class="subtitle">Details</div>
    <div class="columns">
      <div class="column">
        <div>roles</div>
        <div v-for="(role, key) in fsVersion.instructions.roles" v-bind:key="key" class="card mb-5">
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
      </div>
      <div class="column">
        <div>materials</div>
        <div v-for="(material, key) in fsVersion.parts.materials" v-bind:key="key" class="card mb-5">
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
      </div>
    </div>
    <div class="block">
      <div>Location</div>
      <div class="columns">
        <div class="column">
          <div class="box">
            <div class="media-content">
              <div class="title is-6"> General </div>
            </div>
            <div class="card-content">
              <div>max capacity: {{ fsVersion.parts.location.capacity }}</div>
              <div>location type: {{ fsVersion.parts.location.type }}</div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <div class="media-content">
              <div class="title is-6"> Spots Needed </div>
            </div>
              <div v-for="(spot, key) in fsVersion.parts.location.spots" v-bind:key="key" class="card mb-5">
                <div class="card-content">
                  <div class="media-content"> 
                    <div class="title is 4"> {{ key }} </div>
                  </div>
                  <div class="content"> posts: {{ spot.posts }} </div>
                  <div class="content"> visitors: {{ spot.visitors }} </div>
                </div>
              </div>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <div class="media-content">
              <div class="title is-6"> Facility Needs </div>
            </div>
            <ul>
              <li v-for="(facil, key) in fsVersion.parts.location.facilities" v-bind:key="key">{{ key }} : {{ facil }}</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  <div class="block">
    <div class="subtitle">Timeline</div>
    <div class="block">
      <div class="tabs is-toggle is-fullwidth">
        <ul>
          <li :class="preClass" @click="currentTab = 'pre'">
            <a>Pre</a>
          </li>
          <li :class="mainClass" @click="currentTab = 'main'">
            <a>Main</a>
          </li>
          <li :class="postClass" @click="currentTab = 'post'">
            <a>Post</a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="currentTab === 'pre'" class="">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Happening</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(note,key) in fsVersion.instructions.timeline.pre" v-bind:key="key">
            <td>{{ key }}</td>
            <td>{{ note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="currentTab === 'main'" class="">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Happening</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(note,key) in fsVersion.instructions.timeline.main" v-bind:key="key">
            <td>{{ key }}</td>
            <td>{{ note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="currentTab === 'post'" class="">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Happening</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(note,key) in fsVersion.instructions.timeline.post" v-bind:key="key">
            <td>{{ key }}</td>
            <td>{{ note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!--
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous">Previous</a>
    <ul class="pagination-list">
      <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
      <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
      <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
    </ul>
    <a class="pagination-next">Next page</a>
  </nav>
-->
</template>

<script>
  import { getDoc, doc } from 'firebase/firestore';
  import { db } from '../firebase/firebase';
  
  export default {
    data() {
      return {
        currentTab: 'pre',
        tID: "",
        vID: "",
        fsVersion: {
          name: "",
          outline: "",
          impact: "",
          classification: {},
          commitment: {},
          ownership: {},
          instructions: {
            roles: {
            
            },
            timeline: {
              pre: {},
              main: {},
              post: {}
            }
          },
          parts: {
            location: {
              capacity: "",
              type: "",
              facilities: {

              },
              spots: {
                posts: "",
                visitors: ""
              }
            },
            materials: {
              
            }
          }
        },
      }
    },

    async created() {
      try {
        const fullID = this.$route.params.fullID
        const tID = fullID.slice(0,7)
        this.tID = tID
        const vID = fullID.slice(8,12)
        this.vID = vID 
        const versionPath = "Templates/"+tID+"/versions/"+vID+"/"

        const versionDocRef = doc(db, versionPath)
        const locationDocRef = doc(db, versionPath+"parts", "location")
        const materialsDocRef = doc(db, versionPath+"parts", "materials")
        const timelineDocRef = doc(db, versionPath+"instructions", "timeline")
        const rolesDocRef = doc(db, versionPath+"instructions", "roles")

        //Version fields
        const versionDoc = await getDoc(versionDocRef)
        if (versionDoc.exists) {
          this.fsVersion.name = versionDoc.data().name
          this.fsVersion.classification = versionDoc.data().classification
          this.fsVersion.commitment = versionDoc.data().commitment
          this.fsVersion.ownership = versionDoc.data().ownership
          this.fsVersion.impact = versionDoc.data().impact
          this.fsVersion.outline = versionDoc.data().outline
        } else {
          console.log("no such version!")
        }
        //Instructions Collection
        const rolesDoc = await getDoc(rolesDocRef)
        if (rolesDoc.exists) {
          this.fsVersion.instructions.roles = rolesDoc.data()
        } else {
          console.log("no such roles document")
        }

        const timelineDoc = await getDoc(timelineDocRef)
        if (timelineDoc.exists) {
          this.fsVersion.instructions.timeline.pre = timelineDoc.data().pre
          this.fsVersion.instructions.timeline.main = timelineDoc.data().main
          this.fsVersion.instructions.timeline.post = timelineDoc.data().post
        } else {
          console.log("no such timeline!")
        }
        console.log(this.fsVersion.instructions.timeline.main)

        //Parts Collection
        const materialsDoc = await getDoc(materialsDocRef)
        if (materialsDoc.exists) {
          this.fsVersion.parts.materials = materialsDoc.data()
        } else {
          console.log("no such materials document")
        }

        const locationDoc = await getDoc(locationDocRef)
        if (locationDoc.exists) {
          this.fsVersion.parts.location = locationDoc.data()

        } else {
          console.log("no such location document")
        }
      } catch (error) {
        console.log("error getting data from firestore:", error)
      }
      console.log(this.fsVersion.parts.location)
    },
    computed: {
      preClass() {
        return this.currentTab === 'pre' ? 'is-active' : ''
      },
      mainClass() {
        return this.currentTab === 'main' ? 'is-active' : ''
      },
      postClass() {
        return this.currentTab === 'post' ? 'is-active' : ''
      },
    },
    methods: {
      changeTab(tab) {
        this.currentTab = tab
      }
    }
  }
</script>