import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";

import useUnidadMedidas from "./hooks/useUnidadMedidas";

const UnidadMedidasTable = React.lazy(() => import('./components/UnidadMedidasTable'));

const Admin: React.FC = () => {
  // Utils
  const { data, error, loading } = useUnidadMedidas();

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return loading
    ? (
      <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
        <Spinner animation="border" />
      </div>
    )
    : (
      <React.Suspense fallback={<Spinner animation="border" />}>
        <UnidadMedidasTable unidadMedidas={data} />
      </React.Suspense>
    )
};

export default Admin;