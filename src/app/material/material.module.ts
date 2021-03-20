import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';

const MaterialComponents = [
  MatCardModule,
  MatSelectModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
  providers: [
    
  ]
})
export class MaterialModule { }
