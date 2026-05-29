import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  newText = '';
  editId: number | null = null;
  editText = '';

  constructor(private taskService: TaskService) {}

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

  get totalTasks(): number {
    return this.taskService.getTotalTasks();
  }

  get doneTasks(): number {
    return this.taskService.getDoneTasks();
  }

  addTask(): void {
    const text = this.newText.trim();

    if (text === '') {
      return;
    }

    this.taskService.addTask(text);
    this.newText = '';
  }

  toggleTask(task: Task): void {
    this.taskService.toggleTask(task.id);
  }

  startEdit(task: Task): void {
    this.editId = task.id;
    this.editText = task.text;
  }

  saveEdit(id: number): void {
    const text = this.editText.trim();

    if (text === '') {
      return;
    }

    this.taskService.updateTask(id, text);
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editId = null;
    this.editText = '';
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);

    if (this.editId === id) {
      this.cancelEdit();
    }
  }
}
