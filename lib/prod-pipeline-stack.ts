
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { ProdAppStage } from './prod-app-stage';

export class ProdPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'ProdPipeline', {
      pipelineName: 'prod-pipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection(
          'PIYUSH-69/cdk-pipeline-infra',   // <-- PUBLIC REPO
          'release'   ,{
            connectionArn : 'arn:aws:codeconnections:ap-south-1:706877673330:connection/e3a0b34f-39dc-4a14-9c9a-757a643f3a3b'
          }                           // <-- PROD uses RELEASE
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    const stage = pipeline.addStage(
      new ProdAppStage(this, 'Prod', {
        env: {
          account: process.env.CDK_DEFAULT_ACCOUNT,
          region: process.env.CDK_DEFAULT_REGION
        }
      })
    );

    stage.addPre(new ManualApprovalStep('ProdApproval'));
  }
}
