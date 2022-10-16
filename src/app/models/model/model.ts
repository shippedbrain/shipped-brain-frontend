import { Hashtag } from '../hashtag/hashtag';
import { ModelSignature } from '../model-signature/model-signature';
import { ModelTags } from '../model-tags/model-tags';
import { User } from '../user/user';

export class Model {
    name?: string;
    description?: string;
    user_id?: string;
    run_id?: string;
    run_link?: string;
    current_stage?: string;
    source?: string;
    status?: string;
    status_message?: string;
    version?: number;
    creation_time?: Date | number;
    last_update_time?: Date | number;
    user_name?: string;
    hashtags?: Hashtag[];
    user?: User;
    versions?: Model[];
    signature?: ModelSignature | string;
    api_calls?: number;
    input_example?: any;
    usage?: Array<any> = [];
    likes?: any;
    comment_count: number;
    github_repo?: string;
    github_repo_files_url?: string;
    github_repo_readme_url?: string;
    metrics?: any;
    parameters?: string | object;
    tags?: ModelTags;
    model_card: string;
    cover_photo: string;
}
