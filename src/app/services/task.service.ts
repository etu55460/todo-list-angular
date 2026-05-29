import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 1;

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(text: string): void {
    const task: Task = {
      id: this.nextId,
      text,
      done: false
    };

    this.tasks.push(task);
    this.nextId++;
  }

  updateTask(id: number, text: string): void {
    const task = this.tasks.find((task) => task.id === id);

    if (task) {
      task.text = text;
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleTask(id: number): void {
    const task = this.tasks.find((task) => task.id === id);

    if (task) {
      task.done = !task.done;
    }
  }

  getTotalTasks(): number {
    return this.tasks.length;
  }

  getDoneTasks(): number {
    return this.tasks.filter((task) => task.done).length;
  }
}
