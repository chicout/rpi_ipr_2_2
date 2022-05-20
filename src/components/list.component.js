import React from 'react';

const ListComponent = props => {
    const urlToDefaultImage = 'https://www.seekpng.com/png/detail/370-3703355_empty-folder-image-showing-no-results-were-found.png';
    return (
        <ul>
            {props.news.map(news => (
                <li key={news.id}>
                    <div className="list-item-img-container">
                        <img src={news.urlToImage !== 'null' ? news.urlToImage : urlToDefaultImage} alt="news"/>
                    </div>
                    <div className="list-item-content-container">
                        <h4>{news.title}</h4>
                        <p>{news.description}</p>
                        <a href={news.url}>Read More</a>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ListComponent;