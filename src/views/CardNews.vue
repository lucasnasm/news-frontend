<template>
  <v-content>
 
    <v-container fluid>
      <v-row justify="center" >     
        <v-col   class="d-flex" cols="5" sm="3" md="2">
            <v-select @change="postSite" solo  label="Selecionar Site" v-model="siteSelected" :items="site" item-text="name" item-value="id" return-object></v-select>   
        </v-col>
        <v-col class="d-flex" cols="5" sm="3" md="2"  v-if="filtercategorie != 0">
          <v-select @change="postSiteCat"  solo="" label="Selecionar Categoria" v-model="catSelected" :items="filtercategorie"  item-text="name" ></v-select>
        </v-col>
    </v-row>
      </v-container>
   
 
     <v-container>
  <v-row justify="center" v-for="(infos, index) in infonews" v-bind:key="index">    
    <v-col>
        <v-card
        class="mx-auto"
        outlined=""
        :href="infos.url"
        target="_blank"
        >
  
        <v-list-item three-line >
            <v-list-item-avatar
              tile
              size="80"        
              >            
                <v-img :src="infos.image"></v-img>
            </v-list-item-avatar>
             <v-list-item-content >
                <div class="overline mb-4">
                  <v-chip color="primary"  x-small > Hoje </v-chip>
                </div>

              <p v-if="$vuetify.breakpoint.xsOnly" class="black--text">{{infos.title}}</p>
              

              <v-list-item-title class="headline mb-1" v-if="$vuetify.breakpoint.lgOnly">{{infos.title}}</v-list-item-title>
              <v-list-item-subtitle v-if="$vuetify.breakpoint.lgOnly">{{infos.subtitle}}</v-list-item-subtitle>
            </v-list-item-content>


          </v-list-item>
        

       </v-card>
      </v-col>
        
        
    </v-row>
    </v-container>

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      Esse crawler não é o Google!!!
    </v-overlay>
 
  
  
  
  </v-content>

</template>

<script>
import api from "@/services/api"

export default {
 
  data(){
    return{
      //sites_cat: null,
      info: null,
      siteSelected: null,
      infonews: null,
      categorie: null,
      catSelected: null,
      site: null,
      overlay: false

    }
  },
  created(){
    this.loadInfo()
  },
  methods: {

    loadInfo(){
       api
      .get('/sites')
      .then(response => {
        this.site = response.data.sites
        this.categorie = response.data.categories
      })
    },

    postSiteCat() {
      this.overlay=true
        api
        .post('/', {
          site: this.siteSelected.name,
          theme: this.catSelected
      })
      .then(response => (this.overlay=false,this.infonews = response.data))
      },
      postSite(){
      if(this.filtercategorie <= 0){
          this.postSiteCat()
      }
    }
  },

   computed: {
      filtercategorie(){
        if (this.siteSelected){
          return this.categorie.filter(o => o.ref === this.siteSelected.id)
        }else{
          return false
        }
      }
   }
  
}
</script>

<style scoped>
a {
  text-decoration: none ;
}

</style>