import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/data-models/Todo';
import { TodoService } from 'src/services/todo.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { User } from 'src/data-models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todoList: Todo[];
  deleteIndex: number;
  currentUser: User;
  constructor(private todoService: TodoService, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  getUserName(id: number): User {
    return this.usersService.getUserById(id)
  }


  delete() {
    this.todoService.deleteTodoItem(this.deleteIndex);
    this.router.navigate(['/home'])
  }

  checkPrivilege(createdByUserId: number): boolean {
    if (this.currentUser.role === "ADMIN") {
      return true
    }
    if (this.currentUser.role === "CONTRIBUTOR") {
      if (createdByUserId == this.currentUser.id) {
        return true;
      }
    }
    return false;
  }

}
