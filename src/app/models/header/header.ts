export interface Header {
    title: string;
    route: string;
    isDropdown?: boolean;
    children?: Header[];
    queryParams?: any;
}
