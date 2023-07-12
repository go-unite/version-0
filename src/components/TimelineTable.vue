<template>
  <div class="block">
    <div class="title is-5">Timeline</div>
    <div class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(note, key) in currentTimeline" v-bind:key="key">
          <th> {{ key }} </th>
            <td> {{ note.data }} </td>
        </tr>
        <tr>
          <template v-if="!newHap.show">
            <td  @click="toggleAddNewHap">[icon]</td>
            <td  @click="toggleAddNewHap"> add new </td>
          </template>
          <template v-else>
            <td>
              <select name="start.prep" id="start.prep" v-model="newHap.timestamp.start.prep">
                <option value=true> - </option>
                <option value=false> + </option>
              </select>
              <input type="text" maxlength="11" placeholder="DD:HH:MM:SS" v-model="formattedTS_start" @input="updateTS_start" @blur="calcTSnum" />
              <select v-if="newHap.timestamp.TSrange" name="end.prep" id="end.prep" v-model="newHap.timestamp.end.prep">
                <option value=true> - </option>
                <option value=false> + </option>
              </select>
              <input v-if="newHap.timestamp.TSrange" type="text" maxlength="11" placeholder="DD:HH:MM:SS" v-model="formattedTS_end" @input="updateTS_end" @blur="calcTSnum" />
              <input type="checkbox" v-model="newHap.timestamp.TSrange" />
            </td>
            <td>
              <input type="text" placeholder="describe what happens here" v-model="newHap.note"/>
            </td>
            <td>
              <button @click="confirm">ADD</button>
              <button @click="reset">x</button>
            </td>
          </template>
        </tr>
        <tr>
          
        </tr>
      </tbody>
    </div>
<!--
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
      
    </div>
    <div v-if="currentTab === 'main'" class="">
      
    </div>
    <div v-if="currentTab === 'post'" class="">
    -->
  </div>
  <div class="box">
    
  </div>
</template>

<script>
  export default {
    name: "TimelineTable",
    props: ['currentVersionData'],
    data() {
      return {
        currentTab: "pre",
        currentTimeline: {},
        newTimeline: {},
        newHap: {
          show: false,
          timestamp: {
            TSrange: false,
            start: {
              prep: true,
              num: ""
            },
            end: {
              prep: true,
              num: ""
            },
          },
          note: ""
        }
      }
    },
    mounted() {
      this.currentTimeline = this.currentVersionData
    },
    computed: {
      formattedTS_start: {
        get() {
          let value = this.newHap.timestamp.start.num
          if(!value) {
            return ''
          }
          let formattedTS_start = value
            .match(/.{1,2}/g)
            .join(':')
          return formattedTS_start
        },
        set(value) {
          this.newHap.timestamp.start.num = value.replace(/:/g, '')
        }
      },
      formattedTS_end: {
        get() {
          let value = this.newHap.timestamp.end.num
          if(!value) {
            return ''
          }
          let formattedTS_end = value
            .match(/.{1,2}/g)
            .join(':')
          return formattedTS_end
        },
        set(value) {
          this.newHap.timestamp.end.num = value.replace(/:/g, '')
        }
      },
        /*       
          preClass() {
            return this.currentTab === 'pre' ? 'is-active' : ''
          },
          mainClass() {
            return this.currentTab === 'main' ? 'is-active' : ''
          },
          postClass() {
            return this.currentTab === 'post' ? 'is-active' : ''
          }
        */
    },
    methods: {
    /* changeTab(tab) {
      this.currentTab = tab
    } */
      toggleAddNewHap() {
        this.newHap.show = !this.newHap.show;
      },
      updateTS_start(event) {
        this.formattedTS_start = event.target.value
      },
      updateTS_end(event) {
        this.formattedTS_end = event.target.value
      },
      confirm () {
        let hapID = "";
        if(this.newHap.timestamp.start.prep)
          hapStart = "+"+this.newHap.timestamp.start.num;
        else
          hapStart = "-"+this.newHap.timestamp.start.num;
        if(this.newHap.timestamp.end.prep)
          hapEnd = "+"+this.newHap.timestamp.end.num;
        else
          hapEnd = "-"+this.newHap.timestamp.end.num;
        let hapToEmit = {
          hapID: "",
          start: "",
          end: "",
          note: ""
        }
        this.$emit('addNewHap' , hapToEmit);
      },
      reset() {
        this.newHap = {
          show: false,
          timestamp: {
            TSrange: false,
            start: {
              prep: true,
              num: ""
            },
            end: {
              prep: true,
              num: ""
            },
          },
          note: ""
        };        
      },
      calcTSnum(event) {
        let time = event.target.value.split(":");
        let seconds = parseInt(time[3]);
        let minutes = parseInt(time[2]);
        let hours = parseInt(time[1]);
        let days = parseInt(time[0]);
        while (seconds >= 60) {
          seconds -= 60;
          minutes += 1;
        }
        while (minutes >= 60) {
          minutes -= 60;
          hours += 1;
        }
        while (hours >= 24) {
          hours -= 24;
          days += 1;
        }
        time = `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        event.target.value = time;
      }
    }
  }
</script>