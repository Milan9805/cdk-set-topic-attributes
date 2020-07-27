# cdk-set-topic-attributes

[![Tests](https://github.com/Milan9805/cdk-set-topic-attributes/workflows/Tests/badge.svg)](https://github.com/Milan9805/cdk-set-topic-attributes/actions)

| Statements                                                                                  | Branches                                                                                  | Functions                                                                                  | Lines                                                                                  |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') |

The purpose of this project is to provide an example of how to set up an SNS Topic and set this Topics attributes.

This application contains the AWS CDK code for deploying an SNS Topic and a Lambda which is invoked to set its attributes.

## Deploying Infrastructure to AWS via CDK locally

You can deploy the entire app from your local machine to AWS. To do this you'll need to:

-   Ensure you have prepared the lambda code by running `pre-package` npm script found in `setTopicAttributes/package.json`.
-   Configure your `infrastructure/.env` by taking a copy of `/infrastructure/.env.example` and populating it with your AWS credentials.

### Pre-requisite utilities

-   [AWS CLI](https://aws.amazon.com/cli/)
-   [saml2aws](https://github.com/Versent/saml2aws#linux)

Once these prerequisites have been set up you can deploy by logging in to AWS running the `saml2aws login`.

After this you must run the `deploy` npm script found in `infrastructure/package.json`.

### First time deploying

If it is your first time deploying this project you must comment out the following lines of code:

-   `import { setTopicAttributes } from '../lib/resources/setTopicAttributes'`
-   `import setTopicAttributesConfig from '../constants/setTopicAttributesConfig';`
-   `setTopicAttributes( this, 'set-topic-attributes', setTopicAttributesConfig );`

From `infrastructure/lib/infrastructure-stack.ts`

Once you have deployed this project for the first time to your AWS account you must uncomment out the code and re-run the deployment (i.e. follow the steps described in the "Deploying Infrastructure to AWS via CDK locally" section).

Once you have fully deployed the app, you should manually go into the AWS Console and invoke the lambda with an empty body (i.e. configure test events and pass in an empty JSON block e.g. `{}`).

## Deploying Infrastructure to AWS via CDK with GitHub Actions

Before doing this you should deploy locally (See "Deploying Infrastructure to AWS via CDK locally" - invocation of the lambda is not required)

### Setting up the GitHub repository

In order for the GithubAction to invoke the set-topic-attributes Lambda we must do the following in the AWS Console:

-   Create a new User `IAM -> Users -> Add user`
-   Username can be something relating to your project e.g.
    `cdk-set-topic-attributes`
-   Select `Programmatic access` -> `Next: Permissions`
-   Select `Attach existing policies directly`
    -   Add `AWSLambdaRole`
-   Click `Next: Tags`
    -   Add the tags specified in `infrastructure/constants/tags.ts`

Once you have created your new user you must ensure the following secrets are added (Settings -> Secrets):

-   `AWS_ACCESS_KEY_ID_INVOKE_TOPIC_LAMBDA_USER_DEV` (which is the access key given when creating the user)
-   `AWS_SECRET_ACCESS_KEY_INVOKE_TOPIC_LAMBDA_USER_DEV` (which is the secret access key given when creating the user)

To ensure CDK is able to evaluate environment variables during the workflow (GitHub Action), you must ensure the following secrets are added (Settings -> Secrets):

-   `AWS_ACCESS_KEY_ID_DEV`
-   `AWS_ACCOUNT_ID`
-   `AWS_SECRET_ACCESS_KEY_DEV`

### Defining a workflow

We are able to deploy using CDK via the use of GitHub Actions by defining a workflow. This workflow can be found here:

-   `.github/workflows/cdk-deploy.yml`
