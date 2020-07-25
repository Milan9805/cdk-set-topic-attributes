#!/usr/bin/env node
import * as dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

import { App } from '@aws-cdk/core';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new App();
new InfrastructureStack(app, 'cdk-set-topic-attributes');
