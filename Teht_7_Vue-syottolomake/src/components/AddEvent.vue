<template>
    <div>

        <p class="homeText">
            Lisää tapahtuma
        </p>

        <div>
            <b-form @submit="postData" method="post" @reset="onReset" v-if="show">

                <b-form-group id="input-group-1" label="Name:" label-for="input-1" description="nimiii">
                    <b-form-input id="input-1" v-model="form.name" type="name" placeholder="Enter name" required>

                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Place:" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.place" type="place" placeholder="Enter place" required>

                    </b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>

            </b-form>

            <b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ form }}</pre>
            </b-card>

        </div>


    </div>
</template>
<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

export default {
    name: 'AddEvent',
    data() {
        return {
            form: {
                name: '',
                place: '',
            },
            show: true
        }
    },
    methods: {
        postData(event) {
            this.axios.post("http://localhost:3001/events/", this.form)
            .then((result) => {
                console.warn(result)
            })
            event.preventDefault();
            alert(JSON.stringify(this.form))
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.name = ''
            this.form.place = ''

            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
};
</script>
<style scoped>
.homeText {
    font-size: 35px;
    color: red;
    text-align: center;
    position: relative;
    text-shadow: 2px 2px 2px gray;
}
</style>