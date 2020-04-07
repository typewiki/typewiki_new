import { denormalize, schema } from 'normalizr';
import { useSelector } from 'react-redux';

function useDenormalize(
  schema: schema.Entity,
  selector: (state: any) => { input: any; entities: any },
) {
  const { input, entities } = useSelector(selector);

  const { [schema.key]: data } = denormalize(
    { [schema.key]: input },
    { [schema.key]: [schema] },
    { [schema.key]: entities },
  );

  return [data];
}

export default useDenormalize;
