import React, { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbase';
import { collection, onSnapshot } from '@firebase/firestore';
import { ref, uploadString } from '@firebase/storage';
import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttactchment] = useState(null);

  useEffect(() => {
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
    const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
    // await addDoc(collection(dbService, 'nweets'), {
    //   text: nweet,
    //   createdAt: new Date(),
    //   creatorId: userObj.uid,
    // });
    // setNweet('');
    const response = await uploadString(fileRef, attachment, 'data_url');
    console.log(response);
  };
  const onChange = (e) => {
    setNweet(e.target.value);
  };

  const onFileChange = (e) => {
    console.log(e.target.files);
    const { files } = e.target;
    const theFile = files[0];
    console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const { result } = finishedEvent.currentTarget;
      setAttactchment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => {
    setAttactchment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} alt={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
