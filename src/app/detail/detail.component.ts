import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ProjectData, SamplingData,SamplingProperty } from '../models/data.model';
import { MatListModule } from '@angular/material/list';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';




@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [
    MatListModule, 
    FormsModule, 
    MatButtonModule,
    NgIf, 
    NgFor,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule
  ],
})
export class DetailComponent implements OnInit {
  allData!: ProjectData; // entire object with id, name, datas
  selectedSampling: SamplingData | null = null;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dataService.getData().subscribe(res => {
      console.log('Loaded data:', res);
      // Add type to each property based on its label or value type
      res.datas.forEach(sampling => {
        sampling.properties = sampling.properties.map(prop => ({
          ...prop,
          type: this.getInputType(prop)
        }));
      });
      this.allData = res;
    });
  }
  getInputType(prop: SamplingProperty): 'text' | 'number' | 'checkbox' {
    // Assign type based on value type or label keywords
    if (typeof prop.value === 'boolean') {
      return 'checkbox';
    }
    if (typeof prop.value === 'number') {
      return 'number';
    }
    if (typeof prop.value === 'string') {
      // You can also do extra checks based on label text, e.g.
      if (prop.label.toLowerCase().includes('count') || prop.label.toLowerCase().includes('length')) {
        return 'number';
      }
      return 'text';
    }
    return 'text'; // default fallback
  }
 
  selectSampling(sampling: SamplingData) {
    this.selectedSampling = sampling;
  }  

  onSave() {
    if (this.allData) {
      this.dataService.updateData(this.allData).subscribe(() => {
        alert('Data saved successfully.');
        this.router.navigate(['/summary']);
       
      });
    }
  }
}
