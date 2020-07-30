import { CfnOutput, Stack, StackProps, Tag, Construct } from '@aws-cdk/core';
import { Topic } from '@aws-cdk/aws-sns';

const tags = require('../constants/tags');
import { map } from 'lodash/fp';
import { SetTopicAttributesStack } from './setTopicAttributes-stack';
import { SetTopicAttributesPropsConfig } from './resources/SetTopicAttributesPropsConfig';

export const genericSnsTopicStack = (
    scope: Construct,
    id: string,
    props?: StackProps
): Stack => {
    const stack: Stack = new Stack(scope, id, props);

    const genericSnsTopic = new Topic(stack, 'genericSnsTopic');
    const topicArn: string = genericSnsTopic.topicArn;

    new CfnOutput(genericSnsTopic, 'genericSnsTopic', {
        exportName: 'genericSnsTopic',
        value: topicArn,
    });

    const setTopicAttributesProps: SetTopicAttributesPropsConfig = new SetTopicAttributesPropsConfig(
        topicArn
    );

    new SetTopicAttributesStack(
        stack,
        'SetTopicAttributes',
        setTopicAttributesProps
    );

    map(([key, value]: [string, string]) => Tag.add(stack, key, value), tags);

    return stack;
};
