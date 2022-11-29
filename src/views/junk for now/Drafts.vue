<template>
  <h2>Drafts</h2>
  <div v-for="draft in drafts" class="box">
    <div class="card-content">
      <div class="content">
        
      </div>
    </div>  
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
/*  import { collection, getDoc, db, doc } from '../firebase/firebase.js'

   const testemplates = collection(db, "testing")
  
  onMounted(async () => {
    const docSnap = await getDoc(docRef)
    console.log(docSnap.data())
  }) */
</script>