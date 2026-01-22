
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServicesStack } from './cdk_pipeline-stack';

export class TestAppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new ServicesStack(this, 'TestStack');
  }
}
