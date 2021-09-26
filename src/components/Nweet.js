import React from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  return (
    <div>
      <h4>
        {nweetObj.text}
        {nweetObj.attachmentURL && (
          <img src={nweetObj.attachmentURL} alt={nweetObj.text} />
        )}
        {isOwner && (
          <>
            <button>Delete</button>
            <button>Edit</button>
          </>
        )}
      </h4>
    </div>
  );
};

export default Nweet;
