<template>
    <div>

        <p class="homeText">
            Lisää tapahtuma
        </p>

        <div>
            <!-- Attach a submit event in the form with help of v-on directive -->
            <b-form v-on:submit.prevent="submit"  v-if="show">
                
                <b-form-group id="input-group-1">
                    <label for="input-1">Name <span class="text-danger">*</span></label>
                    <b-form-input id="input-1" v-model.trim="$v.form.name.$model" type="text" :class="{'is-invalid':validationStatus($v.form.name)}" placeholder="Enter name" ></b-form-input>
                    
                    <!-- display the validation error(s)  -->
                    <div v-if="!$v.form.name.required" class="invalid-feedback">The name field is required</div>
                    <div v-if="!$v.form.name.minLength" class="invalid-feedback">Name has to be atleast {{ $v.form.name.$params.minLength.min }} letters</div>
                </b-form-group>

                <b-form-group id="input-group-2">
                    <label for="input-1">Place <span class="text-danger">*</span></label>
                    <b-form-input id="input-2" v-model.trim="form.place" type="text" :class="{'is-invalid':validationStatus($v.form.place)}" placeholder="Enter place" ></b-form-input>
                    <div v-if="!$v.form.place.required" class="invalid-feedback">The place field is required</div>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>

            <b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ form }}</pre>
            </b-card>
        </div>

    </div>
</template>
<script>

/**
 ** $v model represent the current state of validation
 */

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vuelidate is an open source, lightweight library that helps us perform model validation with a variety of validation contexts.
// required and minLength are validators from vuelidate
import { required, minLength } from 'vuelidate/lib/validators'

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
    // Define validation rules for each key
    validations: {
        form: {
                name: {required, minLength: minLength(3)},
                place: {required},
            },
    },

    methods: {

        validationStatus: function(validation) {
            return typeof validation != "undefined" ? validation.$error : false;
        },

        submit: function() {
            // $touch() method will set true for the related models and its childrens
            this.$v.$touch();

            // Prevent the submission in case of any error
            if(this.$v.$pending || this.$v.$error) return;
            
            this.axios.post("http://localhost:3001/events/", this.form)
            .then((result) => {
                console.warn(result)
            })
            
            alert("data submit");

            this.$v.$reset();
            this.resetData();
        },

        resetData: function() {
            this.form.name = '';
            this.form.place = '';
        },

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