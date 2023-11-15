import * as React from 'react';

import DataLayer from '../../../services/data-layer';
import UnidadMedida from '../../../types/unidadMedida';

type UseUnidadMedidasState = {
  data: UnidadMedida[];
  error: any;
  loading: boolean;
};

const initialState: UseUnidadMedidasState = {
  data: [],
  error: null,
  loading: true,
};

const useUnidadMedidas = () => {
  // State
  const [state, setState] = React.useState<UseUnidadMedidasState>(initialState);

  // Effects
  React.useEffect(function fetchUnidadMedidas() {
    DataLayer.fetch.unidadMedidas()
      .then((data: UnidadMedida[]) => setState({ data, error: null, loading: false }))
      .catch((error: any) => setState({ data: [], error, loading: false }));
  }, [setState]);

  return state;
};

export default useUnidadMedidas;