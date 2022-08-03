import React, {useEffect, useState} from 'react';
import { FiChevronsRight, FiChevronsLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App(){

    //const [people, setPeople] = useState(data);
    const people = data;
    const [index, setIndex] = useState(0);

    /* this will handled the iteration of coming up index */
    useEffect(() => {
        let lastIndex = people.length - 1;
        if (index < 0){
            setIndex(lastIndex);
        }
        if (index > lastIndex){
            setIndex(0);
        }
    }, [index, people]);

    /* this will control the interval of slider */
    useEffect( () => {
       let slider = setInterval( () => {
           setIndex(index + 1)
       }, 3000)
        return () => clearInterval(slider);
    }, [index]);

    return (
        <section className='section'>
            <div className='title'>
                <h2>
                    <span>/</span>reviews
                </h2>
            </div>
            <div className='section-center'>
                { people.map((person, personIndex) => {
                    const { id, image, name, title, quote } = person;
                    let position = 'nextSlide';
                    if (personIndex === index){
                        position = 'activeSlide';
                    }
                    if ( personIndex === index - 1 ||
                        (index === 0 && index === people.length - 1)
                    )
                    {
                        position = 'lastSlide';
                    }
                    return (
                        <article key={id} className={position}>
                            <img src={image} alt={name} className='person-img' />
                            <h4>{name}</h4>
                            <p className='title'>{title}</p>
                            <p className='text'>{quote}</p>
                            <FaQuoteRight className='icon' />
                        </article>
                    );
                })}
                <button className='prev' onClick={ () => setIndex(index - 1) }>
                    <FiChevronsLeft />
                </button>
                <button className='next' onClick={ () => setIndex(index + 1) }>
                    <FiChevronsRight />
                </button>
            </div>
        </section>
    )

}

export default App;