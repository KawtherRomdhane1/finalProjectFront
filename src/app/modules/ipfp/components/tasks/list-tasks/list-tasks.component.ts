import {Component, OnInit} from '@angular/core';
import {TaskModel} from "../../../models/task.model";
import {TaskService} from "../../../services/task.service";
import {MatButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
      MatButton,
      MatDrawerContainer,
      MatIcon,
      MatTooltip,
      NgForOf,
      NgIf,
      RouterLink,

  ],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss'
})
export class ListTasksComponent implements OnInit {
  tasks: TaskModel[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des taches';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteTask(tasksId: number): void {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette taches ?');
    if (confirmDelete) {
      this.taskService.deleteTask(tasksId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(tasks => tasks.id !== tasksId);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Une erreur est survenue lors de la suppression.');
        }
      });
    }
  }
}
