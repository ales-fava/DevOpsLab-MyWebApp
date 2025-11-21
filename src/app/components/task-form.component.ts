import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="flex gap-2">
      <input
        type="text"
        id="new-task-input"
        name="newTask"
        [formControl]="taskControl"
        placeholder="Enter a new task..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        [attr.aria-label]="'New task input'"
      />
      <button
        type="submit"
        [disabled]="!taskControl.valid"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Add Task
      </button>
    </form>
  `
})
export class TaskForm {
  private readonly taskService = inject(TaskService);
  
  protected readonly taskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  protected onSubmit(): void {
    const title = this.taskControl.value.trim();

    console.log('Submitting new task:', title);

    if (title) {
      this.taskService.addTask(title);
      this.taskControl.reset();
    }
  }
}
