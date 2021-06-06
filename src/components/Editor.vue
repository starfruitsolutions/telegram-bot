<template>
  <div>
    <v-col >
      <v-row>
        <v-btn @focus="refocus" @click="format('bold')"><v-icon>fa-bold</v-icon></v-btn>
        <v-btn @focus="refocus" @click="format('italic')"><v-icon>fa-italic</v-icon></v-btn>
        <v-btn @focus="refocus" @click="format('underline')"><v-icon>fa-underline</v-icon></v-btn>
        <v-btn @focus="refocus" @click="format('strikethrough')"><v-icon>fa-strikethrough</v-icon></v-btn>
        <v-btn @focus="refocus" @click="insertLink"><v-icon>fa-link</v-icon></v-btn>
        <v-btn @focus="refocus" @click="wrap('<code>', '</code>')"><v-icon small>fa-code</v-icon></v-btn>
        <v-btn @focus="refocus" @click="pickerOpen = !pickerOpen"><v-icon>fa-smile</v-icon></v-btn>
        <div>
          <Picker v-if="pickerOpen" @focus="refocus" :data="emojiIndex" set="twitter" @select="insertEmoji" class="floating"/>
        </div>
      </v-row>
    </v-col>
    <div
      ref="editor"
      id="editor"
      v-html="html"
      @input="update"
      contenteditable="true"
      class="pa-5 mt-1"
    />
  </div>
</template>

<script>
  //emoji picker
  import data from "emoji-mart-vue-fast/data/all.json"
  import "emoji-mart-vue-fast/css/emoji-mart.css"
  import { Picker, EmojiIndex } from "emoji-mart-vue-fast"
  let emojiIndex = new EmojiIndex(data)

  export default {
    components: {
      Picker
    },
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        html: '',
        output:'',
        pickerOpen: false,
        emojiIndex,
        emojisOutput: ''
      }
    },
    methods: {
      refocus(e) {
        e.relatedTarget.focus()
      },
      format(command) {
        document.execCommand(command,true,'' )
      },
      placeCursor(places){
        for(let position = 0; position != places; position++){
          window.getSelection().modify("move", "right", "character")
        }
      },
      insert(text) {
        let range = window.getSelection().getRangeAt(0)
        range.deleteContents()
        let node = document.createTextNode(text)
        range.insertNode(node)
        this.placeCursor(text.length-1)
      },
      insertEmoji(emoji) {
        this.insert(this.emojisOutput + emoji.native)
        this.pickerOpen = false
      },
      insertLink() {
        var url = prompt('Enter the URL: ', 'URL');
        document.execCommand("CreateLink", false, url);
      },
      wrap(start, end) {
        let selection = window.getSelection().getRangeAt(0).toString()
        let replacement = start + selection + end
        document.execCommand("insertHtml", false, replacement)
      },
      update () {
        let text = this.$refs.editor.innerHTML.replaceAll('<div>','\n\r')
        text= text.replaceAll('<br>','')
        text= text.replaceAll('</div>','')
        this.output = this.$refs.editor.innerHTML
        this.$emit('update', text)
      }
    },
    mounted(){
      this.html = this.text.replaceAll('\n\r','<br>')
    }
  }

</script>

<style scoped>
  .floating {
    position: absolute;
    z-index: 100;
  }
  #editor {
    border: 1px solid grey;
    border-radius: 4px;
    display: block;
    /*white-space: pre;*/
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
</style>
