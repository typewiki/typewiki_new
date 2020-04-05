import { schema } from 'normalizr';
import revisionSchema from './revision';

const pageSchema = new schema.Entity(
  'pages',
  {
    revisions: [revisionSchema],
  },
  {
    idAttribute: 'pageid',
  },
);

export default pageSchema;
