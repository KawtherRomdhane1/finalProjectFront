import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {TasksService} from "../../../../admin/apps/tasks/tasks.service";
import {CommonModule} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-add-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    RouterLink,
    MatIcon,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-tasks.component.html',
  styleUrl: './add-tasks.component.scss'
})
export class AddTasksComponent implements OnInit {
  taskForm!: FormGroup;


  constructor(
      private fb: FormBuilder,
      private tasksService: TasksService,
      private router: Router,
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators]],
    });
  }

    save(): void {
      if (this.taskForm.valid)
      this.tasksService.addtask(this.taskForm.value).subscribe(() => {
        this.router.navigate(['/list-tasks']);
      });
    }
  }

  //   this.tasksService.addtask(this.taskForm.value).subscribe({
  //     next(){
  //       this.snackBar.open('la taches est ajouté avec succès.', 'Fermer', {
  //         duration: 3000
  //       });
  //       this.router.navigate(['/list-tasks']); // rediriger vers la liste après ajout
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de l’ajout', err);
  //       this.snackBar.open(`Erreur lors de l’ajout d'une tache.`, 'Fermer', {
  //         duration: 3000
  //       });
  //     }
  //   });
  // }

  reset(): void {
    this.taskForm.reset();
  }


}
