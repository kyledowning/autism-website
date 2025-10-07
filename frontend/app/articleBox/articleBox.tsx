
function highlightKeyword(title, searchKey) {
    if (!searchKey) return title;
    const regex = new RegExp(`(${searchKey})`, "gi");
    const parts = title.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? <b key={i}>{part}</b> : part
        )}
      </>
    );
  }  

export function ArticleBox ( { article, searchQuery } ) {
    return (
        <div className={`p-4 m-5 rounded-xl shadow-sm cursor-pointer bg-white border border-gray-200 hover:bg-gray-200 transition-colors duration-300 ease-in-out`}
              onClick={() => window.open(article.urls, '_blank', 'noopener,noreferrer')}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{highlightKeyword(article.title, searchQuery)}</h3>
            <p className="text-gray-700 leading-relaxed">{highlightKeyword(article.abstract, searchQuery)}</p>
            
            <div className="flex flex-row flex-wrap gap-2 space-between mt-2">           
            {article.keywords && article.keywords.split(';').length > 1 && article.keywords.split(';').map((keyword, index) => (
                <div className="bg-green-200 p-2 rounded-xl"><h3>{keyword}</h3></div>
            ))}
            {article.keywords && article.keywords.split(',').length > 1 && article.keywords.split(',').map((keyword, index) => (
                <div className="bg-green-200 p-2 rounded-xl"><h3>{keyword}</h3></div>
            ))}
            </div>
        </div>
    );
}
