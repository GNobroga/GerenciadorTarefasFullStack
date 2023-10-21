export interface ITask {
  title: string;
  description?: string;
  estimation: string;
  done?: boolean;
  list_id: number;
}