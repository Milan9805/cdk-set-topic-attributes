import { App, Stack, StackProps, Tag } from '@aws-cdk/core';

const tags = require('../constants/tags');
import { map } from 'lodash/fp';
import { setTopicAttributes } from './resources/setTopicAttributes';
import setTopicAttributesConfig from '../constants/setTopicAttributesConfig';

export class SetTopicAttributesStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

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
