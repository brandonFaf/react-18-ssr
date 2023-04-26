'use client';

import { Suspense } from 'react';
import { RecoilRoot, atom, selector, useRecoilValue } from 'recoil';

export const Data = () => {
  const data = useRecoilValue(dataState);

  return (
    <div>
      <div>id is set to: {data}</div>
    </div>
  );
};

const Example = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>loading data from recoil…</div>}>
        <Data />
      </Suspense>
    </RecoilRoot>
  );
};

const dataState = selector<string>({
  key: 'dataState',
  get: async () => {
    console.log('running selector: waiting on promise');
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    console.log('resolving');

    return '2';
  },
});
export default Example;
