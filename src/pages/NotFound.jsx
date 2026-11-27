import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';

export default function NotFound() {
  return (
    <div className="container">
      <Nav />
      <main className="notfound">
        <h1>Esta página no existe.</h1>
        <Link to="/" className="btn btn--dark">Volver al inicio</Link>
      </main>
    </div>
  );
}
