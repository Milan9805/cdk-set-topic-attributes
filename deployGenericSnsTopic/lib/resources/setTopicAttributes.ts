import { Construct, Duration } from '@aws-cdk/core';

import { Topic, ITopic } from '@aws-cdk/aws-sns';

import {
    AssetCode,
    Function as AWSLambda,
    Runtime,
    FunctionProps,
} from '@aws-cdk/aws-lambda';

import {
    Effect,
    ManagedPolicy,
    Policy,
    PolicyStatement,
    Role,
    ServicePrincipal,
} from '@aws-cdk/aws-iam';

export type SetTopicAttributesProps = {
    timeout: Duration;
    topicArn: string;
};

export const setTopicAttributes = (
    scope: Construct,
    id: string,
    props: SetTopicAttributesProps
) => {
    const construct: Construct = new Construct(scope, id);

    const topic = getTopic(construct, props.topicArn);
    const setTopicAttributesPolicyStatement = createPolicyStatement(
        topic.topicArn
    );

    const setTopicAttributesPolicy = createPolicy(
        construct,
        setTopicAttributesPolicyStatement
    );

    const role = createRole(construct);
    setTopicAttributesPolicy.attachToRole(role);

    createLambda(
        construct,
        id,
        createLambdaFunctionProps(props, role, topic.topicArn)
    );
};

const getTopic = (construct: Construct, topicArn: string): ITopic => {
    return Topic.fromTopicArn(construct, 'genericSnsTopic', topicArn);
};

const createPolicyStatement = (resourceArn: string): PolicyStatement => {
    const policyStatement = new PolicyStatement({
        effect: Effect.ALLOW,
    });

    policyStatement.addActions('*');
    policyStatement.addResources(resourceArn);
    return policyStatement;
};

const createPolicy = (
    construct: Construct,
    statement: PolicyStatement
): Policy => {
    const policy = new Policy(construct, 'set-topic-attributes-policy');

    policy.addStatements(statement);

    return policy;
};

const createRole = (construct: Construct): Role => {
    const role = new Role(construct, 'set-topic-attributes-role', {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
    });

    role.addManagedPolicy({
        managedPolicyArn: ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaBasicExecutionRole'
        ).managedPolicyArn,
    });
    return role;
};

const createLambda = (
    construct: Construct,
    id: string,
    functionProps: FunctionProps
): AWSLambda => {
    return new AWSLambda(construct, id, functionProps);
};

const createLambdaFunctionProps = (
    props: SetTopicAttributesProps,
    role: Role,
    topicArn: string
): FunctionProps => {
    return {
        functionName: 'set-topic-attributes',
        runtime: Runtime.NODEJS_12_X,
        code: new AssetCode('../setTopicAttributes/dist'),
        timeout: props.timeout,
        handler: 'index.handler',
        memorySize: 1792,
        role,
        environment: {
            TOPIC_ARN: topicArn,
        },
    };
};
