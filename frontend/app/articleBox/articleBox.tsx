import React from 'react';

function highlightKeyword(title, searchKey) {
    if (!searchKey) return title;
    const regex = new RegExp(`(${searchKey})`, "gi");
    const parts = title.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? <b className='bg-blue-600' key={i}>{part}</b> : part
        )}
      </>
    );
  }  

export function ArticleBox ( { article, searchQuery, showAbstract, showKeywords, showAuthors } ) {
    return (
        <div className={`p-4 m-5 rounded-xl shadow-sm cursor-pointer bg-gray-750 border border-gray-500 hover:bg-gray-700 transition-colors duration-300 ease-in-out`}
              onClick={() => window.open(article.urls, '_blank', 'noopener,noreferrer')}>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">{highlightKeyword(article.title, searchQuery)}</h3>
            <h2 className="text-lg text-gray-300 mb-3">Retrieved From: <b>{article.dataset}</b></h2>

            {showAbstract && 
              <p className="text-gray-200 leading-relaxed line-clamp-5 md:line-clamp-25">{highlightKeyword(article.abstract, searchQuery)}</p>
            }

            {showKeywords && 
              <div className="md:flex md:flex-row md:flex-wrap md:gap-2 md:space-between mt-2">           
              {article.keywords && article.keywords.split(';').length > 1 && article.keywords.split(';').map((keyword, index) => (
                  <div className="bg-green-200 p-2 rounded-xl"><h3>{keyword}</h3></div>
              ))}
              {article.keywords && article.keywords.split(',').length > 1 && article.keywords.split(',').map((keyword, index) => (
                  <div className="bg-green-200 p-2 rounded-xl my-2 text-center"><h3>{keyword}</h3></div>
              ))}
              </div>
            }

            {showAuthors && 
              <div className="md:flex md:flex-row md:flex-wrap md:gap-2 md:space-between mt-2">           
              {article.authors && article.authors.split(';').length > 1 && article.authors.split(';').map((keyword, index) => (
                  <div className="bg-green-200 p-2 rounded-xl"><h3>{keyword}</h3></div>
              ))}
              {article.authors && article.authors.split(',').length > 1 && article.authors.split(',').map((keyword, index) => (
                  <div className="bg-green-200 p-2 rounded-xl my-2 text-center"><h3>{keyword}</h3></div>
              ))}
              </div>
            }

        </div>
    );
}
