import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { dbService, storageService } from 'fbase';
import { deleteObject, ref } from '@firebase/storage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure to delete this nweet?');
    if (ok) {
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      // TODO: 사진도 같이 지우기
      await deleteObject(ref(storageService, nweetObj.attachmentURL));
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
    <div className="nweet">
      <h4>
        {editing ? (
          <>
            <form onSubmit={onSubmit} className="container nweetEdit">
              <input
                onChange={onChange}
                type="text"
                placeholder="update nweet"
                value={newNweet}
                required
                autoFocus
                className="formInput"
              />
              <input type="submit" value="update" className="formBtn"></input>
            </form>
            <span onClick={onToggleEditing} className="formBtn cancelBtn">
              Cancel
            </span>
          </>
        ) : (
          <>
            {nweetObj.text}
            {nweetObj.attachmentURL && (
              <img src={nweetObj.attachmentURL} alt={nweetObj.text} />
            )}
            {isOwner && (
              <span className="nweet__action">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={onToggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </span>
            )}
          </>
        )}
      </h4>
    </div>
  );
};

export default Nweet;
