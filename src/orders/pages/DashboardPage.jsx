import { Link as RouterLink } from 'react-router-dom';
import { OrdersLayout } from '../layout/OrdersLayout';
import { OrdersTable } from '../components';

export const DashboardPage = () => {
  return (
    <OrdersLayout>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Ordenes</h1>
        <RouterLink to='/orders/create' className="btn btn-sm btn-primary">Crear orden</RouterLink>
      </div>
      <OrdersTable />
    </OrdersLayout>
  );
};
