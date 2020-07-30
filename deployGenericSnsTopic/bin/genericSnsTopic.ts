#!/usr/bin/env node
import * as dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

import { App } from '@aws-cdk/core';
import { genericSnsTopicStack } from '../lib/genericSnsTopic-stack';

const app = new App();
genericSnsTopicStack(app, 'cdk-set-topic-attributes');
