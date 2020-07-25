import { SNS } from 'aws-sdk';

import { handler } from './index';
import setTopicAttributesConfig from './config/setTopicAttributesConfig';
import { SetTopicAttributesError } from './errors/SetTopicAttributesError';

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
    jest.clearAllMocks;
});

describe('Handler', () => {
    it('Should call setTopicAttributes method with the correct parameters', async () => {
        const sns = new SNS();
        const mockedResponseData = {
            Status: 'OK',
        };
        const attributeValue = {
            http: {
                defaultHealthyRetryPolicy: {
                    minDelayTarget: 30,
                    maxDelayTarget: 30,
                    numRetries: 5,
                    numMaxDelayRetries: 2,
                    backoffFunction: 'exponential',
                },
                throttlePolicy: {
                    maxRecievesPerSecond: 5,
                },
                disableSubscriptionOverrides: false,
            },
        };

        const params = {
            AttributeName: 'DeliveryPolicy',
            TopicArn: 'TopicArn',
            AttributeValue: JSON.stringify(attributeValue),
        };

        (sns.setTopicAttributes().promise as jest.Mock).mockResolvedValueOnce(
            mockedResponseData
        );

        await handler();

        expect(sns.setTopicAttributes().promise).toBeCalledTimes(1);
        expect(sns.setTopicAttributes).toBeCalledWith(params);
    });
    it('Should should throw a SetTopicAttributesError if no attributeValue is passed', async () => {
        const sns = new SNS();

        (sns.setTopicAttributes().promise as jest.Mock).mockRejectedValueOnce(
            new Error('Missing attributeValue')
        );

        await handler().catch(error => {
            expect(error).toBeInstanceOf(SetTopicAttributesError);
            expect(error.message).toBe(
                'Error setting topic attributes: Missing attributeValue'
            );
        });
    });
});
