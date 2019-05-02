import fs from 'fs';
import path from 'path';

import request from 'supertest';
import fetch from 'node-fetch';
import { expect } from 'chai';

import app from '../server/index';
import models from '../server/models';
import * as utils from '../test/utils';

const application = utils.data('application');
const userData = utils.data('user1');

describe('images.routes.test.js', function() {
  let user;
  this.timeout(10000);

  beforeEach(() => utils.resetTestDB());

  /**
   * Create user
   */

  beforeEach(() => models.User.create(userData).tap(u => (user = u)));

  it('should upload an image to S3', async done => {
    const originalImage = fs.readFileSync(path.join(__dirname, 'mocks/images/camera.png'), {
      encoding: 'utf8',
    });
    try {
      const res = await request(app)
        .post(`/images/?api_key=${application.api_key}`)
        .attach('file', 'test/mocks/images/camera.png')
        .set('Authorization', `Bearer ${user.jwt()}`)
        .expect(200);
      expect(res.body.url).to.contain('.png');
      const res_1 = await fetch(res.body.url);
      const image = await res_1.text();
      expect(image).to.equal(originalImage);
      done();
    } catch (err) {
      return done(err);
    }
  });

  it('should throw an error if no file field is sent', done => {
    return request(app)
      .post(`/images/?api_key=${application.api_key}`)
      .set('Authorization', `Bearer ${user.jwt()}`)
      .expect(400)
      .end(done);
  });

  it('should upload if the user is not logged in', done => {
    return request(app)
      .post(`/images/?api_key=${application.api_key}`)
      .attach('file', 'test/mocks/images/camera.png')
      .expect(200)
      .end(done);
  });
});
