export class ModelTags {
    input_example?: string;
    metrics?: string;
    params?: string;
    signature?: string;
    user_id?: string;
    github_repo?: string;

    /**
     * Validates if input example is valid
     *
     * @param inputExample Input example string to validate
     * @returns true if input example is a valid object, otherwise false
     */
    static isInputExampleValid(inputExample: string): boolean {
        return ModelTags.isValidJSON(inputExample);
    }

    /**
     * Validates if metrics are valid
     *
     * @param metrics Metrics string to validate
     * @returns true if metrics are a valid object, otherwise false
     */
    static areMetricsValid(metrics: string): boolean {
        return ModelTags.isValidJSON(metrics);
    }

    /**
     * Validates if params are valid
     *
     * @param params Params string to validate
     * @returns true if params are a valid object, otherwise false
     */
    static areParamsValid(params: string): boolean {
        return ModelTags.isValidJSON(params);
    }

    /**
     * Validates if signature is valid
     *
     * @param signature Signature string to validate
     * @returns true if signature is a valid object, otherwise false
     */
    static isSignatureValid(signature: string): boolean {
        return ModelTags.isValidJSON(signature);
    }

    /**
     * Validates if string is valid JSON by trying to parse it
     *
     * @param text String to validate
     * @returns true if JSON parsing was successful, otherwise false
     */
    static isValidJSON(text: string): boolean {
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Validates if url parameter is a valid GitHub repository URL
     *
     * @param url URL to validate
     * @returns true if URL is valid, otherwise false
     */
    static isGitHubUrlValid(url: string): boolean {
        return /(?:(https:\/\/)?github.com\/\w+\/\w+)/gi.test(url);
    }
}
