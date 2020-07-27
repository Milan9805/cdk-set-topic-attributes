#!/usr/bin/env node
import * as dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

import { App } from '@aws-cdk/core';
import { GenericSnsTopicStack } from '../lib/genericSnsTopic-stack';

const app = new App();
new GenericSnsTopicStack(app, 'cdk-set-topic-attributes');
