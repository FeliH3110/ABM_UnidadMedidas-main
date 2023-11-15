import UnidadMedida from "../types/unidadMedida";

const API_BASE_URL: string = 'https://empresaurios-api.onrender.com/api/v1/unidadmedida';

const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: UnidadMedida): Promise<any> => {
  const options: any = { headers: { 'Content-Type': 'application/json' }, method };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
  const data = await response.json();

  return data;
};

const fnCreateUnidadMedida = async (unidadMedida: UnidadMedida) => fetchApiCall('POST', undefined, unidadMedida);
const fnDeleteUnidadMedida = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchUnidadMedida = async () => fetchApiCall('GET');
const fnUpdateUnidadMedida = async (unidadMedida: UnidadMedida) => fetchApiCall('PUT', unidadMedida.id, unidadMedida);

type DataLayer = {
  create: {
    unidadMedida: typeof fnCreateUnidadMedida,
  },
  delete: {
    unidadMedida: typeof fnDeleteUnidadMedida,
  },
  fetch: {
    unidadMedidas: typeof fnFetchUnidadMedida,
  },
  update: {
    unidadMedida: typeof fnUpdateUnidadMedida,
  }
};

const DataLayer: DataLayer = {
  create: {
    unidadMedida: fnCreateUnidadMedida,
  },
  delete: {
    unidadMedida: fnDeleteUnidadMedida,
  },
  fetch: {
    unidadMedidas: fnFetchUnidadMedida,
  },
  update: {
    unidadMedida: fnUpdateUnidadMedida,
  }
};

export default DataLayer;
