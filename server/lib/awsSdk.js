import AWS from 'aws-sdk';
import config from 'config';

// s3 bucket
if (config.aws.s3.key) {
  AWS.config.update({
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
    const s3 = new AWS.S3();
    return s3.putObject(params, (err, data) => {
      res.send({ status: '200', url: data.Location });
    });
  }
}
