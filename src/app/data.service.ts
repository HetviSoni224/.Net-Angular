import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectData,SamplingData } from './models/data.model';
import { SamplingProperty } from './models/data.model';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:5195/api/Master'; // <-- replace with your actual API if different

  constructor(private http: HttpClient) {}

  private readonly DEFAULT_PROPERTIES: SamplingProperty[] = [
    { label: 'Project Name', type: 'text', value: '' },
    { label: 'Construction Count', type: 'number', value: 0, step: 1 },
    { label: 'Is Construction Completed', type: 'checkbox', value: false },
    { label: 'Length of the road', type: 'number', value: 0, step: 0.1 }
  ];

  getData(): Observable<ProjectData> {
    return this.http.get<ProjectData>(this.apiUrl).pipe(
      map(res => {
        res.datas.forEach((sampling) => {
          // Ensure properties exists and is array
          if (!Array.isArray(sampling.properties)) {
            sampling.properties = [];
          }
  
          // Create ordered properties array based on DEFAULT_PROPERTIES order
          const orderedProps = this.DEFAULT_PROPERTIES.map(defaultProp => {
            // Find existing property by label
            const existingProp = sampling.properties.find(p => p.label === defaultProp.label);
  
            if (existingProp) {
              // Return merged object: use existing value, but keep type and step from default
              return {
                ...defaultProp,
                value: existingProp.value,
                step: defaultProp.step // ensure step always from default
              };
            } else {
              // Property missing, use default property (with default value)
              return { ...defaultProp };
            }
          });
  
          // Replace properties with orderedProps to keep order and completeness
          sampling.properties = orderedProps;
        });
  
        console.log('Processed data:', res);
        return res;
      })
    );
  }
  

  saveData(data: ProjectData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  updateData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${data.id}`, data);
  }
  
}
