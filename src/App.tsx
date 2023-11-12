import { useEffect, useState } from 'react';

import './App.css';
const API_URL = 'https://rickandmortyapi.com/api/character?page=1';

// CEL: pobranie z API danych i wyświetlenie ich
// 1. przypisać do zmiennej API_URL
// 2. chcę wysłać request pod ten URL - fetch()
// 2.1. napisać f-cję fetchResponse(), która wysyła request
// 3. Wyciągnąc dane z requestu
// 3.1 Uzyć .then.catch albo async await
// 3.2 wylogować te dane w konsoli
// 4. Przypisać do useState tablice z postaciami za pomocą settera
// 5. Uzyc useEffect do fetchowania danych (inaczej jest pętla nieskończona)
// 6. Przemapować po zmiennej i wyświetlić dane.

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Info {
  count: number;
  next: string | null;
  prev: string | null;
}

interface Data {
  info: Info;
  results: Character[];
}

function App(): JSX.Element {
const [characters, setCharacters] = useState<Character[]>([]);
// const [imageUrl, setImageUrl] = useState(null);

// zrobienie fetcha na url-u
  async function fetchData(): Promise<void>{
    try {
      const response = await fetch (API_URL);
      const {results}: Data = await response.json(); // zamiast data, wpisujemy konkretny klucz, do jakiego chcemy się dostać w URl (w naszym przypadku jest to results, w którym mamy do pobrania i wyświetlenia name i image postaci)
      setCharacters(results)

      // setImageUrl(url)
      
    } catch (error) {
      console.log(error);
    }
    
  }
//uzycie useEffect przy fetchowaniu danych (inaczej byłaby pętla nieskończona)
  useEffect(() => {
    fetchData();
  }, []);
  

  

  return (
    <>
      <h1>Rick and Morty</h1>
      <ul className="characters-container">
        {/* mapujemy po wszystkich postaciach i wyciągamy pojedynczy obiekt, w którym zwracamy imię i image */}
        {characters.map((character) => {
         return(<div>
<li key={character.id}>
  <p>{character.name}</p>
<img src={character.image} alt={character.name}/>
</li>

</div>
         ) 
        })}
      </ul>
        
    </>
  )
}

export default App;
