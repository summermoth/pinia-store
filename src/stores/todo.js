import { defineStore } from "pinia";
import { uid } from "quasar";
import { LocalStorage } from 'quasar'

//Todo insert(데이터 input, 저장버튼)
export default defineStore("useTodo", {

  state:()=>({
    tasks:[],
  }),

  getters : {

  },

  actions: {
    insertTodo(title){
      if(this.tasks){
        this.tasks.unshift({
          id: uid(),
          title,
          done:'N'
        });
      }else{
        this.tasks=[];
        this.tasks.push({
          id: uid(),
          title,
          done:'N'
        })
      }

      LocalStorage.set("todo", this.tasks);
    },

    //remove Todo(삭제)
    removeTodo(id){
        
        const idx = this.tasks.findIndex(task=>task.id == id);
        this.tasks.splice(idx,1);
        LocalStorage.set("todo", this.tasks);
    },

    //todo delete(remove)
    removeTodo(id){
       
        const idx = this.tasks.findIndex(task=>task.id == id);
        this.tasks.splice(idx,1);
        LocalStorage.set("todo", this.tasks);
      },

    //list todo(데이터 유지)
    listTodo(){
        this.tasks = LocalStorage.getItem("todo");
    },
    
    //edit Todo(수정하기)
    editTodo(item){
        
        const idx = this.tasks.findIndex(task=>task == item);
        item.done = 'N';
        this.tasks.splice(idx,1,item); 
        LocalStorage.set("todo", this.tasks);
    }
    
  }
})