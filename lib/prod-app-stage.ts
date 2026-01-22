
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServicesStack } from './cdk_pipeline-stack';
export class ProdAppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

        const stageName = id;  // "test" or "prod"

    new ServicesStack(this, `ServiceStack-${stageName}`, {
      stageName : stageName,
      env : props?.env
    });
  }
}
