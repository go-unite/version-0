<!-- TABS FOR SWITCHING BETWEEN DRAFTS AND TEMPLATES
<div id="temlateList" class="tabs is-toggle is-fullwidth">
    <ul>
      <li class="is-active">
      <a>
        <span>Drafts</span>
      </a>
    </li>
    <li>
      <a>
        <span>Live Templates</span>
      </a>
    </li>
    </ul>
  </div>
 
-->

<template>
  <div v-for="version in versions" :key="version.vID" class="card mb-5">
    <!-- <router-link :to="{ name: 'templateView' , params: {fullID: version.fullID} }"> -->
      <div class="card-header">
        <div class="card-header-title">
          <div class="columns is-mobile is-vcentered">
            <div class="column">
              {{version.fullID}}
            </div>
          </div>
        </div>
      </div>
    <!-- </router-link> -->
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../firebase/firebase';

  const versions = ref([

  ]);

  onMounted(async () => {
    const templatesCollection = await getDocs(collection(db, "Templates"))
    
    let fbTemplates = []
    let allVersions = []
    
    templatesCollection.forEach((doc) => {
      const tID = doc.id
      fbTemplates.push(tID)
    })
    
    fbTemplates.forEach(async (fbTemp) => {      
      const versionsSubCollect = await getDocs(collection(db, "Templates/"+fbTemp+"/versions"))
      versionsSubCollect.forEach((doc) => {
        const ver = {
          tID: fbTemp,
          vID: doc.id,
          title: doc.data().title,
          fullID: fbTemp + "." + doc.id
        }
        allVersions.push(ver)
      })
    })
    console.log(allVersions)
    versions.value = allVersions
  });
</script>