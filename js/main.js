(function() {
    "use strict";

    let vm = new Vue({
        el: "#app",
        data: {
            newItem: "",
            todos: []
        },
        watch: {
            todos: {
                handler: function() {
                    localStorage.setItem("todos", JSON.stringify(this.todos));
                },
                deep: true
            }
        },
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        },
        methods: {
            addItem: function() {
                if (this.newItem === "") {
                    alert("Todoを入力してください");
                    return;
                }
                let item = {
                    title: this.newItem,

                    // エラー箇所
                    stateIs: {
                        done: "完了",
                        yet: "未着手",
                        doing: "途中"
                    } // エラー箇所

                    // isDone: "false"
                };
                this.todos.push(item);
                this.newItem = "";
            },
            deleteItem: function(index) {
                if (confirm("are you sure??")) {
                    this.todos.splice(index, 1);
                }
            },
            purge: function(index) {
                if (!confirm("delete finished??")) {
                    return;
                }
                this.todos = this.remaining;
            }
        },
        computed: {
            remaining: function() {
                return this.todos.filter(function(todo) {
                    return !todo.isDone;
                });
            }
        }
    });
})();