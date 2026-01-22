
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { TestAppStage } from './test-app-stage';
// import { TestAppStage } from './test-app-stage';

export class TestPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'TestPipeline', {
      pipelineName: 'test-pipeline',
       synth: new ShellStep('Synth', {

        input: CodePipelineSource.connection(
          'PIYUSH-69/cdk-pipeline-infra',   
          'main'   ,{
            connectionArn : 'arn:aws:codeconnections:ap-south-1:706877673330:connection/e3a0b34f-39dc-4a14-9c9a-757a643f3a3b'
          }                           
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    pipeline.addStage(
      new TestAppStage(this, 'Test', {
        env: {
          account: process.env.CDK_DEFAULT_ACCOUNT,
          region: process.env.CDK_DEFAULT_REGION
        }
      })
    );
  }
}
