# cdk-set-topic-attributes

[![Tests](https://github.com/Milan9805/cdk-set-topic-attributes/workflows/Tests/badge.svg)](https://github.com/Milan9805/cdk-set-topic-attributes/actions)

| Statements                                                                                  | Branches                                                                                  | Functions                                                                                  | Lines                                                                                  |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg 'I am perfect!') |

The purpose of this project is to provide an example of how to set up an SNS Topic and set this Topics attributes.

This application contains the AWS CDK code for deploying an SNS Topic and a Lambda which is then invoked to set its attributes.

## Deploying Infrastructure to AWS via CDK locally

### Pre-requisite utilities

-   [AWS CLI](https://aws.amazon.com/cli/)
-   [saml2aws](https://github.com/Versent/saml2aws#linux)

Once these pre-requisites have been set up you can log into AWS by running the following command: `saml2aws login`.

You can deploy the entire app from your local machine to AWS. To do this you'll need to:

-   Configure your `/deployGenericSnsTopic/.env` and `/deploySetTopicAttributesLambda/.env` by taking a copy of `/deploySetTopicAttributesLambda/.env.example` or `/deployGenericSnsTopic/.env.example` and populating it with your AWS credentials.
-   Run the `deploy` npm script found in `/deployGenericSnsTopic/package.json`
-   Run the `pre-package` npm script found in `/setTopicAttributes/package.json`
-   Run the `deploy` npm script found in `/deploySetTopicAttributesLambda/package.json`

Once you have fully deployed the app, you should manually go into the AWS Console and invoke the lambda with an empty body (i.e. configure test events and pass in an empty JSON block e.g. `{}`).

## Deploying Infrastructure to AWS via CDK with GitHub Actions

### Setting up the GitHub repository

In order for the GithubAction to invoke the set-topic-attributes Lambda we must do the following in the AWS Console:

-   Create a new User `IAM -> Users -> Add user`
-   Username can be something relating to your project e.g.
    `cdk-set-topic-attributes`
-   Select `Programmatic access` -> `Next: Permissions`
-   Select `Attach existing policies directly`
    -   Add `AWSLambdaRole`
-   Click `Next: Tags`
    -   Add the tags specified in `/deployGenericSnsTopic/constants/tags.ts` or in `/deploySetTopicAttributesLambda/constants/tags.ts`

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

## Pre-commit hooks

The project has been configured so it runs [prettier](https://prettier.io/) for auto-formatting the code as well as [xo](https://github.com/xojs/xo),
which is an ESLint wrapper, in the pre-commit stage.

To use the pre-commit hook on a Windows machine you must use Windows Subsytem for Linux (WSL) or Cygwin.

To bypass the pre-commit hook you can simply add the `--no-verify` tag at the end of your commit message. For example:

-   `git commit -m "Example message" --no-verify`
