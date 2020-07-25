import { App, CfnOutput, Stack, StackProps, Tag } from '@aws-cdk/core';
import { Topic } from '@aws-cdk/aws-sns';

const tags = require('../constants/tags');
import { map } from 'lodash/fp';
import { setTopicAttributes } from '../lib/resources/setTopicAttributes';
import setTopicAttributesConfig from '../constants/setTopicAttributesConfig';

export class InfrastructureStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        const genericSnsTopic = new Topic(this, 'genericSnsTopic');

        new CfnOutput(genericSnsTopic, 'genericSnsTopic', {
            exportName: 'genericSnsTopic',
            value: genericSnsTopic.topicArn,
        });

        setTopicAttributes(
            this,
            'set-topic-attributes',
            setTopicAttributesConfig
        );

        map(
            ([key, value]: [string, string]) => Tag.add(this, key, value),
            tags
        );
    }
}
