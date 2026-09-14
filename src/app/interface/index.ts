export interface IQuery {
  search?: string;
  sortOrder?: string;
  sortBy?: string;
  limit?: string;
  page?: string;
  [key: string]: any;
}
