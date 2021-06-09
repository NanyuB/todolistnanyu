import { Component } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tareas: { titulo: string; completa: boolean }[] = [];
  nuevatarea: string;
  tareaCompleta: { titulo: string; completa: boolean }[] = [];

  anadir() {
    if (this.isValid(this.nuevatarea)) {
      let tarea = { titulo: this.nuevatarea, completa: false };
      this.tareas.push(tarea);
      this.nuevatarea = '';
    }
  }
  borrar(tarea): void {
    this.tareas = this.tareas.filter(
      (i: { titulo: string; completa: boolean }) => i != tarea
    );
  }
  completarTarea(tarea): void {
    tarea.completa = !tarea.completa;
    this.tareas = this.tareas.filter(i => i != tarea);
    let tareaComp = { titulo: tarea.titulo, completa: true };
    this.tareaCompleta.push(tareaComp);
  }
  borrarCompletadas(tareaComp): void {
    this.tareaCompleta = this.tareaCompleta.filter(i => i != tareaComp);
  }
  descompletarTarea(tarea): void {
    tarea.completa = !tarea.completa;
    this.tareaCompleta = this.tareaCompleta.filter(i => i != tarea);
    let tareaComp = { titulo: tarea.titulo, completa: false };
    this.tareas.push(tareaComp);
  }

  isValid(titulo: string): boolean {
    if (!titulo) {
      alert('No se admiten tareas sin texto');
      return false;
    }
    if (this.tareas.some(i => i.titulo == titulo)) {
      alert('Esta tarea ya existe');
      return false;
    }
    if (titulo.length < 4) {
      alert('Minimo 4 caracteres');
      return false;
    }
    return true;
  }
  completarTodas(): void {
     this.tareas.forEach(tarea => this.completarTarea(tarea));
  }
  borrarTodo() : void {
    this.tareas = [];
    this.tareaCompleta = [];

  }
}
