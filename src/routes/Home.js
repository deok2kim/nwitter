import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, getDocs } from '@firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const n = await getDocs(collection(dbService, "nweets"));       
        n.forEach(doc => {
            const nweetObj = {
                id: doc.id,
                ...doc.data(),
            }
            setNweets(prev => [...prev, nweetObj])
        })
    }

    useEffect(() => {
        getNweets();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt: new Date(),
        });
        setNweet('');
    }
    const onChange = (e) => {
        setNweet(e.target.value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on your mind" maxLength={120} onChange={onChange} value={nweet} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet => (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Home;