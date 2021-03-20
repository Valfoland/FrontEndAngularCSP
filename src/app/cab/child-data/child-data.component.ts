import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChildData } from 'src/app/cab/models/child.model';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-child-data',
  templateUrl: './child-data.component.html',
  styleUrls: ['./child-data.component.css']
})
export class ChildDataComponent implements OnInit {

  constructor(public service: ChildService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onSubmit(form: NgForm){
    this.updateRecord(form);
  }

  populateForm(selectedRecord: ChildData) {
    this.service.childDataUpdated = Object.assign({}, selectedRecord);
  }

  
  updateRecord(form: NgForm) {
    this.service.putChild().subscribe(
      res => {
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

  onDelete(id: Number) {
    if (confirm('Вы уверены что хотите удалить данную информацию?')) {
      this.service.deleteChild(id).subscribe(
        res => {
          this.service.refreshList();
          this.toastr.error("Информация удалена");
        },
        err => { console.log(err) }
      );
    }
  }
}
