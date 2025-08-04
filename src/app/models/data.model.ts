export interface ProjectData {
    id: number;
    name: string;
    datas: SamplingData[];
  }
  
  export interface SamplingData {
    samplingTime: string;
    properties: SamplingProperty[];
  }
  
  export interface SamplingProperty {
    label: string;
    value: string | number | boolean;
    type: 'text' | 'number' | 'checkbox';
    step?: number; // optional property

  }
  