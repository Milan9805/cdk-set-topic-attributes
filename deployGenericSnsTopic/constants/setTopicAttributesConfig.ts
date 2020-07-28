import { SetTopicAttributesProps } from '../lib/resources/setTopicAttributes';
import { Duration } from '@aws-cdk/core';

export default {
    timeout: Duration.seconds(10),
    topicArn: process.env.TOPIC_ARN as string,
} as SetTopicAttributesProps;
