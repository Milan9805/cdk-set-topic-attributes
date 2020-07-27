#!/usr/bin/env node
import * as dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

import { App } from '@aws-cdk/core';
import { SetTopicAttributesStack } from '../lib/setTopicAttributes-stack';

const app = new App();
new SetTopicAttributesStack(app, 'cdk-set-topic-attributes-lambda');
