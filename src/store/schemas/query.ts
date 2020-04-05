import { schema } from 'normalizr';
import pageSchema from './page';

const querySchema = new schema.Object({
  pages: [pageSchema],
});

export default querySchema;
