export const MODEL_UPLOAD_FINISHED: string = 'finished';
export const MODEL_UPLOAD_FAILED: string = 'failed';
export const MODEL_UPLOAD_RUNNING: string = 'running';
export const MODEL_UPLOAD_QUEUED: string = 'queued';
export const MODEL_UPLOAD_CANCELED: string = 'canceled';

export interface ModelUpload {
    id: number;
    user_id: number;
    started_at: Date;
    finished_at: Date;
    status: string;
    model_name: string;
    model_version: string;
}
