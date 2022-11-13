<template>
  <div v-for="template in templates" class="box">
    <div class="card-content">
      <div class="content">
        {{ template.content }}
      </div>
    </div>  
  </div>
</template>

<script setup>
  import { doc, getDoc } from '../firebase/firebase.js'
  import { onMounted, ref } from 'vue'
  import {  } from '../firebase/firebase.js'

  const templates = collection(db, [
 /*    {
      id: 'id1',
      content: 'Garbage Pickup',
    },
    {
      id: 'id2',
      content: 'Another thing',
    } */
  ])
  
  onMounted(async () => {
   /*  const querySnapshot = await getDocs(collection(db, "Prototype"));
    let fbTemplates = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data())
      const template = {
        id: doc.id,
        name: doc.data().conent,
        steps: doc.data().conent
      }
      fbTemplates.push(template)
    })
    todo.value = fbTemplates */
    const fbTemplates = []
    QuerySnapshot.forEach((doc) => {
      const template = {
        id: doc.id,
        name: doc.data().name,
        steps: doc.data().steps
      }
      fbTemplates.push(template)
    })
    templates.value = fbTemplates
  })
</script>