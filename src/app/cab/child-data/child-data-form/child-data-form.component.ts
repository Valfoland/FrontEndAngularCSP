import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { ChildData } from 'src/app/cab/models/child.model';
import { ChildService } from '../../services/child.service';

@Component({
  selector: 'app-child-data-form',
  templateUrl: './child-data-form.component.html',
  styleUrls: ['./child-data-form.component.css']
})
export class ChildDataFormComponent implements OnInit {

  constructor(public service: ChildService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
      this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postChild().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Пациент успешно добавлен');
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.childData = new ChildData();
  }

}
