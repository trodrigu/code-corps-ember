import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';

moduleForModel('task', 'Unit | Model | task', {
  // Specify the other units that are required for this test.
  needs: [
    'model:project',
    'model:user',
    'model:comment',
    'model:comment-user-mention',
    'model:task-user-mention'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let task = this.subject();
  let actualAttributes = Object.keys(task.toJSON());
  let expectedAttributes = [
    "body",
    "commentUserMentions",
    "insertedAt",
    "likesCount",
    "markdown",
    "number",
    "project",
    "status",
    "taskType",
    "title",
    "user",
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

testForBelongsTo('task', 'project');
testForBelongsTo('task', 'user');
testForHasMany('task', 'comments');
testForHasMany('task', 'commentUserMentions');
testForHasMany('task', 'taskUserMentions');

test('it correctly identifies code in the body', function(assert) {
  assert.expect(1);

  let model = this.subject({ body: '<code>Hello, world!<code>' });

  assert.equal(model.get('containsCode'), true);
});

test('it correctly identifies lack of code in the body', function(assert) {
  assert.expect(1);

  let model = this.subject({ body: '<pre>Hello, world!<pre>' });

  assert.equal(model.get('containsCode'), false);
});