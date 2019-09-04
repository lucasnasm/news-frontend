<template>

    <v-container>
      <v-row>
              <v-container>
                   <p class="text-center display-1">Selecione</p>
      <v-row>
       <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="sites_cat"
          label="Selecionar site"
          solo
          v-model="ssite"
          @change="siteNews"

        ></v-select>
      </v-col>

     <v-col class="d-flex" cols="12" sm="6" v-if="ssite == 'Omelete'">
        <v-select
          :items="category"
          label="Selecionar Categoria"
          solo
          v-model="stheme"
          @change="postNews"
        ></v-select>
      </v-col>
    </v-row>


      </v-container>
   
 
      </v-row>
      <v-row v-for="info in infonews" v-bind:key="info.title">
        
        <v-col>
              <v-card
            color="#fb8b00"
            dark
          >
            <v-list-item three-line>
                  <v-list-item-avatar
                size="125"
                tile
              >
                <v-img :src="info.image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="align-self-start">
                <v-list-item-title
                  class="headline mb-2"
                  v-text="info.title"
                ></v-list-item-title>

                <v-list-item-subtitle v-text="info.subtitle"></v-list-item-subtitle>
                
              </v-list-item-content>
              <v-list-item-action><a :href="info.url" target="_blank">Ir para site</a></v-list-item-action>

              

          
            </v-list-item>
          </v-card>
        </v-col>
        
        
      </v-row>


  
    </v-container>

</template>

<script>
import api from "@/services/api"

export default {
 
  data(){
    return{
      //sites: null,
      //category: null,
      sites_cat: null,
      infonews: null,
      ssite: null,
      stheme: null
    }
  },
  created() {
    
       api
      .get('/sites')
      .then(response => (this.sites_cat = response.data[0].sitesTheme, console.log(response)))
      
  
  },
  methods: {
  

    postNews() {
      api
      .post('/', {
        site: this.ssite,
        theme: this.stheme
    })
    .then(response => (this.infonews = response.data))
    },

    siteNews(){
      if(this.ssite != 'Omelete'){
        
        this.postNews()
      }else{
        this.stheme = 'Selecionar Categoria'
        this.infonews = null
      }
    }
  }
  
}
</script>

<style  scoped>
a {
  text-decoration: none ;
}
</style>