import { computed, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>([]);
  private nextId = signal(1);

  readonly allTasks = this.tasks.asReadonly();
  readonly completedCount = computed(() => 
    this.tasks().filter(task => task.completed).length
  );
  readonly activeCount = computed(() => 
    this.tasks().filter(task => !task.completed).length
  );
  readonly totalCount = computed(() => this.tasks().length);

  addTask(title: string): void {
    console.log('Adding task:', title);

    const newTask: Task = {
      id: this.nextId(),
      title,
      completed: false,
      createdAt: new Date()
    };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.nextId.update(id => id + 1);
  }

  toggleTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  deleteTask(id: number): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  clearCompleted(): void {
    this.tasks.update(tasks => tasks.filter(task => !task.completed));
  }
}
