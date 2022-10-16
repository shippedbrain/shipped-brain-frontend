export class PasswordReset {
    id: number;
    user_id: number;
    user_email: string;
    reset_token: string;
    created_at: Date;
}
