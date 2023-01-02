<!-- <template>
  <h1 class="title"> {{ version.name }} </h1>
  <h5 class="subtitle"> Template: {{ tID }} Version: {{ vID }} </h5>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { collection, getDoc, doc } from 'firebase/firestore';
  import { db } from '../firebase/firebase';
  
  export default {
    data() {
      return {
      }
    },
    computed() {
      
    },
    setup() {
      const route = useRoute()
      const fullID = route.params.fullID
      const tID = fullID.slice(0,7)
      const vID = fullID.slice(8,12)
      
      class Deets {
        constructor(fields, instructions, parts) {
          this.fields=fields;
          this.instructions=instructions;
          this.parts=parts;
        }
      }

      onMounted(async () => {
        const versionDocRef = await getDoc(doc(db, "Templates/"+tID+"/versions/"+vID))
        const versionFields = versionDocRef.data()
        
        const instructionsCollectRef = collection(db, versionDocRef, "instructions")
        const timelineDocRef = getDoc(doc(db, instructionsCollectRef, "materials"))
        const rolesDocRef = getDoc(doc(db, instructionsCollectRef, "materials"))
        const instructObj = {
          timeline: timelineDocRef.data(),
          roles: rolesDocRef.data(),
        }
        
        const partsCollectRef = collection(db, versionDocRef, "roles")
        const locationDocRef = getDoc(doc(db, partsCollectRef, "location"))
        const materialsDocRef = getDoc(doc(db, partsCollectRef, "materials"))
        const partsObj = {
          location: locationDocRef.data(),
          materials: materialsDocRef.data(),
        }
        
        const version = new Deets(versionFields, instructObj, partsObj)
      })
    }
  }
</script>
 -->

<template>
<Suspense>
  <template #default>
    <h1 class="title"> {{ versionDeets.fields.name }} </h1>
    <h5 class="subtitle"> Template: {{ tID }} Version: {{ vID }} </h5>
    <h5 class="subtitle"> Fields: {{ versionDeets.fields }} </h5>
    <h5 class="subtitle"> Instructions: {{ instructions }} </h5>
    <h5 class="subtitle"> Parts: {{ parts }} </h5>
  </template>
  <template #fallback>
    Loading...
  </template>
</Suspense>
</template>

<script>
import { ref, watch, Suspense } from 'vue';
import { useRoute } from 'vue-router';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default {
  async setup() {
    const route = useRoute();
    const fullID = route.params.fullID;
    const tID = fullID.slice(0, 7);
    const vID = fullID.slice(8, 12);

    const versionDeets = ref({
      fields,
      instructions,
      parts,
    });

    // Add a loading state
    const loading = ref(true);

    // Fetch the version document
    const versionDocRef = await getDoc(doc(db, "Templates/" + tID + "/versions/" + vID));

    const versionFields = versionDocRef.data();

    // Fetch the instructions collection
    const instructionsCollectRef = collection(db, versionDocRef, "instructions");
    // Fetch the timeline and roles documents
    const timelineDocRef = getDoc(doc(db, instructionsCollectRef, "timeline"));
    const rolesDocRef = getDoc(doc(db, instructionsCollectRef, "roles"));

    // Wait for both documents to be fetched
    const [timeline, roles] = await Promise.all([timelineDocRef, rolesDocRef]);

    // Create the instructions object
    const instructions = {
      timeline: timeline.data(),
      roles: roles.data(),
    };

    // Fetch the parts collection
    const partsCollectRef = collection(db, versionDocRef, "parts");
    // Fetch the location and materials documents
    const locationDocRef = getDoc(doc(db, partsCollectRef, "location"));
    const materialsDocRef = getDoc(doc(db, partsCollectRef, "materials"));

    // Wait for both documents to be fetched
    const [location, materials] = await Promise.all([locationDocRef, materialsDocRef]);

    // Create the parts object
    const parts = {
      location: location.data(),
      materials: materials.data(),
    };

    // Assign a new Deets object to versionDeets
    versionDeets.value = {
      fields: versionFields,
      instructions,
      parts,
    };

    // Watch for changes to versionDeets and update loading state
    watch(
      () => versionDeets.value,
      () => {
        loading.value = false;
      }
    );

    return {
      versionDeets, // add versionDeets to the returned object
      loading, // add loading state to the returned object
      tID, // add tID to the returned object
      vID, // add vID to the returned object
      instructions, // add instructions to the returned object
      parts, // add parts to the returned object
    };
  },
  components: {
    Suspense,
  },
}
</script>