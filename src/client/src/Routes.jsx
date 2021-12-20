import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import TestContract from './pages/testContract';
import ToDoContract from './pages/todoContract';

// Componente com as rotas
function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element = {<Home/>} />
                <Route path="/test" element = {<TestContract/>} />
                <Route path="/todo" element = {<ToDoContract/>} />
            </Routes>
        </BrowserRouter>
    );
}

// Exporta componente
export default AppRoutes;