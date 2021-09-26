import { addDoc, collection } from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttactchment] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = '';
    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url',
      );
      console.log(response);
      attachmentURL = await getDownloadURL(response.ref);
      console.log(attachmentURL);
    }
    const nweetObj = {
      text: nweet,
      createdAt: new Date(),
      creatorId: userObj.uid,
      attachmentURL,
    };
    await addDoc(collection(dbService, 'nweets'), nweetObj);
    setNweet('');
    setAttactchment('');
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
  );
};

export default NweetFactory;
