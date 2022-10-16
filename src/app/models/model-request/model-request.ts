import { User } from '../user/user';

export class ModelRequest {
    id: number;
    title: string;
    description: string;
    prize: string;
    status: string;
    input_data: string;
    output_data: string;
    created_at: Date;
    updated_at: Date;
    fulfilled_by: number;
    fulfilled_at: Date;
    requested_by: number;
    user_fulfilled_by: User;
    user_requested_by: User;
    is_recent: boolean;
}
