import React from 'react'
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./ApiDemo'),
  loading: () => 'Loading...',
});

export default () => <LoadableComponent/>
