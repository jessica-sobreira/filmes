import { Provider } from "react-redux";
import { store, persistedStore } from "./features/store";
import { PersistGate } from "redux-persist/integration/react";
import { Root } from "./Root";

function App() {
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistedStore}>
                    <Root />
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;


















// import { useState, useEffect } from 'react';
// import './App.css';

// const API_KEY = 'b87b88b9'; 

// function App() {
//   const [filmeInput, setFilmeInput] = useState('');
//   const [filmeBuscado, setFilmeBuscado] = useState('');
//   const [filmesEncontrados, setFilmesEncontrados] = useState([]);
//   const [carregando, setCarregando] = useState(false);
//   const [erro, setErro] = useState('');


//   useEffect(() => {
//     const buscarFilme = async () => {

//       if (!filmeBuscado) {
//         setFilmesEncontrados([]);
//         return;
//       }

//       setCarregando(true);
//       setErro('');

//       const apiUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(filmeBuscado)}&apikey=${API_KEY}`;

//       try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error('Erro de rede ao buscar filmes.');
//         }

//         const data = await response.json();

// if (data.Response === 'False') {
//   setErro(data.Error);
//   setFilmesEncontrados([]);
// } else {
//   const filmesEncontradosDoSearch = data.Search.slice(0, 10);
//   const filmesComDetalhes = [];


//   for (const movie of filmesEncontradosDoSearch) {
//     const movieDetailsUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`;
    
//     try {
//       const detailsResponse = await fetch(movieDetailsUrl);
//       const detailsData = await detailsResponse.json();
//       filmesComDetalhes.push(detailsData);
//     } catch (detailsError) {
//       console.error('Erro ao buscar detalhes do filme:', detailsError);
     
//     }
//   }

//   setFilmesEncontrados(filmesComDetalhes);
//   setErro('');
// }
//       } catch (error) {
//         console.error('Erro ao buscar filme:', error);
//         setErro('Ocorreu um erro ao buscar o filme. Tente novamente.');
//         setFilmesEncontrados([]);
//       } finally {
//         setCarregando(false);
//       }
//     };

//     buscarFilme();

//   }, [filmeBuscado]); 

//   const handleBuscarClick = () => {
    
//     if (filmeInput.trim() !== '') {
//       setFilmeBuscado(filmeInput);
//     } else {
//       setErro('Por favor, digite o nome de um filme.');
//       setFilmesEncontrados([]);
//     }
//   };

//   return (
//     <>
//       <h1>Buscando filmes</h1>

//       <label htmlFor="filme">Digite o Filme:</label>
//       <input
//         type="text"
//         id="filme"
//         value={filmeInput}
//         onChange={(e) => setFilmeInput(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === 'Enter') {
//             handleBuscarClick();
//           }
//         }}
//       />

//       <button type="submit" onClick={handleBuscarClick}>
//         Buscar
//       </button>

//       <div id="resultado">
//         {carregando && <p>Loading...</p>}
//         {erro && <h3 style={{ color: 'red' }}>{erro}</h3>}
//         {filmesEncontrados.length > 0 && (
//           <>
//             <h2>Resultados para "{filmeBuscado}"</h2>
//             {filmesEncontrados.map((movie) => (
//               <div className="movie-card" key={movie.imdbID}>
//                 <img
//                   src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100x150?text=Sem+Poster'}
//                   alt={`Poster do filme ${movie.Title}`}
//                 />
//                 <div className="movie-details">
//                   <h3>
//                     {movie.Title} ({movie.Year})
//                   </h3>
//                   <ul>
//                     <li>Gênero: {movie.Genre !== 'N/A' ? movie.Genre : 'Não disponível'}</li>
//                     <li>Diretor: {movie.Director !== 'N/A' ? movie.Director : 'Não disponível'}</li>
//                     <li>Atores: {movie.Actors !== 'N/A' ? movie.Actors : 'Não disponível'}</li>
//                     <li>Enredo: {movie.Plot !== 'N/A' ? movie.Plot : 'Não disponível'}</li>
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;