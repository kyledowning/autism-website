import React from 'react';
import type { Article } from '~/types/filters';

interface ArticleBoxProps {
  article: Article;
  searchQuery: string;
  showAbstract: boolean;
  showKeywords: boolean;
  showAuthors?: boolean;
}

function highlightKeyword(title: string, searchKey: string): React.ReactNode {
  if (!searchKey) return title;

  const regex = new RegExp(`(${searchKey})`, "gi");
  const parts = title.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <b
            key={i}
            style={{ backgroundColor: 'var(--highlight-color)' }}
            className="px-1 rounded"
          >
            {part}
          </b>
        ) : (
          part
        )
      )}
    </>
  );
}

export function ArticleBox({ article, searchQuery, showAbstract, showKeywords, showAuthors = false }: ArticleBoxProps) {
    const articleUrl = article.urls || article.url || '#';

    return (
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
             className={`p-4 m-5 rounded-xl shadow-sm cursor-pointer border hover:border-blue-400 transition-colors duration-300 ease-in-out`}
              onClick={() => window.open(articleUrl, '_blank', 'noopener,noreferrer')}>
            <h3 style={{ color: 'var(--text-primary)' }} className="text-lg font-semibold mb-3">{highlightKeyword(article.title, searchQuery)}</h3>
            <h2 style={{ color: 'var(--text-secondary)' }} className="text-lg mb-3">Retrieved From: <b>{article.dataset}</b></h2>
            {showAbstract && article.abstract &&
              <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed line-clamp-5 md:line-clamp-25">{highlightKeyword(article.abstract, searchQuery)}</p>
            }
            {showKeywords &&
              <div className="md:flex md:flex-row md:flex-wrap md:gap-2 md:space-between mt-2">
              {article.keywords && article.keywords.split(';').length > 1 && article.keywords.split(';').map((keyword, index) => (
                  <div key={index} className="bg-blue-500 text-white p-2 rounded-xl"><h3>{keyword}</h3></div>
              ))}
              {article.keywords && article.keywords.split(',').length > 1 && article.keywords.split(',').map((keyword, index) => (
                  <div key={index} className="bg-blue-500 text-white p-2 rounded-xl my-2 text-center"><h3>{keyword}</h3></div>
              ))}
              </div>
            }
            {showAuthors && article.authors &&
              <div className="md:flex md:flex-row md:flex-wrap md:gap-2 md:space-between mt-2">
              {article.authors.split(';').length > 1 && article.authors.split(';').map((keyword: string, index: number) => (
                  <div key={index} className="bg-blue-500 text-white p-2 rounded-xl"><h3>{keyword}</h3></div>
              ))}
              {article.authors.split(',').length > 1 && article.authors.split(',').map((keyword: string, index: number) => (
                  <div key={index} className="bg-blue-500 text-white p-2 rounded-xl my-2 text-center"><h3>{keyword}</h3></div>
              ))}
              </div>
            }
        </div>
    );
}
