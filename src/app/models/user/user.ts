import { Hashtag } from '../hashtag/hashtag';
import { Model } from '../model/model';
import { UserLimits } from '../user-limits/user-limits';

export class User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    description?: string;
    password?: string;
    new_password?: string;
    new_password_confirm?: string;
    created_at?: Date;
    updated_at?: Date;
    photo_category?: string;
    models?: Model[];
    hashtags?: Hashtag[];
    model_hashtags?: Hashtag[];
    user_limits?: UserLimits;
    models_count?: number;
    model_versions_count?: number;
    api_calls_count?: number;
    api_calls_left?: number;
    photo?: string;
}
