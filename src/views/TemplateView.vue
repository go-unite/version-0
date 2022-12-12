<template>


  <div class="box">
    <!-- title -->
  </div>
  <div class="box">
    <!-- banner icon -->
  </div>
  <div class="box">
    <!-- outline -->
  </div>
  <div class="box">
    <!-- roles/tasks -->
    <div class="box">
      <!-- pre -->
    </div>
    <div class="box">
      <!-- event -->
    </div>
    <div class="box">
      <!-- post -->
    </div>
    <!-- end of roles/tasks -->
  </div>
  <div class="box">
    <!-- buttons -->
    <button>Invite Colaborators</button>
    <button>Publish to database</button>
  </div>
</template>

<script>
  import { ref, onMounted} from 'vue';
  import { collection, doc, getDocs, get } from 'firebase/firestore';
  import { db } from '../firebase/firebase';

  /* const details = ref([

  ]);

  onMounted(async () => {
    let fbDetails = []
    const querySnapshot = await getDocs(collection(db, 'Templates', this.$route.parms.id))
    console.log(templateId)
    querySnapshot.forEach((doc) => {
      const detail = {
        id: doc.id,
        name: doc.data().name,
      }
      fbDetails.push(detail)
    })
    details.value = fbDetails
  });

  export default {
    computed:{
      templateId(){
        return parseInt(this.$route.params.id)
      },
      template(){
        return 
      }
    }
  } */
</script>
