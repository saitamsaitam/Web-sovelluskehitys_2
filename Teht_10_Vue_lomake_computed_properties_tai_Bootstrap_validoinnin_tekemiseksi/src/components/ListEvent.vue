<template>
  <div>
    <div>
      <p class="homeText">Listaa tapahtumia</p>
    </div>

    <!-- <div v-for="item in notes" :key="item.id">
      <p name="name">{{ item.name }}</p>
      <p name="place">{{ item.place }}</p>
    </div> -->

    <div>
      <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'ListEvent',
  data() {
    return {
      notes: null,
      items: [],
      fields: [
        {
          key: 'name',
          sortable: true,
          //thStyle: { backgroundColor: 'white'} //toimii
          thClass: 'table-dark',
          tdClass: 'table-danger',

        },
        {
          key: 'place',
          sortable: true,
          // variant: 'dark'
          thClass: 'table-dark',
          tdClass: 'table-info',
        },
      ]
    }
  },
  mounted() {
    axios.get('http://localhost:3001/events')
      .then(response => {
        this.items = response.data
        console.log(this.notes);
      })
      .catch(function(err) {
        console.log(err);
      })
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