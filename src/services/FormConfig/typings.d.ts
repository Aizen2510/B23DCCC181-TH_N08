declare module FormConfig {
    export interface Field {
        id: number;
        name: string;
        type: 'string' | 'number' | 'date';
    }
}