import { NestedStackProps } from '@aws-cdk/core';

export interface SetTopicAttributesLambdaProps extends NestedStackProps {
    topicArn: string;
}

export class SetTopicAttributesPropsConfig implements SetTopicAttributesLambdaProps {
    topicArn: string;
    constructor(topicArn: string) {
        this.topicArn = topicArn;
    }
}
