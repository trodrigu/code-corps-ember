import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const {
  get,
  Object,
  set
} = Ember;

let owner = Object.create({ id: 'owner' });
let other = Object.create({ id: 'other' });
let project = Object.create({
  projectUsers: [{ user: owner, role: 'owner' }]
});

moduleFor('ability:project', 'Unit | Ability | project', {
  needs: [
    'service:current-user',
    'service:metrics',
    'service:session'
  ]
});

test('it allows managing if user is owner of project', function(assert) {
  assert.expect(1);

  let ability = this.subject();
  set(ability, 'model', project);
  set(ability, 'currentUser', { user: owner });

  assert.ok(get(ability, 'canManage'));
});

test('it allows managing donation goals if user is not owner of project organization', function(assert) {
  assert.expect(1);

  let ability = this.subject();
  set(ability, 'model', project);
  set(ability, 'currentUser', { user: other });

  assert.notOk(get(ability, 'canManage'));
});
