<template>
  <h1 class="title"> {{ $route.params.fullID}} </h1>
  <h2 class="subtitle">Pick a version</h2>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import { collection, doc, getDocs } from 'firebase/firestore';
  import { db } from '../firebase/firebase';

  const templates = ref([

  ]);
/* 
  onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, "Templates"))
    let fbTemplates = []
    querySnapshot.forEach((doc) => {
      const template = {
        title: doc.data().title,
        id: doc.id
      }
      fbTemplates.push(template)
    })
    templates.value = fbTemplates
  }); */
</script>
