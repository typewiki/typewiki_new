import React, { useEffect } from 'react';
import { info } from 'electron-log';
import { DateRangeInput } from '@blueprintjs/datetime';
import { Revisions } from '../revisions';

const Home = () => {
  useEffect(() => info('Rendering Home component'), []);
  return (
    <div>
      {/*<DateRangeInput formatDate={() => 'fdfd'} parseDate={() => new Date()} />*/}
      <Revisions />
    </div>
  );
};

export default Home;
