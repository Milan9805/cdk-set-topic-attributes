import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import { App } from "@aws-cdk/core";
import { SetTopicAttributesStack } from "../lib/setTopicAttributes-stack";
import mock from "mock-fs";

afterAll(() => {
  mock.restore();
});

describe("snsTopicLambda stack tests", () => {
  mock({
    "../setTopicAttributes/dist": {},
  });

  const app = new App();
  const stack = new SetTopicAttributesStack(app, "SetTopicAttributesStack");
  const tags = [
    {
      Key: "defined_in",
      Value: "cdk",
    },
    {
      Key: "project",
      Value: "cdk-set-topic-attributes",
    },
    {
      Key: "pushed_by",
      Value: "github",
    },
    {
      Key: "repo_name",
      Value: "cdk-set-topic-attributes",
    },
  ];

  it("Creates a Lambda with correct tags", () => {
    expectCDK(stack).to(
      haveResource("AWS::Lambda::Function", {
        FunctionName: "set-topic-attributes",
        Tags: tags,
      })
    );
  });
});
