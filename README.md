# cdk-set-topic-attributes

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Tests](https://github.com/Milan9805/cdk-set-topic-attributes/workflows/Tests/badge.svg)](https://github.com/Milan9805/cdk-set-topic-attributes/actions)

| Statements                                                                                  | Branches                                                                                  | Functions                                                                                  | Lines                                                                                  |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') |

The purpose of this project is to use AWS CloudFormation to set an SNS Topics delivery retry policy

This application contains the AWS CDK code for deploying an SNS Topic and a Lambda using Nested Stacks. This Lambda Function is then invoked (via a GitHub Action) to set the attributes involved with the SNS Topics delivery retry policy. The paramaters can be configured in `.github/workflows/cdk-deploy.yml` (lines 67-79).

## Deploying to AWS via CDK locally

### Pre-requisite utilities

-   [AWS CLI](https://aws.amazon.com/cli/)
-   [saml2aws](https://github.com/Versent/saml2aws#linux)

Once these pre-requisites have been set up you can log into AWS by running the following command: `saml2aws login`.

You can deploy the entire app from your local machine to AWS. To do this you'll need to:

-   Configure your `/deployGenericSnsTopic/.env` by taking a copy of `/deployGenericSnsTopic/.env.example` and populating it with your AWS credentials.
-   Run the `package` npm script found in `/setTopicAttributes/package.json`
-   Run the `deploy` npm script found in `/deployGenericSnsTopic/package.json`

Once you have deployed the app, you should manually go into the AWS Console and invoke the lambda i.e. configure test events and pass in a JSON block as shown in `.github/workflows/cdk-deploy.yml` (lines 67-79).

## Deploying to AWS via CDK with GitHub Actions

### Setting up the GitHub repository

In order for the GithubAction to invoke the set-topic-attributes Lambda we must do the following in the AWS Console:

-   Create a new User `IAM -> Users -> Add user`
-   Username can be something relating to your project e.g.
    `cdk-set-topic-attributes`
-   Select `Programmatic access` -> `Next: Permissions`
-   Select `Attach existing policies directly`
    -   Add `AWSLambdaRole`
-   Click `Next: Tags`
    -   Add the tags specified in `/deployGenericSnsTopic/constants/tags.ts`

Once you have created your new user you must ensure the following secrets are added (Settings -> Secrets):

-   `AWS_ACCESS_KEY_ID_INVOKE_TOPIC_LAMBDA_USER` (which is the access key given when creating the user)
-   `AWS_SECRET_ACCESS_KEY_INVOKE_TOPIC_LAMBDA_USER` (which is the secret access key given when creating the user)

To ensure CDK is able to evaluate environment variables during the workflow (GitHub Action), you must ensure the following secrets are added (Settings -> Secrets):

-   `AWS_ACCESS_KEY_ID`
-   `AWS_ACCOUNT_ID`
-   `AWS_SECRET_ACCESS_KEY`

### Defining a workflow

We are able to deploy using CDK via the use of GitHub Actions by defining a workflow. This workflow can be found here:

-   `.github/workflows/cdk-deploy.yml`

## Pre-commit hooks

The project has been configured so it runs [prettier](https://prettier.io/) for auto-formatting the code as well as [xo](https://github.com/xojs/xo),
which is an ESLint wrapper, in the pre-commit stage.

To use the pre-commit hook on a Windows machine you must use Windows Subsytem for Linux (WSL) or Cygwin.

To bypass the pre-commit hook you can simply add the `--no-verify` tag at the end of your commit message. For example:

-   `git commit -m "Example message" --no-verify`
