import { SNS, AWSError } from 'aws-sdk';
import setTopicAttributesConfig from './config/setTopicAttributesConfig';
import { SetTopicAttributesError } from './errors/SetTopicAttributesError';

export const handler = async (): Promise<Response | AWSError> => {
    const attributeValue = {
        http: {
            defaultHealthyRetryPolicy: {
                minDelayTarget: 30,
                maxDelayTarget: 30,
                numRetries: 5,
                numMaxDelayRetries: 2,
                backoffFunction: 'exponential',
            },
            disableSubscriptionOverrides: false,
        },
    };

    const paramaters = {
        AttributeName: 'DeliveryPolicy',
        TopicArn: setTopicAttributesConfig.TOPIC_ARN,
        AttributeValue: JSON.stringify(attributeValue),
    };

    return await new SNS()
        .setTopicAttributes(paramaters)
        .promise()
        .catch(error => {
            throw new SetTopicAttributesError(error.message);
        })
        .then();
};
