import { SNS } from 'aws-sdk';
import setTopicAttributesConfig from './config/setTopicAttributesConfig';
import { SetTopicAttributesError } from './errors/SetTopicAttributesError';
import { ResponseBody } from './types/ResponseBody';
import { DeliveryRetryPolicy } from './types/DeliveryRetryPolicy';

export const handler = async (
    attributeValue: DeliveryRetryPolicy
): Promise<ResponseBody> => {
    const paramaters = {
        AttributeName: 'DeliveryPolicy',
        TopicArn: setTopicAttributesConfig.TOPIC_ARN,
        AttributeValue: JSON.stringify(attributeValue),
    };
    let responseBody;
    await new SNS()
        .setTopicAttributes(paramaters)
        .promise()
        .catch(error => {
            throw new SetTopicAttributesError(error.message);
        })
        .then(() => {
            responseBody = {
                deliveryRetryPolicy: attributeValue,
                message: 'DeliveryRetryPolicy successfully set',
            };
        });

    return responseBody;
};
