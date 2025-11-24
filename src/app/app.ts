import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Mi Web App DevOps</h1>
    @if(showNewWelcome){
      <div style="background-color: yellow; padding: 20px;">
        🚀 ¡NUEVA FUNCIONALIDAD ACTIVADA DESDE GITOPS! 🚀
      </div>
    }`,
  styleUrl: './app.css'
})
export class App {
  showNewWelcome = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Carga la configuración en tiempo de ejecución
    this.http.get<any>('/assets/config.json').subscribe(config => {
      this.showNewWelcome = config.showNewWelcome;
    });
  }
  // protected readonly taskService = inject(TaskService);
}
