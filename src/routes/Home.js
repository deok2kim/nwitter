import React, { useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection } from '@firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState('');
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
        </div>
    )
};

export default Home;