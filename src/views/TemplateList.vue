<template>
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
  </div> -->

  <div v-for="template in templates">
    <div class="card mb-5">
      <div class="card-content">
        <div class="content">
          <div class="column is mobile is-vcentered">
            <div class="column">
              {{ template.name }}
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { collection, getDoc, doc } from 'firebase/firestore'
  import { db } from '../firebase/firebase'

  const templates = ref([
    
  ])

  onMounted(async () => {
    const querySnapshot = await getDoc(collection(db, "Templates"))
    let fbTemplates = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())
      const template = {
        name: doc.name
      }
      fbTemplates.push(template)
    })
    templates.value = fbTemplates
  })
</script>