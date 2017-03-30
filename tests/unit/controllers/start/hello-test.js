import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:start/hello', 'Unit | Controller | start/hello', {
  needs: [
    'service:current-user',
    'service:flash-messages',
    'service:loading-bar',
    'service:metrics',
    'service:onboarding'
  ]
});

test('it exists', function(assert) {
  assert.expect(3);
  let controller = this.subject();

  controller.uploadingImage = true;

  controller.loadingBar = {
    stop() {
      assert.ok(true);
    }
  };

  controller.flashMessages = {
    clearMessages() {
      return this;
    },
    danger() {
      assert.ok(true);
    }
  };

  controller.uploadErrored();

  assert.notOk(controller.uploadingImage);
});
