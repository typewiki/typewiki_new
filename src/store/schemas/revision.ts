import { schema } from 'normalizr';

const revisionSchema = new schema.Entity(
  'revisions',
  {},
  {
    idAttribute: 'revid',
  },
);

export default revisionSchema;
