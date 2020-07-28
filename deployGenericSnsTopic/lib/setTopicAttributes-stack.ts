import { Tag, Construct } from '@aws-cdk/core';
import { NestedStack } from '@aws-cdk/aws-cloudformation';

const tags = require('../constants/tags');
import { map } from 'lodash/fp';
import { setTopicAttributes } from './resources/setTopicAttributes';
import setTopicAttributesConfig from '../constants/setTopicAttributesConfig';
import { SetTopicAttributesLambdaProps } from './resources/SetTopicAttributesPropsConfig';

export class SetTopicAttributesStack extends NestedStack {
    constructor(
        scope: Construct,
        id: string,
        props: SetTopicAttributesLambdaProps
    ) {
        super(scope, id, props);

        setTopicAttributesConfig.topicArn = props.topicArn;

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
