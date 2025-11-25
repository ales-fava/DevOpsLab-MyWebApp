import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskForm } from './components/task-form.component';
import { TaskList } from './components/task-list.component';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, TaskForm, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showNewWelcome = false;
  protected readonly http = inject(HttpClient);
  protected readonly taskService = inject(TaskService);  

  ngOnInit() {
    // Carga la configuración en tiempo de ejecución
    this.http.get<any>('/assets/config.json').subscribe(config => {
      this.showNewWelcome = config.showNewWelcome;
    });
  }
  
}
