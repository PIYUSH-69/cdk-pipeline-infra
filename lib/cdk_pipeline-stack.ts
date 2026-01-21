import { aws_lambda } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPipelineQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });


    
const lambda = new aws_lambda.Function(this, "demoLambda", {
  functionName: "demo_lambda_func",
  handler: "index.lambda_handler",
  runtime: aws_lambda.Runtime.PYTHON_3_10,
  code: aws_lambda.Code.fromInline(`
def lambda_handler(event, context):
    return {
        "statusCode": 200,
        "body": "Hello from inline Lambda!"
    }
`)
});

  }
}
