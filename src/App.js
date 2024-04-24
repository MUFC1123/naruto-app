import{ React, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const limit = 20;

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (page) => {
    const apiUrl = "https://narutodb.xyz/api/character";
    setIsLoading(true);
    const result = await axios.get(apiUrl, { params: { page, limit } });
    setCharacters(result.data.characters);
    setIsLoading(false);
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  };

  const handlePrev = async () => {
    const prevPage = Math.max(1, page - 1);
    await fetchCharacters(prevPage);
    setPage(prevPage);
  };

  // 2ページ先へ進む
  const handleSkipNext = async () => {
    const skipPage = page + 2;
    await fetchCharacters(skipPage);
    setPage(skipPage);
  };

  // 2ページ戻る
  const handleSkipPrev = async () => {
    const skipPage = Math.max(1, page - 2);
    await fetchCharacters(skipPage);
    setPage(skipPage);
  };

  // 最初のページへ戻る
  const handleFirstPage = async () => {
    await fetchCharacters(1);
    setPage(1);
  };

  // 最後のページへ進む
  const handleLastPage = async () => {
    const lastPage = Math.ceil(1431 / limit);
    await fetchCharacters(lastPage);
    setPage(lastPage);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
        🌀 ~~NARUTO Characters~~🌀
        </div>
      </div>
      {isLoading ? (   
          <div className="loading-container">
           <img src="logo.png" alt="Loading..."/>
          <p>ちょっと待ってね...</p>
        </div>
      ) : (
        <main>
          <div className="cards-container">
            {characters.map((character) => {
              return (
                <div className="card" key={characters.id}>
                  <img
                    src={
                      character.images[0] != null
                        ? character.images[0]
                        : "dummy.png"
                    }
                    alt="character"
                    className="card-image"
                  />
                  <div className="card-content">
                    <h3 className="card-title">{character.name}</h3>
                    <p className="card-description">
                      {/* {character.debut !=null
                    ? character.debut.appearsIn
                  : 'なし'} */}
                      {character.debut?.appearsIn ?? "nothing"}
                    </p>
                    <div className="card-footer">
                      <span className="affiliation">
                        {character.personal?.affiliation ?? "nothing"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
      <div className="pager">
        <button onClick={handleFirstPage} disabled={page === 1}>
          First
        </button>
        <button onClick={handleSkipPrev} disabled={page === 1}>
          ＜＜
        </button>
        <button onClick={handlePrev} disabled={page === 1}>
          ＜
        </button>
        <span className="page-number">{page}</span>
        <button
          onClick={handleNext}
          disabled={page >= Math.ceil(1431 / limit)}
        >
          ＞
        </button>
        <button onClick={handleSkipNext} disabled={page >= Math.ceil(1431 / limit) - 1}>
          ＞＞
        </button>
        <button
          onClick={handleLastPage}
          disabled={page >= Math.ceil(1431 / limit)}
        >
          Last
        </button>
      </div>
      </main>
      )}
    </div>
  );
}

export default App;