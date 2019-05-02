import aws from 'aws-sdk';

// import config from 'config';

// s3 bucket
let s3;
s3 = new aws.Config({
  accessKeyId: 'foobar',
  secretAccessKey: 'foobar',
  region: 'us-west-1',
  s3BucketEndpoint: 'foobar',
});

export default s3;
