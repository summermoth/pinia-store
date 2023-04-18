<template>
    <!--Todo insert (데이터 input, 저장 버튼)-->
   <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        bg-color="white"
        filled
        aria-placeholder="Add task"
        dense
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add"></q-btn>
        </template>
      </q-input>
    </div>

    <!--todo list(리스트 형태로 내용보이기)-->
    <q-list class="bg-white" separator bordered>
        <q-item
        v-for="item in tasks"
        :key="item.title"
        @click="item.done = item.done == 'Y' ? 'N' : 'Y'"
        :class="{ 'done bg-blue-1': item.done == 'Y' }"
        v-ripple
        clickable
        >
        <q-item-section avatar>
            <q-checkbox
            v-model="item.done"
            color="primary"
            class="no-pointer-event"
            true-value="Y"
            false-value="N"
            dense
            ></q-checkbox>
        </q-item-section>
        <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>

        <!--todo delete(삭제버튼)-->
        <q-item-section v-if="item.done=='Y'" side>
            <q-btn
                flat
                round
                dense
                color="red"
                icon="delete"
                @click.stop="removeItem(item.id)"
            ></q-btn>
        </q-item-section>

        <!--todo edit(수정아이콘 추가)-->
        <q-item-section v-if="item.done=='Y'" side>
            <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit"
            @click.stop="openDialog(item)"
            ></q-btn>
        </q-item-section>
    </q-item>
  </q-list>
  <!--todo edit(컴포넌트 3번 추가)-->
  <dialog-custom ref="dialog" :edit-task="editTask" :origin="origin" @onInput="editTodo">
  </dialog-custom>
  </q-page>

  
  </template>
  
  <script>
  //Todo insert(데이터 input, 저장버튼)
  import useTodoStore from "src/stores/todo";
  import { mapActions, mapState } from "pinia";
  //todo edit(다이얼로그 불러오기-컴포넌트 1번 추가)
  import DialogCustom from "components/DialogCustom.vue";
  
  export default {

    name: "Todo",
    title: "Todo list",
    //todo edit(다이얼로그 불러오기_컴포넌트 2번 추가)
    components:{DialogCustom},
    data() {
      return {
        newTask: "",
        editTask:null,//todo edit(props부분_부모로부터 받을 것)
        origin:null,//todo edit(props부분_부모로부터 받을 것)
      };
    },
    computed: {
      ...mapState(useTodoStore, ["tasks"]),
    },
    mounted() {
    //list todo(데이터 유지)
    this.listTodo();
    },
    methods: {
    ...mapActions(useTodoStore, ["insertTodo", "removeTodo", "listTodo","editTodo"]),
      async addTask() {
        if(this.newTask){
          this.insertTodo(this.newTask);
          await this.$q.notify({
              message: `${this.newTask} 추가하셨습니다`,
              icon:"home",
              color: "primary",
          });
          this.newTask="";
        }else{
          await this.$q.notify({
                message: `내용은 필수입력입니다`,
                icon:"warning",
                color: "red",
            });
        }
      },
      removeItem(id){
        this.removeTodo(id);
        this.newTask="";
        },
        
      openDialog(item) {
	      this.$refs.dialog.dialog = true; 
	      this.editTask = item;  
	      this.origin = this.editTask.title; 
	    },

    },


  }
  </script>

<!--추가한 내용 리스트 형태로 보이기-->
  <style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-tasks {
  opacity: 0.5;
}
</style>
