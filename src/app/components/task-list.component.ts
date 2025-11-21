import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-2">
      @if (taskService.totalCount() === 0) {
        <p class="text-center text-gray-500 py-8">No tasks yet. Add your first task above!</p>
      }
      @for (task of taskService.allTasks(); track task.id) {
        <div 
          class="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <input
            type="checkbox"
            [checked]="task.completed"
            (change)="taskService.toggleTask(task.id)"
            class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
            [attr.aria-label]="'Toggle task: ' + task.title"
          />
          <span
            [class.line-through]="task.completed"
            [class.text-gray-400]="task.completed"
            class="flex-1 text-gray-800"
          >
            {{ task.title }}
          </span>
          <button
            (click)="taskService.deleteTask(task.id)"
            class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            [attr.aria-label]="'Delete task: ' + task.title"
          >
            Delete
          </button>
        </div>
      }
    </div>
  `
})
export class TaskList {
  protected readonly taskService = inject(TaskService);
}
