<template>
    <q-dialog v-model="dialog">
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div class="text-h6">내용 수정</div>
          <div class="text-subtitle2"> {{editTask.id}} </div>
        </q-card-section>
        <q-card-section>
          <q-input
          v-model="editTask.title"
          @keyup.enter="onOKClick"
          ></q-input>
        </q-card-section>
  
        <!-- buttons example -->
        <q-card-actions align="right">
          <q-btn
            color="primary"
            unelevated
            dense
            label="OK"
            @click="onOKClick"
          />
          <q-btn
            unelevated
            dense
            color="primary"
            label="Cancel"
            @click="onCancelClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  
  export default {
    name: "DialogCustom",
    props: ['editTask','origin'],//부모로부터 props로 건네받는 것
    emits: ['onInput'],//부모에게 전달할것
    data() {
      return {
        dialog: false,
      };
    },
    mounted(){
    },
    watch:{
    },
    methods: {
      onOKClick() {
        this.$emit('onInput',this.editTask);
        this.dialog = false;
      },
      onCancelClick() {
        this.editTask.title =this.origin,
        this.dialog = false;
      },
    },
  };
  </script>
  
  <style></style>