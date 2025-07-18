import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatInput} from "@angular/material/input";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    RouterLink,
    MatIcon,
    MatInput,
    MatButtonModule,
  ],
  templateUrl: './add-tasks.component.html',
  styleUrl: './add-tasks.component.scss'
})
export class AddTasksComponent implements OnInit {
  taskForm!: FormGroup;



  constructor(
      private fb: FormBuilder,
      private taskService: TaskService,
      private router: Router,
      private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

    save(): void {
      if (this.taskForm.invalid)
        return;
      this.taskService.addTask(this.taskForm.value).subscribe({

        next: () => {
          this.snackBar.open('la taches est ajouté avec succès.', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/list-tasks']);

        },

        error: (err) => {
          console.error('Erreur lors de l’ajout', err);
          this.snackBar.open(`Erreur lors de l’ajout d'une tache.`, 'Fermer', {
            duration: 3000
          });
        }
      });
    }

  reset(): void {
    this.taskForm.reset();
  }


}
