export const RESULTS_PER_PAGE: number = 10;

export interface Collection {
    name: string;
    description: string;
    parent: string;
    area: string;
}

export interface Method {
    name: string;
    full_name: string;
    description: string;
    introduced_year: number;
    source_url: string;
    source_title: string;
    code_snippet_url: string;
    main_collection: Collection[];
}

export interface PapersWithCode {
    paper_id: string;
    paper_url: string;
    arxiv_id: string;
    title: string;
    abstract: string;
    url_abs: string;
    url_pdf: string;
    proceeding: string;
    authors: string[];
    tasks: string[];
    date: Date;
    published_at: Date;
    methods: Method[];
    paper_title: string;
    paper_arxiv_id: string;
    paper_url_abs: string;
    paper_url_pdf: string;
    repo_url: string;
    mentioned_in_paper: string;
    mentioned_in_github: string;
    framework: string;
}
