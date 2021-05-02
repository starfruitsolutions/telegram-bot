<template>
  <div>
    <h4 class="my-5">Data Sources</h4>
    <v-btn @click="dialog=true"> Add source</v-btn>
    <Modal
      :visible="dialog"
      :ok-visible="true"
      :cancel-visible="true"
      ok-text="Save"
      title="Create"
      @ok="save"
      @cancel="close"
    >
      <v-text-field
        v-model="editedItem.method"
        :rules="[validationRules.required]"
        label="Method"
        prepend-icon="fa-robot"
      />
      <v-text-field
        v-model="editedItem.url"
        label="URL"
        prepend-icon="fa-file-alt"
      />
    </Modal>
    <div v-if="command.sources">
      <Card
        v-for="source in command.sources.items"
        :margins="false"
        :key="source.id"
      >
        <v-row align="center">
            {{ source.method }} {{ source.url }}
          <v-spacer/>
          <v-btn
            icon
            color="orange"
            @click="editItem(props.index)"
          >
            <v-icon dark>
              fa-edit
            </v-icon>
          </v-btn>
          <v-btn
            icon
            color="red"
            @click="deleteSource(source)"
          >
            <v-icon dark>
              fa-times
            </v-icon>
          </v-btn>
        </v-row>
      </Card>
    </div>
  </div>
</template>

<script>
  import { API } from 'aws-amplify'
  import {createSource, updateSource, deleteSource} from '@/graphql/mutations'

  export default {
    props: {
      command: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        editedIndex: -1,
        editedItem: {},
        dialog: false
      }
    },
    methods: {
      async save () {
        if (this.editedItem.id){
          await this.updateSource(this.editedItem)
        }
        else{
          await this.createSource(this.editedItem)
        }
        this.close()
      },
      async createSource (source) {
        await API.graphql({
          query: createSource,
          variables: {input: {sourceCommandId: this.command.id, ...source}}
        })
      },
      async updateSource (source) {
        await API.graphql({
          query: updateSource,
          variables: {input: {id: this.command.id, ...source}}
        })
      },
      async deleteSource (source) {
        let confirmation = confirm('Are you sure you want to delete this?')
        if (confirmation) {
          await API.graphql({
            query: deleteSource,
            variables: {
              input: {id: source.id}
            }
          })
        }
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
    }
  }

</script>
