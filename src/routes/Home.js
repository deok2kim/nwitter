import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, getDocs, onSnapshot } from '@firebase/firestore';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const n = await getDocs(collection(dbService, 'nweets'));
    n.forEach((doc) => {
      const nweetObj = {
        id: doc.id,
        ...doc.data(),
      };
      setNweets((prev) => [...prev, nweetObj]);
    });
  };

  useEffect(() => {
    // getNweets();
    onSnapshot(collection(dbService, 'nweets'), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(dbService, 'nweets'), {
      text: nweet,
      createdAt: new Date(),
      creatorId: userObj.uid,
    });
    setNweet('');
  };
  const onChange = (e) => {
    setNweet(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
          onChange={onChange}
          value={nweet}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
