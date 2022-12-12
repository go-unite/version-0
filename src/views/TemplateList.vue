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
  <div v-for="template in templates" :key="template.name" class="card mb-5">
    <router-link :to="{path:'/templateView/'+template.name}">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column">
              {{ template.name }}
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { collection, doc, getDocs } from 'firebase/firestore';
  import { db } from '../firebase/firebase';

  const templates = ref([

  ]);

  onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, "Templates"))
    let fbTemplates = []
    querySnapshot.forEach((doc) => {
      const template = {
        name: doc.data().name,
        id: doc.id
      }
      fbTemplates.push(template)
    })
    templates.value = fbTemplates
  });
</script>