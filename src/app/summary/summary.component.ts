import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';



@Component({
  standalone: true,
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ]
})
export class SummaryComponent implements OnInit {
  displayedColumns: string[] = ['samplingTime', 'projectName', 'count', 'length', 'completed'];
  dataSource: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((res) => {
      this.dataSource = res.datas.map((item: any) => {
        console.log('All data loaded:', this.dataSource);
        const projectName = item.properties.find((p: any) => p.label.toLowerCase().includes('project name'))?.value ?? '';
        const length = item.properties.find((p: any) => p.label.toLowerCase().includes('length'))?.value ?? '';
        const count = item.properties.find((p: any) => p.label.toLowerCase().includes('count'))?.value ?? '';
        const completed = item.properties.find((p: any) => p.label.toLowerCase().includes('completed'))?.value ?? '';

        return {
          samplingTime: item.samplingTime,
          projectName,
          length,
          count,
          completed
        };
      });
    });
  }
}
