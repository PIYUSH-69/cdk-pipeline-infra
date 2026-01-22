#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import {  ServicesStack } from '../lib/cdk_pipeline-stack';
import { TestPipelineStack } from '../lib/test-pipeline-stack';
import { ProdPipelineStack } from '../lib/prod-pipeline-stack';

const app = new cdk.App();

new TestPipelineStack(app, 'TestPipeline',{  env: { account: '706877673330', region: process.env.CDK_DEFAULT_REGION },
});
new ProdPipelineStack(app, 'ProdPipeline',{  env: { account: '706877673330', region: process.env.CDK_DEFAULT_REGION },
});