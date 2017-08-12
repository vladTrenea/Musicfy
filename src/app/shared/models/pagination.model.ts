export class PaginationModel<T> {
    page: number;
    items: T[] = [];
    totalPages: number;
}
