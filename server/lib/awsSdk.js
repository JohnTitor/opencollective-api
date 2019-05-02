import aws from 'aws-sdk';
import config from 'config';

// s3 bucket
if (config.aws.s3.key) {
  aws.config.update({
    accessKeyId: config.aws.s3.key,
    secretAccessKey: config.aws.s3.secret,
    region: 'us-west-1',
    s3BucketEndpoint: config.aws.s3.bucket,
  });
}

export default class S3 {
  uploadImage(file, fileName) {
    const params = {
      Body: file,
      Bucket: config.aws.s3.bucket,
      Key: fileName,
      ContentType: file.mimeType,
      ContentLength: file.size,
      ACL: 'public-read',
    };
    const s3 = new aws.S3();
    return s3
      .putObject(params)
      .promise()
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }
}