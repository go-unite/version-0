<template>
    <div class="card mb-5">
        <div class="card-content">
            <div v-if="!showForm">
                <span class="icon-text" @click="toggleForm">
                    <span class="icon-text">
                        <span class="icon">
                            <span class="material-icons">add</span>
                        </span>
                        <span>add new</span>
                    </span>
                </span>
            </div>
            <div v-show="showForm">
                <template v-if="type === 'role'">
                    <div>
                        <input type="text" placeholder="search for a role" v-model="newData[type].roleID" />
                        <button @click="confirm">Confirm</button>
                        <button @click="resetCard">X</button>
                    </div>
                </template>
                <template v-if="type === 'material'">
                    <div>
                        <!-- another search for materials -->
                        <input type="text" placeholder="search for a material" v-model="newData[type].materialID" />
                        <input type="range" class="slider" v-model="newData[type].need.quantity" />
                        <!-- autofill measure field and display -->
                        <button @click="confirm">Confirm</button>
                        <button @click="resetCard">X</button>
                    </div>
                </template>
                <template v-if="type === 'spot'">
                    <div>
                        <!-- name of the spot -->
                        <input type="text" placeholder="name of your spot" v-model="newData[type].spotName" />
                        <!-- number of people expected to be here at any one time -->
                        <input type="range" class="slider" v-model="newData[type].maxPost" />
                        <!-- percentage of total attendees visit this spot throughout the event -->
                        <input type="range" class="slider" min=".25" max="1" step=".25" v-model="newData[type].totalVisitors" />
                        <button @click="confirm">Confirm</button>
                        <button @click="resetCard">X</button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddNewCard",
    props: {
        type: String,
    },
    data() {
        return {
            showForm: false,
            newData: {
                role: {
                    roleID: ""
                },
                material: {
                    materialID: "",
                    need: {
                        quantity: Number,
                        measure: ""
                    }
                },
                spot: {
                    spotName: "",
                    maxPost: Number,
                    totalVisitors: Number
                }
            }
        }
    },
    methods: {
        toggleForm() {
            this.showForm = !this.showForm;
        },
        confirm() {
            switch(this.type) {
                case 'role':
                    this.$emit('addRole', this.newData.role);
                    break;
                case 'material':
                    this.$emit('addMaterial', this.newData.material);
                    break;
                case 'spot':
                    this.$emit('addSpot', this.newData.spot);
                    break;
                default:
                    break;
            }
            this.resetCard();
        },
        resetCard() {
            switch(this.type) {
                case 'role':
                    this.newData.role = {
                        roleID: ""
                    }
                    break;
                case 'material':
                    this.newData.material = {
                        materialID: "",
                        need: {
                            quantity: Number,
                            measure: ""
                        }
                    }
                    break;
                case 'spot':
                    this.newData.spot = {
                        spotName: "",
                        maxPost: Number,
                        totalVisitors: Number
                    }
                    break;
                default:
                    break;
            }            
            this.showForm = false;
        }
    }
}
</script>
