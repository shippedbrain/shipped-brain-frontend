export const MODELS_CATEGORY = { key: 'models', value: 'Models' };
export const PROFILES_CATEGORY = { key: 'profiles', value: 'Profiles' };

export const GLOBAL_CATEGORIES: GlobalCategory[] = [MODELS_CATEGORY, PROFILES_CATEGORY];

export interface GlobalCategory {
    key: string;
    value: string;
}
