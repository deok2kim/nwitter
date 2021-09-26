import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { dbService } from 'fbase';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure to delete this nweet?');
    if (ok) {
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      // TODO: 사진도 같이 지우기
    }
  };

  const onToggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onChange = (e) => {
    setNewNweet(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      text: newNweet,
    });
    setEditing(false);
  };
  return (
    <div>
      <h4>
        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                onChange={onChange}
                type="text"
                placeholder="update nweet"
                value={newNweet}
                required
              />
              <input type="submit" value="update"></input>
            </form>
            <button onClick={onToggleEditing}>Cancel</button>
          </>
        ) : (
          <>
            {nweetObj.text}
            {nweetObj.attachmentURL && (
              <img src={nweetObj.attachmentURL} alt={nweetObj.text} />
            )}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={onToggleEditing}>Edit</button>
              </>
            )}
          </>
        )}
      </h4>
    </div>
  );
};

export default Nweet;
