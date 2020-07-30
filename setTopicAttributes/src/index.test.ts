import { SNS } from 'aws-sdk';

import { handler } from '.';
import setTopicAttributesConfig from './config/setTopicAttributesConfig';
import { SetTopicAttributesError } from './errors/SetTopicAttributesError';
import { DeliveryRetryPolicy } from './types/DeliveryRetryPolicy';
import { ResponseBody } from './types/ResponseBody';

jest.mock('aws-sdk', () => {
    const mockedSNS = {
        setTopicAttributes: jest.fn().mockReturnThis(),
        promise: jest.fn(),
    };
    return { SNS: jest.fn(() => mockedSNS) };
});

beforeAll(() => {
    setTopicAttributesConfig.TOPIC_ARN = 'TopicArn';
});

afterEach(() => {
    jest.clearAllMocks();
});

const attributeValue: DeliveryRetryPolicy = {
    http: {
        defaultHealthyRetryPolicy: {
            minDelayTarget: 5,
            maxDelayTarget: 1796,
            numRetries: 5,
            numMaxDelayRetries: 2,
            numNoDelayRetries: 2,
            backoffFunction: 'exponential',
        },
        disableSubscriptionOverrides: false,
    },
};

describe('Handler', () => {
    it('Should call setTopicAttributes method with the correct parameters', async () => {
        const sns = new SNS();
        const mockedResponseData = {
            Status: 'OK',
        };

        const parameters = {
            AttributeName: 'DeliveryPolicy',
            TopicArn: 'TopicArn',
            AttributeValue: JSON.stringify(attributeValue),
        };

        (sns.setTopicAttributes().promise as jest.Mock).mockResolvedValueOnce(
            mockedResponseData
        );

        const expectedResponse: ResponseBody = {
            deliveryRetryPolicy: attributeValue,
            message: 'DeliveryRetryPolicy successfully set',
        };

        const response: ResponseBody = await handler(attributeValue);

        expect(response).toMatchObject(expectedResponse);
        expect(sns.setTopicAttributes().promise).toBeCalledTimes(1);
        expect(sns.setTopicAttributes).toBeCalledWith(parameters);
    });
    it('Should should throw a SetTopicAttributesError if incorrect parameter is passed', async () => {
        const sns = new SNS();

        (sns.setTopicAttributes().promise as jest.Mock).mockRejectedValueOnce(
            new Error(
                'Invalid parameter: DeliveryPolicy: Unexpected JSON member: throttlePolicy'
            )
        );

        await handler(attributeValue).catch(error => {
            expect(error).toBeInstanceOf(SetTopicAttributesError);
            expect(error.message).toBe(
                'Error setting topic attributes: Invalid parameter: DeliveryPolicy: Unexpected JSON member: throttlePolicy'
            );
        });
    });
});
