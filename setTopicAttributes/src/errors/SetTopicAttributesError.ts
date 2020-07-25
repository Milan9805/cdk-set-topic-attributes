import { CustomError } from 'ts-custom-error';

export class SetTopicAttributesError extends CustomError {
    constructor(message: string) {
        super(
            `Error setting topic attributes: ${message}`
        );
    }
}
