import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  deleteTodo(todo: Todo) {
    this.todoService
      .deleteTodo(todo)
      .subscribe(
        () => (this.todos = this.todos.filter((t) => t.id !== todo.id))
      );
  }
  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateCompleted(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe((todo) => this.todos.push(todo));
  }
}
