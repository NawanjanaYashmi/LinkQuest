export interface Location {
    title: string;
    description: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  }
  
  export interface DistanceMatrix {
    rows: {
      elements: { distance: { value: number }; duration: { value: number } }[];
    }[];
  }