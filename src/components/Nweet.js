import React from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  return (
    <div>
      <h4>
        {nweetObj.text}
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
