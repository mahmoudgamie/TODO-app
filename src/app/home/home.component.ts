import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/data-models/Todo';
import { TodoService } from 'src/services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoList: Todo[];
  deleteIndex: number;
  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  getDeleteIndex(index: number) {
    this.deleteIndex = index;
  }

  delete() {
    console.log('ih');
    
    this.todoService.deleteTodoItem(this.deleteIndex);
    this.router.navigate(['/home'])
  }

}
