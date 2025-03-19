# AWS Step Functions
[Developer Guide](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html)  
[API Reference](https://docs.aws.amazon.com/step-functions/latest/apireference/Welcome.html)  
[State Language Specification](https://states-language.net/spec.html)  
[State Lint](https://github.com/awslabs/statelint)   

## Introduction
Step Functions is based on _state machines_ and tasks.    
In Step Functions, state machines are called _workflows_, which are a series of event-driven steps.   
Each step in a workflow is called a _state_.  
Instances of running workflows performing tasks are called _executions_ in Step Functions.  
The work in your state machine tasks can also be done using _Activities_ which are workers that exist outside of Step Functions.  

__Standard and Express workflows types__  
* __Standard__: Standard workflows have _exactly-once_ workflow execution and can run for up to _one year_.
* __Express__: Express workflows have _at-least-once_ workflow execution and can run for up to _five minutes_.  

## Installation
__Install state lint__  
Install state lint using Ruby gem
```bash
$ sud gem install statelint
```
Validate you state machines
```bash
$ statelint state-machine-spec, state-machinespec...
```
There are no options. If you see no output, your state machine is fine.
