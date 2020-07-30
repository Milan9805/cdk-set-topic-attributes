import { expect as expectCDK, haveOutput, haveResource } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import { genericSnsTopicStack } from '../lib/genericSnsTopic-stack';
import mock from 'mock-fs';

afterAll(() => {
    mock.restore();
});

describe('eventfeed stack tests', () => {
    mock({
        '../setTopicAttributes/dist': {},
    });

    const app = new App();
    const stack = genericSnsTopicStack(app, 'cdk-set-topic-attributes');
    const tags = [
        {
            Key: 'defined_in',
            Value: 'cdk',
        },
        {
            Key: 'project',
            Value: 'cdk-set-topic-attributes',
        },
        {
            Key: 'pushed_by',
            Value: 'github',
        },
        {
            Key: 'repo_name',
            Value: 'cdk-set-topic-attributes',
        },
    ];

    it('Creates a SNS Topic with correct tags', () => {
        expectCDK(stack).to(
            haveResource('AWS::SNS::Topic', {
                Tags: tags,
            })
        );
    });

    it('Outputs correct export name', () => {
        expectCDK(stack).to(
            haveOutput({
                exportName: 'genericSnsTopic',
            })
        );
    });

    it('Creates a NestedStack with a Lambda', () => {
        expect(stack.node.children.toLocaleString()).toContain(
            'cdk-set-topic-attributes/SetTopicAttributes'
        );
        expect(stack.node.children.toLocaleString()).toContain(
            'cdk-set-topic-attributes/SetTopicAttributes.NestedStack'
        );
    });
});
